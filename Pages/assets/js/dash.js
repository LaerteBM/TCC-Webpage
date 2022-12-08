const info_iluminancia = document.querySelector("#divIluminancia")
const info_temperatura = document.querySelector("#divTemperatura")
const  info_umidade = document.querySelector("#divUmidade")

inserir_informacoesAmbiente()

function inserir_informacoesAmbiente() {

  let url = `https://burdenlite-tcc-laerte.laertebernardo.repl.co/leitura`

    fetch(url)
        .then(res => res.json())
        .then(informacoes => {

          let iluminancia = `<h5>${informacoes[0].Iluminancia}</h5>`
          let temperatura = `<h5>${informacoes[0].Temperatura}</h5>`
          let umidade = `<h5>${informacoes[0].Umidade}</h5>`

          info_iluminancia.insertAdjacentHTML("beforeend", iluminancia)
          info_temperatura.insertAdjacentHTML("beforeend", temperatura)
          info_umidade.insertAdjacentHTML("beforeend", umidade)

        })
  
}