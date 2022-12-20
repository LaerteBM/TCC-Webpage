const express = require("express")
const path =  require("path")
const fs  =  require("fs")
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()
const porta = 3000

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Funções secundárias
function maiorID(obj) {
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.id;
    })))
}

//Funções Create e Read para os dados do dashboard
const crDash = {
  registros: [],
  read(){
    crDash.registros = JSON.parse(fs.readFileSync('./DB/dadosDash.json', {encoding: 'utf-8'}))
    const maxID = maiorID(crDash.registros)
    const ultimoRegistro = crDash.registros.filter((item) => item.id === maxID);
    return ultimoRegistro
  },
  create(novoRegistro){
    //adição do novo registro no arquivo JSON
    var texto = fs.readFileSync('./DB/dadosDash.json', "utf-8");
    var substituicao = "," + JSON.stringify(novoRegistro) + "]"
    texto = texto.replace("]", substituicao);
    fs.writeFileSync('./DB/dadosDash.json', texto, {encoding: 'utf-8'})
  }
}

//Funções Create e Read para os dados da tela de usuário
const crUsuario = {
  jsonUsuario: [],
  read(){
    crUsuario.jsonUsuario = JSON.parse(fs.readFileSync('./DB/dadosUsuario.json', {encoding: 'utf-8'}))
    return crUsuario.jsonUsuario
  },
  create(novoRegistro){
    //adição do novo registro no arquivo JSON
    fs.writeFileSync('./DB/dadosUsuario.json', "[" + JSON.stringify(novoRegistro) + "]", {encoding: 'utf-8'})
  }
}

//Definição de rotas
router.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/index.html"))
})

router.get("/alteracaoUsuario", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/usuarioSalvo.html"))
})

router.get("/usuario", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/usuario.html"))
})

router.get("/contato", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/contato.html"))
})

router.get("/dashboard", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/dashboard.html"))
})

router.get("/obrigado", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/obrigado.html"))
})

//app.get('/leitura', (req, res) => res.json(dados));
app.get('/leituraDadosDash', (req, res) => {
  res.json(crDash.read())
});

app.get('/leituraDadosUsuario', (req, res) => {
  res.json(crUsuario.read())
});

app.post('/teste', (req, res) => {
  console.log(req.body)
  res.send(req.body)
});

app.post('/gravacaoDadosDash', (req, res) => {
  const db = JSON.parse(fs.readFileSync('./DB/dadosDash.json', {encoding: 'utf-8'}))
  const maxID = maiorID(db)
  var DATE = new Date().toLocaleString("pt-BR", {timeZone: "America/Recife"})
  
  const dados = {
    "id": maxID + 1,
    "Umidade": req.body.Umidade,
    "Temperatura": req.body.Temperatura,
    "Iluminancia": req.body.Iluminancia,
    "DataHora": DATE,
    "RMSSD": req.body.RMSSD
  };
  crDash.create(dados)
  res.json(dados);
  res.end(console.log("Dados salvos!"))
});

app.post('/gravacaoDadosUsuario', (req, res) => {
  const dados = {
    "Nome": req.body.Nome,
    "Idade": req.body.Idade,
    "Sexo": req.body.Sexo,
  };
  crUsuario.create(dados)
  res.json(dados);
  res.end(console.log("Dados salvos!"))
});

app.use(express.static(__dirname + '/Pages'))
app.use(router)
app.listen(porta, ()=>{
  console.log(`Servidor Ativo. Porta ${porta} disponível.`)
})