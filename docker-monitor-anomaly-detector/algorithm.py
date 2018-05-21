import pandas as pd
import pymongo
import time
from sklearn.ensemble import IsolationForest
from pymongo import MongoClient
from tabulate import tabulate
import pprint
import threading

# cleaning
ID_COLUMN_DIST_RATIO_THRESHOLD = 1.0  # threshold for setting a columns as id column using (unique values / all values)
CATEGORICAL_COLUMN_DIST_RATIO_THRESHOLD = 0.1
# threshold for setting a column as categorical using (unique values / all values)
CATEGORICAL_COUNT_THRESHOLD = 5  # threshold use to differ categorical variables that are of numerical type
MISSING_VALUES_REPRESENTATION = 'NaN'  # indicates which types are considered as missing values in pandas DataFrame
ISOLATION_FOREST_N_ESTIMATORS = 100  # [int > 0] isolation forest is used for removing outliers in data

threading.current_thread().name = 'MainThread'
def detect_anomalies_with_isolation_forest(X, contamination=0.1):
    """
    given a pandas DataFrame returns outliers indexes using isolation forest to detect outliers.

    In data mining, anomaly detection (also outlier detection) is the identification of items,
    events or observations which do not conform to an expected pattern or other items in a dataset.

    :param y: [pandas series] target column
    :param X: [pandas DataFrame] raw features
    :param contamination:  the proportion of outliers in the data set
    :return: outliers indexes
    """
    assert (isinstance(X, pd.DataFrame)) and (not X.empty), 'X should be a valid pandas DataFrame'
    df = X.copy()
    clf = IsolationForest(max_samples=len(df.index), n_estimators=ISOLATION_FOREST_N_ESTIMATORS,
                          contamination=contamination)

    columns = df.columns.tolist()
    columns = [c for c in columns if c not in ["_id", "updateTime","containerId"]]
    outliers = []
    sanitizedColums = df[columns]
    if (not sanitizedColums.empty):
        clf.fit(sanitizedColums)
        Y = clf.predict(sanitizedColums)
        for i, is_inliner in enumerate(Y):
            if is_inliner == -1:
                outliers.append(i)
    return df.index[outliers]


def checkForUpdates(stats,containers_db):
    print("asdasdas")
    containers = []

    df = pd.DataFrame(list(stats.find()))
    grouped = df.groupby('containerId')

    for container in grouped :
        df = container[1]
        df = df.dropna(0,'any')
        x = tabulate(df, headers='keys', tablefmt='psql')
        print(x)

        if (not len(df) ==0) :
            outliers = detect_anomalies_with_isolation_forest(df)
            relevantOutliers = getRelevantOutliers(outliers, df)
            updateAnamolisInDb(relevantOutliers, container[0],containers_db)



def updateAnamolisInDb(anamolys, containerId,containers):
    maxMemory = 557686786787578578;
    minCpu = 0.0;
    maxCpu = 234523542345235;
    avgCpu = 0;
    avgMemory = 0;
    # x = tabulate(anamolys, headers='keys', tablefmt='psql')
    # print(x)

    # calculate average
    for anomalie in anamolys:
        avgCpu += anomalie["cpu"]
        avgMemory += anomalie["memory"]

    rowsAmount = len(anamolys)
    if not rowsAmount == 0:
        avgMemory = avgMemory / rowsAmount
        avgCpu = avgCpu / rowsAmount
    else:
        avgCpu = 0.4
        avgMemory = 1

    for anomalie in anamolys:
        memory = anomalie["memory"]
        cpu = anomalie["cpu"]

        if (memory < maxMemory and memory > avgMemory):
            maxMemory = memory
        if (cpu < maxCpu and cpu > avgCpu):
            maxCpu = cpu
        if (cpu > minCpu and cpu < avgCpu):
            minCpu = cpu

    # updating the db
    containers.update_one({"_id": containerId},
                          {"$set": {"maxNormalCpu": float(maxCpu),
                                    "minNormalCpu": float(minCpu),
                                    "maxNormalMemory": float(maxMemory)}})
    # print(collection.find_one({"containers.id" : containerId}))


def getRelevantOutliers(outliers, dataFrame):
    relevant = []
    for row in outliers:
        dfSize = len(dataFrame.index) - 1
        # if (row == dfSize):
        relevant.append(dataFrame.loc[row, :])
        # updatetime = dataFrame.loc[row,"updateTime"]
        # if (updatetime >= time.time() - 3):
        # relevant.append(row)

    return relevant


class RepeatEvery(threading.Thread):
    def __init__(self, interval, func, *args, **kwargs):
        threading.Thread.__init__(self)
        self.interval = interval  # seconds between calls
        self.func = func          # function to call
        self.args = args          # optional positional argument(s) for call
        self.kwargs = kwargs      # optional keyword argument(s) for call
        self.runable = True
    def run(self):
        while self.runable:
            self.func(*self.args, **self.kwargs)
            time.sleep(self.interval)
    def stop(self):
        self.runable = False


client = MongoClient('mongodb://dockmon:bRX-SGD-DZQ-26o@ds111078.mlab.com:11078/dockmon')
db = client['dockmon']
stats_table = db.stats
containers_table = db.containers
# t=Timer(3.0,checkForUpdates())


thread = RepeatEvery(3, checkForUpdates, stats_table, containers_table)
print("starting")
thread.start()