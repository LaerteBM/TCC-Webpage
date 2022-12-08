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

//Criando CRUD
const crud = {
  registros: [],
  read(){
    crud.registros = JSON.parse(fs.readFileSync('./DB/dadosAmbiente.json', {encoding: 'utf-8'}))
    const maxID = maiorID(crud.registros)
    const ultimoRegistro = crud.registros.filter((item) => item.id === maxID);
    return ultimoRegistro
  },
  create(novoRegistro){
    //adição do novo registro no arquivo JSON
    var texto = fs.readFileSync('./DB/dadosAmbiente.json', "utf-8");
    var substituicao = "," + JSON.stringify(novoRegistro) + "]"
    texto = texto.replace("]", substituicao);
    fs.writeFileSync('./DB/dadosAmbiente.json', texto, {encoding: 'utf-8'})
  }
}


//Definição de rotas
router.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname + "/Pages/index.html"))
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
app.get('/leitura', (req, res) => {
  res.json(crud.read())
});

app.post('/gravacao', (req, res) => {
  const db = JSON.parse(fs.readFileSync('./DB/dadosAmbiente.json', {encoding: 'utf-8'}))
  const maxID = maiorID(db)
  const dados = {
    "id": maxID + 1,
    "Umidade": req.body.Umidade,
    "Temperatura": req.body.Temperatura,
    "Iluminancia": req.body.Iluminancia
  };
  crud.create(dados)
  res.end(console.log("Dados salvos!"))
});


app.use(express.static(__dirname + '/Pages'))
app.use(router)
app.listen(porta, ()=>{
  console.log(`Servidor Ativo. Porta ${porta} disponível.`)
})

