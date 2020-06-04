const fs = require('fs');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; /// todos los tikes pendientes de revision
        this.ultimos4 = []; // muestra los ultimos cuatro

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets; // asiga lo que este en la data
            this.ultimos4 = data.ultimos4; // asigna los ultimos 4

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {

        this.ultimo += 1;
        //sabra que tiquet es el ultimo y lo comola en ticket
        let ticket = new Ticket(this.ultimo, null);
        //agregar ese tiquet al aregro de tickets
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'no hay tickets'
        }
        //ronpe la relacion para el objeto que pasa por referencia
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        // el escritorio se obtiene porque se esta reciviendo
        // como argumento a esta funcion
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //para agregar al unicio del arreglo es unshift
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            //esto borra el ultimo elemento
            this.ultimos4.splice(-1, 1);
        }

        console.log('ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //grava todos los tickes pendientes
            ultimos4: this.ultimos4 // grava los ultimos 4
        };
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);



    }
}


module.exports = {
    TicketControl
}