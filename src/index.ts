import express from 'express';
import { router } from "./routes.ts";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from '../swagger.json';

const app = express();
const port = process.env.PORT || 8000;

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});