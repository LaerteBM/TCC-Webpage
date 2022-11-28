
setInterval(buscar_dados,2000)

function buscar_dados(){
    fetch('/get_data',{
        method: 'GET'
    }).then(res=>{
        return res.json();
    }).then(data=>{
        dados = data;
        atualizar_dashboard(dados)   
    })
}

function atualizar_dashboard(dados){
    for(let elem in dados){
        if(elem != 'id' && elem != 'timestamp'){
            tag = document.getElementById(elem)
            tag.innerText = dados[elem]
        }
    }
}

