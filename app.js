//carrega as variáveis de ambiente do arquivo .env para a aplicação
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

//conexão ao BD-------------------------------------------------------
const db = require('./models')

try{
    db.sequelize.authenticate()
    console.log('SEQUELIZE: connection has been established successfully.')
}
catch(error){
    console.error('* SEQUELIZE: unable to connect to the database', error)
    process.exit(1)   //encerra o servidor com erro
}
//----------------------------------------------------------------------


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/****************** ROTAS ******************/
const users = require('./routes/users')
app.use('/users', users)

const channels = require('./routes/channels')
app.use('/channels', channels)

const paymentMethods = require('./routes/payment_methods')
app.use('/payment_methods', paymentMethods)

const carriers = require('./routes/carriers')
app.use('/carriers', carriers)

const shipmentPriorities = require('./routes/shipment_priorities')
app.use('/shipment_priorities', shipmentPriorities)

const orderTags = require('./routes/order_tags')
app.use('/order_tags', orderTags)

const tags = require('./routes/tags')
app.use('/tags', tags)

module.exports = app;
