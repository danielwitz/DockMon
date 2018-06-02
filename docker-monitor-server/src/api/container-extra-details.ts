import {doAsyncAction} from './doAction';
import {ContainerExtraDetails} from '../business-logic/container-extra-details';
import {Request, Response, Application} from 'express';

export class ContainerExtraDetailsApi {
    static init(app: Application): void {
        app.get('/extraDetails/:host/:id', ContainerExtraDetailsApi.getExtraDetails)
    }

    private static async getExtraDetails(req: Request, res: Response): Promise<any> {
        const areParamsValid = req.params.host && req.params.id;
        const errorMessage = `error while getting details for ${req.params.host}/${req.params.id}`;
        await doAsyncAction(areParamsValid, res, errorMessage, ContainerExtraDetails.getDetails,
            req.params.host, req.params.id);
    }


}