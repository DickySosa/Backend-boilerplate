import express from 'express';
import cors from 'cors';
import { DbSource } from './dbConfig/dbConfig';
import { UserService } from './services/user.service';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 9000;
const userService: UserService = UserService.getInstance();

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


app.post('/v1/api/user', userService.createUser);
app.get('/v1/api/users', userService.getUser);
app.put('/v1/api/user/:id', userService.updateUser)
app.delete('/v1/api/user/:id',userService.deleteUser)