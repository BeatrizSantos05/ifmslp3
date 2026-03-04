const express = require("express");
const { log } = require("node:console");
const app = express();
app.get("/", (req, res) => {
    res.send("servidor da turma de LP3 ON")
});

app.get("/aluno", (req, res) => {
    res.send("rota do aluno funcionando");
});

const PORTA = 3000;

app.listen(PORTA, () => {
   console.log(`servidor rodando em http://localhost:${PORTA}/aluno`);
   
})