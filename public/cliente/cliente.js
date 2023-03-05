var socket = io();

var form_mensaje = document.getElementById('form_mensaje');
var input_mensaje = document.getElementById('input_mensaje');

form_mensaje.addEventListener('submit', function(e){
    e.preventDefault();
    if(input_mensaje.value){
        socket.emit('mensaje', input_mensaje.value);
        // console.log(mensaje.value);
        input_mensaje.value = '';
    }
});

socket.on('mensaje2', function(mensaje){
    console.log(mensaje);
    console.log('matalasscañas2');
    // div = document.getElementById('escribir');
    // div.innerHTML = mensaje;
    escribirMensaje(mensaje);
});

function escribirMensaje(mensaje){
    ul = document.getElementById('mensajes');
    ul.innerHTML = "<li>" + mensaje + "</li>" + ul.innerHTML;
}

//Subida foto

// var form_foto = document.getElementById('form_foto');

// form_foto.addEventListener('submit', function(e){
//     // e.preventDefault();
//     // var file = document.getElementById('file').files[0];
//     // var formData = new FormData();
//     // formData.append('file', file);
//     // console.log(formData);
//     // fetch('/upload', {
//     //     method: 'POST',
//     //     body: formData
//     // })
//     // .then(res => res.json())
//     // .then(res => console.log(res))
//     // .catch(err => console.log(err));
//     socket.emit('subirFoto', 'subirFoto');
// });

//Fin subida foto