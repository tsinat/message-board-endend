'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var moment = require('moment');

var dataFile = path.join(__dirname,'../data/messages.json');

// of interacting with the data


exports.findAll = function(callback){

    fs.readFile(dataFile, (err,data) =>{
        if(err){
            callback(err);
            return;
        }
        try{
            var messages = JSON.parse(data);

        }catch(err){
            return callback(err)
        }
        callback(null, messages);
    });
};

//create new messages
//save is to the DB
exports.create = function(message, cb){
    // if(!message.name || !message.body){
    //     return cb('message should have name and body.')
    // }

    this.findAll((err, messages) =>{
        if(err){
            return cb(err);
        }
    var myDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    var newMessage ={
        name:message.name,
        email:message.email,
        image:message.image,
        date:myDate,
        message:message.message,
        id:uuid()
    };

    messages.push(newMessage);

    fs.writeFile(dataFile, JSON.stringify(messages, null, 2), err =>{
        cb(err, messages);
    });
  });
};


exports.editMessage = function(message2,myId, cb){
    // if(!id)return cb('id required.');
    this.findAll((err,messages) =>{
        if(err){
            return cb(err)
        }
        var myDate = moment().format('MMMM Do YYYY, h:mm:ss a');
        var editedMessage ={
            name:message2.name,
            email:message2.email,
            date: myDate,
            image:message2.image,
            message:message2.message,
            id:myId
        };
     var oldMessage = messages.filter(message => message2.id ==id)[0];
     var index = messages.indexOf(oldMessage);
     messages[index]= editedMessage;
     fs.writeFile(dataFile, JSON.stringify(messages, null,2), err =>{
         cb(err);
     });
 });

};

exports.removeById = function(id, cb){
    this.findAll((err, messages) =>{
        if(err){
            return cb(err)
        }
         var myMessage = messages.filter(message => message.id ==id)[0];
         var index = messages.indexOf(myMessage)
         messages.splice(index, 1);
        // messages = messages.filter(message =>message.id !=id);
        fs.writeFile(dataFile, JSON.stringify(messages, null, 2), err =>{
            cb(err);
        });
    });
}
