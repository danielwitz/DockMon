import * as request from 'request';
import {Log} from '../interface/log';

const dateRegex = /(?=(?:0[1-9]|[12][0-9]|3[01])[\/-](?:0[1-9]|[12][0-9]|3[01])[\/-]\d{4}|\d{4}[\/-](?:0[1-9]|[12][0-9]|3[01])[\/-](?:0[1-9]|[12][0-9]|3[01]))/;
const bashColorRegex = /\033\[[0-9;]*m/g;

export class ContainerLogsBusinessLogic {
    static getLogs(host, id, timestamp): Promise<Log[]> {
        let since = timestamp ? timestamp : (Math.round(+new Date() / 1000)) - 300;
        return new Promise((resolve: any, reject: any) => {
            request.get({
                url: `http://${host}/containers/${id}/logs?stdout=true&stderr=true&since=${since}&tty=false&tail=1000`
            }, (err, _, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(ContainerLogsBusinessLogic.parseLogs(res));
                }
            })
        });
    }

    private static parseLogs(logs): Log[] {
        let parsedLogs = [];
        logs.replace(bashColorRegex, '').split('\n').map((line) =>
            line.slice(8, line.length)).join('')
            .split(dateRegex)
            .map((message) => parsedLogs.push({
                message: message,
                level: ContainerLogsBusinessLogic.getLogLevel(message)
            }));
        return parsedLogs;
    }

    private static getLogLevel(log): string {
        if (log.includes('error')) {
            return 'ERROR';
        }
        else if (log.includes('debug')) {
            return 'DEBUG';
        }
        else {
            return 'INFO';
        }
    }
}