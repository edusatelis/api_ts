import * as Routes from '../../routes/routes'
import * as Middleware from '../middleware/middleware'
import * as express from 'express';

const app: express.Application = express();

/** 
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);



let port = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`The Server is running in port: ${port}` );
});

