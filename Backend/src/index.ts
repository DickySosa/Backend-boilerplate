const express = require('express');
const cors = require('cors');
const { DbSource } = require('./dbConfig/dbConfig');
const { UserService } = require('./services/user.service');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 9000;
const userService = UserService.getInstance();

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

//User CRUD
app.post('/v1/api/user', userService.createUser);
app.get('/v1/api/users', userService.getUser);
app.put('/v1/api/user/:id', userService.updateUser)
app.delete('/v1/api/user/:id',userService.deleteUser)