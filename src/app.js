const http = require("http");

const Io = require("./utils/Io");
const Parser = require("./utils/parser");
const Todos = new Io("./db/todos.json");

const Todo = require("./model/Todo");

const date = new Date();

http
  .createServer(async (req, res) => {
    res.setHeader("Content-type", "aplication/json");

    const todosData = await Todos.read();

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200);
      res.end(JSON.stringify(todosData));
    }

    if (req.url === "/todos" && req.method === "POST") {
      const reqBody = await Parser(req);
      const { title, text, isCompleted } = reqBody;

      const id = (todosData[todosData.length - 1]?.id || 0) + 1;

      const newTodo = new Todo(id, title, text, date, isCompleted);

      const newTodosData = [...todosData, newTodo];

      Todos.write(newTodosData);

      res.writeHead(201);
      return res.end(JSON.stringify({ message: "success" }));
    }

    if (req.url === "/todos/change_text" && req.method === "PUT") {
      const reqBody = await Parser(req);
      const { id, title, text } = reqBody;

      todosData.forEach((el) => {
        if (el.id == id) {
          el.title = title;
          el.text = text;
          el.isCompleted = isCompleted;
          return el;
        }
      });

      Todos.write(todosData);

      res.writeHead(200);
      res.end(JSON.stringify({ message: "successfully updated" }));
    }

    if (req.url === "/todos/change_completed" && req.method === "PUT") {
      const reqBody = await Parser(req);
      const { id, isCompleted } = reqBody;

      todosData.forEach((el) => {
        if (el.id == id) {
          el.isCompleted = isCompleted;
          return el;
        }
      });

      Todos.write(todosData);

      res.writeHead(200);
      res.end(
        JSON.stringify({ message: "task completion is successfully updated" })
      );
    }

    const urlID = req.url.split("/").at(-1); // getting id from url

    const findUser = todosData.find((el) => el.id == urlID); // it finds the exact user by comparing the ID of the user with urlID

    if (findUser && req.method === "DELETE") {
      const undeletedData = todosData.filter((el) => el.id != urlID);
      Todos.write(undeletedData);

      res.writeHead(200);
      return res.end(JSON.stringify({ message: "success" }));
    }
     
    else {
      return res.end(JSON.stringify({ message: "Not found" }));
    }
  })
  .listen(2002);
console.log("iwladi");
