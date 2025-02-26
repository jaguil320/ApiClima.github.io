const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit',buscarClima);
})

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

   // console.log(ciudad)
    //console.log(pais)

    //validar los campos//

    if(ciudad === '' | pais=== ''){

       //console.log('los campos son obligatorios'); 
        mostrarError('los campos son obligatorios');
    }else{
        //console.log('campos llenos')
        //mostrarError('campos llenos');
        consultarAPI(ciudad,pais);
    }

}

function mostrarClima(datos){
 
    const {name,main:{temp,temp_max,temp_min}}= datos;

    const TempA = kelvinCent(temp);
    const Min = kelvinCent(temp_min);
    const max= kelvinCent(temp_max);


   // console.log(temp);

    //mostrar resultados en html

    const nombreCiudad= document.createElement('p');
    nombreCiudad.classList.add('font-bold','text-6xl');
    nombreCiudad.innerHTML = `Clima en: ${name}`;


    const tempActual = document.createElement('p');
    tempActual.classList.add('font-bold', 'text-6xl',);
    tempActual.innerHTML=`${TempA}&#8451`;
    
    const tempMinima= document.createElement('p');
    tempMinima.classList.add('text-xl');
    tempMinima.innerHTML= `Min: ${Min}&#8451`;

    const tempMaxima= document.createElement('p');
    tempMaxima.classList.add('text-xl');
    tempMaxima.innerHTML= `Min: ${max}&#8451`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);


    resultado.appendChild(resultadoDiv);

}

function mostrarSpinner(){

    divSpinner= document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML=`
    
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>

    `;

    resultado.appendChild(divSpinner);

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }}



function kelvinCent(grados){
    return parseInt(grados - 273.15)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta){
        const alertaMsj = document.createElement('div');
        alertaMsj.classList.add(

            'bg-red-100','boder-red-400',
            'text-red-700','px-4', 
            'py-3','rounded', 
            'relative','max-w-md', 
            'mx-auto','mt-6', 
            'text-center'
            );

        alertaMsj.innerHTML=`
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;
        contenedor.appendChild(alertaMsj);

        setTimeout(()=>{
            alertaMsj.remove();
        },3000);

    }

    
}

function consultarAPI(ciudad,pais){

    const appid='d250b83a8dc001291f2942610762c85f';

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

   mostrarSpinner();
        fetch(url).then(respuesta=>{
                return respuesta.json();
        })
        .then(datos=>{
        
            console.log(datos);
            limpiarHTML();

            //validacion
            if(datos.cod==='404'){
                mostrarError('la ciudad ingresada no ha sido ubicada')
            }else{
                mostrarClima(datos)
            }
        })
        .catch(error=>{
            console.log(error)
        })
}


