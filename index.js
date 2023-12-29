import express from "express"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* app.get("/", (req, res) => {
    const q = req.query
    console.log(q)    
    res.send(`Ciao ${q.name}`)
})

app.get("/another-path", (req, res) => {
    res.send("Ciao on another path!")
})

app.get("/users/:userId", (req, res) => {
    res.send(`The user id is: ${req.params.userId}`)
})

app.get('/math/:op', (req, res) => {

    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
  
    const {op} = req.params;
  
    const result = op === "add" ? x + y : op === "subtract" ? x - y : op === "multiply" ? x * y : op === "divide" ? x / y : false;
  
    const resultObject = {
        numbers: {
          x: x,
          y: y
        },
        operation: op,
        result: result ? result : `Unrecognizable operation name`
      }
    
      res.send(resultObject);
  
  }) */

app.use("/pub", express.static(path.join(__dirname, "client", "public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"))
})

app.get("/users", async (req, res) => {
    const data = await fs.readFile("./users.json", "utf8")
    const users = JSON.parse(data).users
    return res.send(users)
})

app.get("/users/:userId", async (req, res) => {
    const data = await fs.readFile("./users.json", "utf8")
    const {users} = JSON.parse(data)
    const userId = parseInt(req.params.userId)
    const user = users.find(user => user.id === userId)
    if (user) {
        return res.send(user)
    } else {
        return res.status(404).send({state: "user not found"})
    }
})

app.listen(3000, () => {
    console.log("Open this link in your browser: http://127.0.0.1:3000")
})