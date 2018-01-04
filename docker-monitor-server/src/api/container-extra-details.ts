import * as express from 'express';

let fetch = require('node-fetch');

export class ContainerExtraDetailsApi {
    static init(app: express.Application): void {
        app.get('/extraDetails/:host/:id', ContainerExtraDetailsApi.getExtraDetails)
    }

    static async getExtraDetails(req: express.Request, res: express.Response): Promise<any> {
        if (req.params.host && req.params.id) {
            try {
                res.send(await ContainerExtraDetailsApi.getDetails(req.params.host, req.params.id));
            }
            catch (err) {
                console.error(err);
                res.send(err);
            }
        }
        else {
            res.send('Error! did not get the needed params!');
        }
    }

    static async getDetails(host: string, id: string) {
        let details =  await fetch(`http://${host}/containers/${id}/json`);
        return details;
    }
}