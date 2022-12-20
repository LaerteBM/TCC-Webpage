const info_nome = document.getElementById("name")
const info_idade = document.getElementById("age")

inserir_informacoes()
editarUsuario()

function editarUsuario() {
  const formpost = document.getElementById("post-usuario")
  let url = 'https://burdenlite-tcc-laerte.laertebernardo.repl.co/gravacaoDadosUsuario'

  formpost.addEventListener('submit', evento =>{
    evento.preventDefault()
    const formData = new FormData(formpost)
    const dados = Object.fromEntries(formData)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(res => res.json())
    window.location.href = "https://burdenlite-tcc-laerte.laertebernardo.repl.co/alteracaoUsuario"
  })
  
}

function inserir_informacoes(){
  
  let url = `https://burdenlite-tcc-laerte.laertebernardo.repl.co/leituraDadosUsuario`

  fetch(url)
        .then(res => res.json())
        .then(informacoes => {

          info_nome.value = informacoes[0].Nome
          info_idade.value = parseInt(informacoes[0].Idade)
          if (informacoes[0].Sexo === 'Masculino') {
            document.getElementById("Mas").selected=true;
          }
          else{
            document.getElementById("Fem").selected=true;
          }

        })
}