const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

app.listen(3333);
const users = [];

function checkExistsUserAccount(request, response, next) {
    const { username } = request.headers;
    const user = users.find((user) => user.username === username);

    if (!user) {
        return response.status(400).json({ error: "User not found" });
    }
    request.user = user;
    return next();
}

app.post("/users", (request, response) => {
    const { name, username } = request.body;
    const userAlreadyExists = users.some((user) => user.username === username);

    if (userAlreadyExists) {
        return response.status(400).json({ error: "User already exists!" });
    }

    users.push({
        id: uuidv4(),
        name,
        username,
        todoList: [],
    });

    return response.status(201).send();
});