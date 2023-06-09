const corpo = document.querySelector("body");
const checkStart = document.getElementById("check-start"); 
let botao = document.getElementById("modos"); 

botao.onclick = function (){
    corpo.classList.toggle("modo-ativo")
    corpo.classList.toggle("dark-mode")

}


window.onload = ()=>{
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
}

function iniciar(){
    if(checkStart.checked){
        return;
    }else{
        checkStart.checked = true;
        contagem()
    }
    
}

function contagem(){

    /*contador(dminutes, uminutes, dseconds, useconds)*/

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
/*function contador(dminutes, uminutes, dseconds, useconds){
    
}*/

function pausar(){
    try{
        clearInterval(seconds)
        console.log(seconds)
        checkStart.checked = false;
    }
    catch{
        return;
    }
}




function parar(){
    pausar()
    document.getElementById('tempo').innerHTML = `00:00`
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0;
    checkStart.checked = false;
}
