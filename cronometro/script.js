const corpo = document.querySelector("body");
const checkStart = document.getElementById("check-start"); 
const onCrescente = document.getElementById("crescenOn");
const onDecrescente = document.getElementById("decresOn");
const addRemoveIcons = document.querySelectorAll(".add-remove-icon");

let botao = document.getElementById("modos"); 

window.onload = ()=>{
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`
}

botao.onclick = function (){
    corpo.classList.toggle("modo-ativo")
    corpo.classList.toggle("dark-mode")

}

function crescente(){
    document.getElementById("crescente").classList.add("timer-atual");
    document.getElementById("decrescente").classList.remove("timer-atual");
    onCrescente.checked = true;;
    trocarElementos();
}
function decrescente(){
    document.getElementById("decrescente").classList.add("timer-atual");
    document.getElementById("crescente").classList.remove("timer-atual");
    onDecrescente.checked = true;
    trocarElementos();
}

function trocarElementos(){
    parar();
    
    if(onDecrescente.checked){
       addRemoveIcons.forEach((element) => {
        element.style.display = "block";
       })
    }else if(onCrescente.checked){
        addRemoveIcons.forEach((element) => {
            element.style.display = "none";
        })
    }
}

/*Adicionar e remover segundos */

function addseconds(){
    useconds++;
        if(useconds >= 10){
            useconds = 0;
            dseconds++;
            if(dseconds >= 6){
                dseconds = 0;
            }
        }
        document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
}

function holderaddseconds(){
    holderSeconds = setInterval(addseconds, 100)  
}
function stopseconds(){
    clearInterval(holderSeconds)
}

function removeseconds(){
    if(dseconds == 0 && useconds == 0){
        return;
    }else{
        useconds--;
    if(useconds < 0){
        useconds = 9;
        dseconds--;
        if(dseconds < 0){
            dseconds = 0;
        }
    }
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
    }
}
function holderremoveseconds(){
    holderSeconds = setInterval(removeseconds, 100)
}

/*Adicionar e remover minutos */

function addminutes(){
    if(dminutes == 6){
        uminutes = 0;
    }
    else{
        uminutes++;
        if(uminutes >= 10){
            uminutes = 0;
            dminutes++;
            if(dminutes > 6){
                dminutes = 0;
            }
        }
        document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
}
    }
    
function holderaddminutes(){
    holderMinutes = setInterval(addminutes, 100);
}
function stopminutes(){
    clearInterval(holderMinutes)
}

function removeminutes(){
    if(dminutes == 0 && uminutes == 0){
        return;
    }else{
        uminutes--;
    if(uminutes < 0){
        uminutes = 9;
        dminutes--;
        if(dminutes < 0){
            dminutes = 0;
        }
    }
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
    }
}
function holderremoveminutes(){
    holderMinutes = setInterval(removeminutes, 100);
}


function iniciar(){
    if(checkStart.checked){
        return;
    }else{  
        checkStart.checked = true;
        if(onDecrescente.checked){
            addRemoveIcons.forEach((element) => {
                element.style.display = "none";
            })
            contagemRegressiva();
        }else{
            contagem();
        }

    }
    
}


function contagemRegressiva(){
    seconds = setInterval(() => {
        if(useconds == 0 && dseconds == 0 && uminutes == 0 && dminutes == 0){
            parar();
        }else{
            --useconds;
            if(useconds < 0){
                if(dseconds >= 0){
                    useconds = 9;
                    dseconds--;
                }
                if(dseconds < 0){
                    if(uminutes >= 0){
                            --uminutes;
                            useconds = 9;
                            dseconds = 5;
                    }
                }
                if(uminutes < 0){
                    if(dminutes > 0){
                        dminutes--;
                        uminutes = 9;
                        dseconds = 5;
                        useconds = 9;
                    }
                }
        } 
        
            
    }
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`
    }, 1000)
    

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

function pausar(){
    try{
        if(onDecrescente.checked){
            addRemoveIcons.forEach((element) => {
                element.style.display = "block";
            })
        }
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