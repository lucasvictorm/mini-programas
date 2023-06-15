const corpo = document.querySelector("body");
const checkStart = document.getElementById("check-start"); 
const onCrescente = document.getElementById("crescenOn");
const onDecrescente = document.getElementById("decresOn");
const addRemoveIcons = document.querySelectorAll(".add-remove-icon");

let botao = document.getElementById("modos"); 
let useconds, dseconds, uminutesn, dminutes;
let seconds;

/*Inicializa as variáveis principais*/
window.onload = ()=>{
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`
}

/*Seletor de modo escuro*/
botao.onclick = function (){
    corpo.classList.toggle("modo-ativo")
    corpo.classList.toggle("dark-mode")

}

/*Seletor de modos do timer*/
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

/*Visibilidade dos botões de adição/remoção */
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

function addSeconds(){
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

function holderAddSeconds(){
    holderSeconds = setInterval(addSeconds, 100)  
}
function stopSeconds(){
    clearInterval(holderSeconds)
}

function removeSeconds(){
    useconds--;
    if(dseconds == 0 && useconds < 0){
        dseconds = 5;
        useconds = 9;
    }
    if(useconds < 0){
        useconds = 9;
        dseconds--;
        if(dseconds < 0){
            dseconds = 0;
        }
    }
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
}
/*Repete a função ao segurar o botão */
function holderRemoveSeconds(){
    holderSeconds = setInterval(removeSeconds, 100)
}

/*Adicionar e remover minutos */

function addMinutes(){
    uminutes++;
    if(uminutes >= 10){
        uminutes = 0;
        dminutes++;
        if(dminutes == 6){
            uminutes = 0;
        }
    }
    if(dminutes == 6 && uminutes > 0){
        dminutes = 0;
        uminutes = 0;
    }else if(dminutes == 6 && uminutes == 0){
        dseconds = 0;
        useconds = 0;
    }
    document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
}
    
function holderAddMinutes(){
    holderMinutes = setInterval(addMinutes, 100);
}
function stopMinutes(){
    clearInterval(holderMinutes);
}

function removeMinutes(){
        uminutes--;
        if(dminutes == 0 && uminutes < 0){
            dminutes = 6;
            uminutes = 0;
        }
        if(uminutes < 0){
            uminutes = 9;
            dminutes--;
            if(dminutes < 0){
                dminutes = 0;
            }
        }
        if(dminutes == 6 && uminutes == 0){
            dseconds = 0;
            useconds = 0;
        }
        document.getElementById('tempo').innerHTML = `${dminutes}${uminutes}:${dseconds}${useconds}`;
}
/*Repete a função ao segurar o botão */
function holderRemoveMinutes(){
    holderMinutes = setInterval(removeMinutes, 100);
}

/*inicia a contagem de acordo com o modo selecionado e verifica se o timer já está funcionando */
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

/*pausa a contagem */
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

/*para acontagem, zerando o timer */
function parar(){
    
    
    pausar()
    document.getElementById('tempo').innerHTML = `00:00`
    useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0;
    checkStart.checked = false;
}

/*Efeito de toque ao pressionar botões */
addRemoveIcons.forEach((element) => {
    element.addEventListener("pointerdown", () => {
        element.style.fontSize  = "2.2em";
    })
    element.addEventListener("pointerup", () => {
        element.style.fontSize = "2.3em";
    })
})