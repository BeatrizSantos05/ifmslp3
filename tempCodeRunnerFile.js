app.get('/Menos/:a/:b', (req,res) =>{
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  const resultado = a - b;

  res.send(`Resultado: ${resultado}`);
})
