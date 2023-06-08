window.onload = ()=>{
    let useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
}

function iniciar(){
    let useconds  = 0, dseconds  = 0, uminutes  = 0, dminutes = 0
    if(useconds  > 0 || dseconds  > 0 || uminutes  > 0 || dminutes > 0){
        parar()
    }
    document.getElementById('tempo').innerHTML = `00:00`
    contador(dminutes, uminutes, dseconds, useconds)
}
function contador(dminutes, uminutes, dseconds, useconds){
    var seconds = setInterval(() => {
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
    clearInterval(seconds)
}