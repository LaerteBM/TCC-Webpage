let IDADE=0
const elemento_iluminancia = document.querySelector("#divIluminancia")
const elemento_temperatura = document.querySelector("#divTemperatura")
const  elemento_umidade = document.querySelector("#divUmidade")
const  elemento_rmssd = document.querySelector("#divRMSSD")
const  elemento_sexo = document.querySelector("#divSexo")
const  elemento_idade = document.querySelector("#divIdade")
const  elemento_usuario = document.querySelector("#h2Usuario")
const  elemento_DataHora = document.querySelector("#pDH")
const modal_temperatura = document.querySelector("#alertaTemp")
const botao_temperatura = document.querySelector("#fecharModalTemp")
const modal_umidade = document.querySelector("#alertaUmi")
const botao_umidade = document.querySelector("#fecharModalUmi")
const modal_iluminancia = document.querySelector("#alertaIlum")
const botao_iluminancia = document.querySelector("#fecharModalIlum")
const modal_rmssd = document.querySelector("#alertaRMSSD")
const botao_rmssd = document.querySelector("#fecharModalRMSSD")
const modal_info = document.querySelector("#modalInfo")
const botao_info = document.querySelector("#botaoInfo")
const botao_fechar = document.querySelector("#fecharModalInfo")

inserir_informacoes()

botao_info.onclick = function () {
  modal_info.showModal()
}

botao_fechar.onclick = function () {
  modal_info.close()
}

botao_rmssd.onclick = function () {
  modal_rmssd.close()
}

botao_temperatura.onclick = function () {
  modal_temperatura.close()
}

botao_iluminancia.onclick = function () {
  modal_iluminancia.close()
}

botao_umidade.onclick = function () {
  modal_umidade.close()
}

function alerta_temperatura(TEMP) {
  
  if(TEMP>25||TEMP<18){
    modal_temperatura.showModal()
  }
  
}

function alerta_umidade(UMI) {
  
  if(UMI<40){
    modal_umidade.showModal()
  }
  
}

function alerta_iluminancia(ILUM) {
  console.log(ILUM)
  if(ILUM<40){
    modal_iluminancia.showModal()
  }
  
}

function alerta_rmssd(rmssd) {

  let rmssd_ideal
  
  if(IDADE<20) rmssd_ideal = 36.0
  else if(IDADE>=20&&IDADE<50) rmssd_ideal = 24
  else if(IDADE>=50&&IDADE<70) rmssd_ideal = 16
  else if(IDADE>=70&&IDADE<80) rmssd_ideal = 17
  else if(IDADE>=70&&IDADE<80) rmssd_ideal = 16
  else rmssd_ideal = 15

  console.log("RMSSD: "+ rmssd)
  console.log("RMSSD ideal: "+ rmssd_ideal)
  
  if (rmssd<rmssd_ideal) {
    modal_rmssd.showModal()
  }
  
}

function inserir_informacoes() {

  let url = `https://burdenlite-tcc-laerte.laertebernardo.repl.co/leituraDadosDash`
  let url2 = `https://burdenlite-tcc-laerte.laertebernardo.repl.co/leituraDadosUsuario`

    fetch(url2)
        .then(response => response.json())
        .then(info => {
          let sexo = `<h5>${info[0].Sexo}</h5>`
          IDADE = parseFloat(info[0].Idade)
          let idade = `<h5>${info[0].Idade} anos</h5>`
          let nome = `Olá ${info[0].Nome}!`
          
          
          elemento_sexo.insertAdjacentHTML("beforeend", sexo)
          elemento_idade.insertAdjacentHTML("beforeend", idade)
          elemento_usuario.insertAdjacentHTML("beforeend", nome)
          
        })
  
    fetch(url)
        .then(res => res.json())
        .then(informacoes => {
          
          let DH = `${informacoes[0].DataHora}`
          let iluminancia = `<h5>${informacoes[0].Iluminancia} lux</h5>`
          let temperatura = `<h5>${informacoes[0].Temperatura} ºC</h5>`
          let umidade = `<h5>${informacoes[0].Umidade} %</h5>`
          let RMSSD = `<h5>${informacoes[0].RMSSD} ms</h5>`

          elemento_iluminancia.insertAdjacentHTML("beforeend", iluminancia)
          elemento_temperatura.insertAdjacentHTML("beforeend", temperatura)
          elemento_umidade.insertAdjacentHTML("beforeend", umidade)
          elemento_rmssd.insertAdjacentHTML("beforeend", RMSSD)
          elemento_DataHora.insertAdjacentHTML("beforeend", DH)

      alerta_iluminancia(parseFloat(informacoes[0].Iluminancia))
      alerta_umidade(parseInt(informacoes[0].Umidade))
      alerta_temperatura(parseFloat(informacoes[0].Temperatura))
      alerta_rmssd(parseFloat(informacoes[0].RMSSD))
      
        })
  
  
}