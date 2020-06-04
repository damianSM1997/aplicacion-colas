// Comando para establecer la conexión
var socket = io();
//referencia directa de hhtml con jquery
var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual'
//socket.on('estadoActual', function(resp) {
//
//    console.log(resp);
//    label.text(resp.actual);
//
//});

//on 'estado actual

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);

})



$('button').on('click', function() {


    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //aqui sele asigna a ese label el valor de siguiente ticket
        //aparte de definir  esta funcion se requiere ejecutar en el servidor
        //por medio de un callbck
        label.text(siguienteTicket);
    });

});