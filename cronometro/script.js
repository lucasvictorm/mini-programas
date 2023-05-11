function iniciar(){
    if(document.getElementById('tempo').innerHTML > 0){
        parar()
    }
    document.getElementById('tempo').innerHTML = 0
    cronometro = setInterval(function(){
        var tempo = document.getElementById('tempo');
        var soma = parseInt(tempo.innerHTML) + 1
        tempo.innerHTML = soma
    }, 1000)
}

function parar(){
    clearInterval(cronometro)
}