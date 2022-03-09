const form = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', () => {
    obtenerObj();
});

//Funcion que obtiene los datos y los convierte a Json
async function obtenerObj() {
    const url =
        'https://filesstaticpulzo.s3.us-west-2.amazonaws.com/pulzo-lite/jsons/rushbet/native/1007806226.json';

    //! Migracion a Async - Await
    try {
        const repuesta = await fetch(url); //!await - URL
        const datos = await repuesta.json(); //!await - JSON
        mostrarDatos(datos);
    } catch (error) {
        console.log(error);
    }
}

//Funcion que realizar la descomposición de los datos mediante destructuring
function mostrarDatos(datos) {
    const { url, valorEmp, valorLoc, valorVis } = datos;

    asignarLogo(datos);
    asginaCuota(valorLoc, valorVis, valorEmp);
    btnApuesteAhora(url);
    calcular(datos);

    document.querySelector('#localInput').value = valorLoc;
    document.querySelector('#visitanteInput').value = valorVis;
    document.querySelector('#empateInput').value = valorEmp;
}

//Asigna lo logos desde el JSON
function asignarLogo(datos) {
    const { logoLoc, logoVis } = datos;

    const local = document.querySelector('#localImg');
    local.style.backgroundImage = `url('${logoLoc}')`;
    local.style.backgroundSize = `cover`;

    const visit = document.querySelector('#visitImg');
    visit.style.backgroundImage = `url('${logoVis}')`;
    visit.style.backgroundSize = `cover`;
}

//Asigna Valores de Cotas en la parte inferior
function asginaCuota(valorLoc, valorVis, valorEmp) {
    const localCuota = document.querySelector('#localCuota');
    localCuota.textContent = valorLoc;

    const empateCuota = document.querySelector('#empateCuota');
    empateCuota.textContent = valorEmp;

    const visitanteCuota = document.querySelector('#visitanteCuota');
    visitanteCuota.textContent = valorVis;
}

//Redirecciona el boton Apueste ahora
function btnApuesteAhora(url) {
    const btnApueste = document.querySelector('.btnApuesteAhora');
    btnApueste.addEventListener('click', () => {
        window.location.href = `${url}`;
    });
}

//Realiza el calculo y la valudacion del formulario y lo muestra en el HTML
function calcular(datos) {
   /*  const { valorEmp, valorLoc, valorVis } = datos; */

    /* console.log(datos); */
    //! Submit del form
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {
        e.preventDefault();

            const input = parseInt(e.target.elements[1].value);
            const input1 = document.querySelector('#input1').value;
            const selecionado = parseFloat(
                document.querySelector('input[name="select"]:checked').value
            );

            if (input1 === '') {

                mostrarAlerta();
                
                return;
            }

            mostrarSpinner();

            setTimeout(() => {
                const ganas = parseInt(selecionado * input);
                const inputGanas = document.querySelector('#inputGanas');
                inputGanas.value = ganas;

            }, 3000);
    }
}


function mostrarSpinner() {

    const spinner = document.createElement('DIV');

    const haySpiner = document.querySelector('.spinner');

    if (!haySpiner) {

    spinner.classList.add('spinner', 'sk-circle');
    spinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `;

    form.appendChild(spinner)

    setTimeout(() => {
        spinner.remove()
    }, 3000);
    }

    
}


function mostrarAlerta(mensaje) {
    const existeError = document.querySelector('.error');

    if (!existeError) {
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('error');

        //!mensaje error
        divMensaje.textContent = 'Llena el primer campo!';

        form.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}