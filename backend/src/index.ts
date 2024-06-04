import express from 'express';
import { router } from "./routes.ts";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from '../docs/swagger.json';

const app = express();
const path = 'frontend/dist/';
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(router);

app.use(express.static(path));

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});