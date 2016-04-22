'use strict';

const PORT = process.env.PORT || 3000;
//requires: loading libraries

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var Messages = require('./models/message');
var moment = require('moment');
/////////////////////////
var myDate = moment().format('MMMM Do YYYY, h:mm:ss a');

//////////////////////////


//app declaration
var app = express();

//general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'jade');

//routes
app.route('/message')
    .get((req, res, next) =>{
        //get all dogs
        Messages.findAll((err,messages) =>{
            if(err){
                return res.status(400).send(err);
            }
            var myData = messages;
            res.render('message',{
                messages: myData
            });
            // res.send(messages)
        });
        //res.json(dogs);
    })
    .post((req, res, next) =>{
        //console.log('Request.body:', req.body)
        //creat a new dog
        Messages.create(req.body,(err, messages)  =>{
            if(err){
                return res.status(400).send(err);
            }
            var myData = messages;
            console.log(err, messages);
            res.render('message',{
                messages: myData
            });
            //res.send();
        });
    });

app.route('/message/:id')
    .get((req,res,next)=>{

    })
    .delete((req,res, next) =>{
        var id = req.params.id;

        Messages.removeById(id, err => {
            if(err){
                return res.status(400).send(err);
            }
            console.log('delete callback is called');
            res.send();
    })
    // .put((req, res, next) =>{
    //     console.log('put is working');
    //     var id = req.params.id;
    //     Messages.editMessage((req.body,id), err =>{
    //         if(err){
    //             return res.status(400).send(err);
    //         }
    //         res.send();
    //     });
    // });
});


//open, unprotected
app.get('/', (req, res, next) =>{
    res.render('index');
});

// app.get('/message', (req, res, next) =>{
//     res.render('message',{
//         messages: myData
//     });
// });

// 404 handler
app.use((req, res, next)=>{
    res.status(404).send('There file that u are looking for does not exist');
})

//create server, and listen to PORT
app.listen(PORT, err =>{
    console.log(err || `server listening on port ${PORT}`);
})
