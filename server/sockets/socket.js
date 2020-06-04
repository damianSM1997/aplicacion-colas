const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {


    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        //'El siguiente ticket es : ', siguiente
        //el callcabk se le asigna el siguiente
        callback(siguiente);
    });

    //emiter un evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()

    });

    client.on('atenderTicket', (data, callback) => {

        //validacion para obligar que se mande el escritorio en la data
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'el escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar o notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    });


});