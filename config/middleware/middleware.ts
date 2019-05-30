import * as bodyParser from 'body-parser';
import * as express from 'express';

export function configure(app: express.Application): void {


    //Permite usar queryString
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //Permite usar Json
    app.use(bodyParser.json());


}