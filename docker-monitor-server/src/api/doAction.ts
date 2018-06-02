import {Response} from 'express';

export async function doAsyncAction(areParamsValid: boolean, res: Response, errorMessage: string,
                                    asyncAction: (...args) => Promise<any>, ...args: any[]) {
    if (areParamsValid) {
        try {
            const actionResult = await asyncAction(...args);
            res.send(actionResult)
        } catch (error) {
            console.error(`${errorMessage} \n ${error}`);
            res.status(500).send(error);
        }
    } else {
        res.status(400).send(`Error! did not get the needed params!`)
    }
}