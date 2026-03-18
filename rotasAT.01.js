const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("Acesso", req.method, req.url);
    next();
});

const filmes = [
    { id: 1, titulo: "A Origem", ano: 2010, nota: 10 },
    { id: 2, titulo: "A Familia do Futuro", ano: 2007, nota: 9 },
    { id: 3, titulo: "Homem-Aranha", ano: 2002, nota: 8 },
    { id: 4, titulo: "Interestelar", ano: 2014, nota: 10 },
    { id: 5, titulo: "Click", ano: 2006, nota: 9 }
];

const musicas = [
    { id: 1, titulo: "Dark Red", artista: "Steve Lacy", nota: 10 },
    { id: 2, titulo: "Instant Crush", artista: "Daft Punk", nota: 9 },
    { id: 3, titulo: "Chop Suey!", artista: "System of a Down", nota: 8 },
    { id: 4, titulo: "Backstage", artista: "Matuê", nota: 7 }
];

const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 80 },
    { id: 3, nome: "Teclado", preco: 150 },
    { id: 4, nome: "Monitor", preco: 1200 }
];

// --- MÉTODOS AUXILIARES ---

function calcularMedia(lista, propriedade) {
    if (lista.length === 0) return 0;
    const soma = lista.reduce((acc, item) => acc + item[propriedade], 0);
    return soma / lista.length;
}

function buscarPorId(lista, id) {
    return lista.find(item => item.id === Number(id));
}

function filtrarPorArtista(lista, nomeArtista) {
    return lista.filter(m => m.artista.toLowerCase() === nomeArtista.toLowerCase());
}

function filtrarPorNotaMinima(lista, notaCorte) {
    const resultado = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].nota >= notaCorte) {
            resultado.push(lista[i]);
        }
    }
    return resultado;
}

// --- ROTAS FILMES ---

app.get('/filmes', (req, res) => res.json(filmes));

app.get('/filmes/:id', (req, res) => {
    const filme = buscarPorId(filmes, req.params.id);
    if (filme) {
        res.json(filme);
    } else {
        res.status(404).send("Filme não encontrado");
    }
});

app.get('/bem-avaliados', (req, res) => {
    const lista = filtrarPorNotaMinima(filmes, 9);
    res.json(lista);
});

app.get('/media-filmes', (req, res) => {
    res.json({ media: calcularMedia(filmes, 'nota') });
});

// --- ROTAS MÚSICAS ---

app.get('/musicas', (req, res) => res.json(musicas));

app.get('/musicas/:id', (req, res) => {
    const musica = buscarPorId(musicas, req.params.id);
    if (musica) {
        res.json(musica);
    } else {
        res.status(404).send("Música não encontrada");
    }
});

app.get('/artista/:nome', (req, res) => {
    const resultado = filtrarPorArtista(musicas, req.params.nome);
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send("Artista não encontrado");
    }
});

app.get('/top', (req, res) => {
    const lista = filtrarPorNotaMinima(musicas, 9);
    res.json(lista);
});

app.get('/media-musicas', (req, res) => {
    res.json({ media: calcularMedia(musicas, 'nota') });
});

// --- ROTAS PRODUTOS ---

app.get('/produtos', (req, res) => res.json(produtos));

app.get('/produtos/:id', (req, res) => {
    const produto = buscarPorId(produtos, req.params.id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send("Produto não encontrado");
    }
});

app.get('/caros', (req, res) => {
    res.json(produtos.filter(p => p.preco > 1000));
});

app.get('/baratos', (req, res) => {
    res.json(produtos.filter(p => p.preco < 200));
});

app.get('/media-preco', (req, res) => {
    res.json({ media_precos: calcularMedia(produtos, 'preco') });
});

// --- MENU E STATUS ---

app.get("/", (req, res) => {
    res.send(`
        <h1>Menu</h1>
        <a href="/filmes">Ir para filmes</a><br>
        <a href="/bem-avaliados">Ir para filmes nota >= 9</a><br>
        <a href="/media-filmes">Média notas filmes</a><br>
        <hr>
        <a href="/musicas">Ir para músicas</a><br>
        <a href="/top">Ir para músicas nota >= 9</a><br>
        <a href="/media-musicas">Média notas músicas</a><br>
        <hr>
        <a href="/produtos">Ir para produtos</a><br>
        <a href="/caros">Produtos caros</a><br>
        <a href="/media-preco">Média preços produtos</a><br>
        <hr>
        <a href="/status">Ir para status</a>
    `);
});

app.get("/status", (req, res) => {
    res.json({
        servidor: "online",
        disciplina: "LP3",
        professora: "Milena",
        hora: new Date().toLocaleString()
    });
});

const PORTA = 3001;
app.listen(PORTA, () => {
    console.log(`servidor rodando em http://localhost:${PORTA}`);
});