import express from 'express';
import cors from 'cors';
import { DbSource } from './dbConfig/dbConfig';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 9000;

DbSource.getInstance().initialize()
    .then(() => {
        console.log('Connected to postgres database');
    })
    .catch((err) => {
        console.error('Error connecting to postgres database', err);
    });

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});