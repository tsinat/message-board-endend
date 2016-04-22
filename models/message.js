'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

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
    var newMessage ={
        name:message.name,
        email:message.email,
        image:message.image,
        message:message.message,
        id:uuid()
    };

    messages.push(newMessage);

    fs.writeFile(dataFile, JSON.stringify(messages), err =>{
        cb(err, messages);
    });
  });
};


exports.eidtMessage = function(message, cb){
    // if(!id)return cb('id required.');
    this.findAll((err,messages) =>{
        if(err){
            return cb(err)
        }
        var editedMessage ={
            name:message.name,
            email:message.email,
            image:message.image,
            message:message.message,
            id:message.id
        };
     var oldMessage = messages.filter(message => message.id ==id)[0];
     var index = messages.indexOf(oldMessage);
     messages[index]= editedMessage;
     fs.writeFile(dataFile, JSON.stringify(messages), err =>{
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
        fs.writeFile(dataFile, JSON.stringify(messages), err =>{
            cb(err);
        });
    });
}
