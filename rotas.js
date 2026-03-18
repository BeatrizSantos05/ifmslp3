const express = require("express");
const { log } = require("node:console");
const app = express(); 
app.use((req, res, next) =>{
    console.log("Acesso", req.method, req.url);
    next();
    
})

app.get("/", (req, res) => {
    res.send(`
        <h1>Menu</h1>
        <a href="/status"> ir para status</a><br>
        <a href="/soma"> ir para soma</a><br>
        <a href="/menos"> ir para subtração</a><br>
        <a href="/mult"> ir para multiplicação</a>`);
});

app.get('/soma/:a/:b', (req,res) =>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const resultado = a + b;

    res.send(`Resultado: ${resultado}`);
})

app.get('/Menos/:a/:b', (req,res) =>{
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  const resultado = a - b;

  res.send(`Resultado: ${resultado}`);
})

app.get('/Mult/:a/:b', (req,res) =>{
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  const resultado = a * b;

  res.send(`Resultado: ${resultado}`);
})

app.get("/status", (req, res) => {
    res.json({
        servidor: "online",
        disciplina: "LP3",
        professora: "Milena",
        hora: new Date().toLocaleString()
    });
})
const PORTA = 3001;

app.listen(PORTA, () => {
   console.log(`servidor rodando em http://localhost:${PORTA}`);
   
})

