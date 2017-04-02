"use strict"
// Modelo para la tabla Users

// var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/UsersDB');
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("We are connected!");
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    Nombre: String,
    Apellidos: String,
    Usuario: {type: String, index: true},
    Password: String,
    Categoria: String,
    Email: String
    
}, {collection: "users"});

const User = mongoose.model('User', userSchema);


///////////////////////////////////////////////////////////////////////////////

// UserSchema.pre(‘save’, { 
//   var user = this;
// // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();

// // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);

//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//   });
// });
// });

///////////////////////////////////////////////////////////////////////////////


// var usuario1 = new User({
//   Nombre: "maca",
//   Apellido: "maca",
//   Usuario: "maca",
//   Password: "maca",
//   Categoria: "maca",
//   Email: "maca"
// });

// usuario1.save(function(err){
// 	if(err)
// 		throw err;
// 	console.log(`Creado ${usuario1}`);
// })


module.exports = User;