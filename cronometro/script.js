const botao = document.getElementById("modos");
const corpo = document.querySelector("body")
const darkIcon = document.getElementById("dark-icon")
const lightIcon = document.getElementById("light-icon")
botao.onclick = function (){
    corpo.classList.toggle("modo-ativo")
    corpo.classList.toggle("dark-mode")

}



window.onload = ()=>{
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
}

function iniciar(){
    parar()
    /*if(document.getElementById("tempo").innerHTML != "00:00"){
        parar()
    }*/
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
    document.getElementById('tempo').innerHTML = `00:00`
    contador(dminutes, uminutes, dseconds, useconds)
    ativo = true;
}
function contador(dminutes, uminutes, dseconds, useconds){
    
     seconds = setInterval(() => {
        ++useconds
        if(useconds >= 10){
            useconds = 0;
            ++dseconds
            if(dseconds >= 6){
                dseconds = 0
                ++uminutes
                if(uminutes >= 10){
                    uminutes = 0
                    ++dminutes
                    if(dminutes >= 6){
                        dminutes = 0
                        uminutes = 0
                        dseconds = 0
                        useconds = 0
                    }
                }
            }
        }
        document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`
    }, 1000)
    
}
function parar(){
    try{
        clearInterval(seconds)
    }
    catch{
        return;
    }
    
}
