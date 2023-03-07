export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error ').innerHTML = "";
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error ').innerHTML = mostrarMensajeDeError(tipoDeInput,  input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo "Nombre" no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo "Correo" no puede estar vacio',
        typeMismatch: 'El correo no es valido',
    },
    password: {
        valueMissing: 'El campo no puede estar vacio',
        patternMismatch: 'Al Menos 6 caracteres, maximo 12 y debe de contener minimo una letra minuscula, mayuscula, un numero y no puede contener caracteres especiales',
    },
    nacimiento: {
        valueMissing: 'El campo "Fecha de nacimiento" no puede estar vacio',
        customError: 'Debes de tener al menos 18 años de edad',
    },
    numero: {
        valueMissing: 'Ingresa un número telefónico correcto',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números'
    },
    direccion:{
        valueMissing: 'Ingresa una dirección valida',
        patternMismatch: 'La dirección debe de contener entre 10 y 40 caracteres',
    },
    ciudad:{
        valueMissing: 'Ingresa una ciudad valida',
        patternMismatch: 'La ciudad debe de contener entre 4 y 20 caracteres',
    },
    estado:{
        valueMissing: 'Ingresa un estado valida',
        patternMismatch: 'El estado debe de contener entre 3 y 25 caracteres',
    },
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);   
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes de tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        )
    return diferenciaFechas <= fechaActual;
}