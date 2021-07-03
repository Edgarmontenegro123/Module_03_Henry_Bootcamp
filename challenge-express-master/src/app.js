var express = require("express");
var server = express();
var bodyParser = require("body-parser");
const {query} = require("express");

/*  model.clients = {
    javier: [{date: '22/10/2020 14:00', status: 'pending'}, {}, {}]
} */
   /*  console.log('Params', req.params)
        console.log('Querys', req.query) */

var model = {
    clients: {},

    reset: () => {
        model.clients = {}
    },

    addAppointment: (name, appointment) => {
        appointment = {...appointment, status: 'pending'} 
        if(!model.clients[name]){
            model.clients[name] = [appointment]
        }
        else{
            model.clients[name].push(appointment)
        }
        return appointment;
    },

    attend: (name, date) => {
        model.clients[name].find(appointment => appointment.date === date).status = 'attended'            
    },

    expire: (name, date) => {
        model.clients[name].find(appointment => appointment.date === date).status = 'expired'               
    },

    cancel: (name, date) => {
        model.clients[name].find(appointment => appointment.date === date).status = 'cancelled'               
    },

    erase: (name, str) => {
        if(str.includes('/')){
            model.clients[name] = model.clients[name].filter(appointment => appointment.date !== str)
        }
        else{
            model.clients[name] = model.clients[name].filter(appointment => appointment.status !== str)
        }
    },

    getAppointments: (name, status) => {
       /*  if(status){
            return model.clients[name].filter(appointment => appointment.status === status)
        }else{
            return model.clients[name];
        }  */ 
        return status ? model.clients[name].filter(appointment => appointment.status === status) : model.clients[name];
    },

    getClients: () => Object.keys(model.clients)
    

};

    /* server.use(bodyParser.json()); */
    server.use(express.json());

    server.get('/api', (req, res) => {
        res.json(model.clients)
    })

    server.post('/api/Appointments', (req, res) => {
        const{client, appointment} = req.body;
    
        if(!client){
            res.status(400).send('the body must have a client property');
            return;
        }
        else if(typeof(client) !== 'string'){
            res.status(400).send('client must be a string');
            return;
        }
        res.send(model.addAppointment(client, appointment));
    })

    server.get('/api/Appointments/clients', (req, res) => {
        res.send(model.getClients());
    })

    server.get('/api/Appointments/:name', (req, res) =>{
        const {name} = req.params;
        const {date, option} = req.query;

        if(!model.clients[name]){
            res.status(400).send('the client does not exist');
            return;
        }
        const result = model.clients[name].find(d => d.date === date)
        if(!result){
            res.status(400).send('the client does not have a appointment for that date');
            return;
        }
        const options = ['attend', 'expire', 'cancel']
        if(!options.includes(option)){
            res.status(400).send('the option must be attend, expire or cancel');
            return;
        }
        else{
            model[option](name,date);
        }
       /*  if(option === 'attend'){
            res.send(model.attend(name, date))
        }
        else if(option === 'expire'){
            res.send(model.expire(name, date))
        }
        if(option === 'cancel'){
            res.send(model.cancel(name, date))
        }   */
        res.json(result);
    })
    server.get('/api/Appointments/:name/erase', (req, res) => { 
        const {name} = req.params;
        const {date} = req.query;
       
        if(!model.clients[name]){
            res.status(400).send('the client does not exist');
            return;
        }
        else{
            let result = model.clients[name].filter(e => {
                if(e.date === date || e.status === date){
                    return e
                }
            })
            model.erase(name, date)
            return res.send(result)
        }   
    })
        
    server.get('/api/Appointments/getAppointments/:name', (req, res) => {

        let{name} = req.params;
        let{status} = req.query;
       
        let result = model.getAppointments(name, status);
        res.send(result);
    })

server.listen(3000);
module.exports = {model, server};
