"use strict";

const path = require('path');
const bcrypt = require('bcrypt-nodejs');

const User = require(path.join(__dirname, '../models', 'users.js'));

// Buscar un usuario
var isUser = ((usuario, password, cb) => {
  console.log("METODO isUser");
  console.log("Usuario:"+usuario);
  console.log("Password:"+password);
  
  User.findOne({Usuario: usuario}, (err, datos)=> {
    console.log("Datos findOne: "+JSON.stringify(datos));
    if(err)
    {
      console.log("Error");
      return cb(err, false);
    }

    if(datos != null) {
      console.log("Se ha encontrado usuario");
      // if(bcrypt.compareSync(password, datos.Password)) {
      return cb(null, datos);
      // }
      // else {
      //   return cb("Password incorrecto", null);
      // }
    }
    else {
        console.log("No se ha encontrado usuario");
        return cb("No se ha encontrado usuario", null);
    }
  });
});

// Añadir un usuario
var addUser = ((nombre, apellidos, usuario, password, categoria, email, cb) =>
{
  console.log("Accedi al registro de usuarios");
  console.log("Nombre: (registro):"+nombre);
  console.log("Apellidos: (registro)"+apellidos);
  console.log("Username (registro):"+usuario);
  console.log("Password: (registro)"+password);
  console.log("Categoria: (registro)"+categoria);
  console.log("Email: (registro)"+email);
  
  User.findOne({Usuario: usuario}, (err, datos)=>  {
    console.log("Datos:"+JSON.stringify(datos));
    if(err) {
      console.log("7");
      return cb(err, false);
    }

    if(datos != null) {
        console.log("Ya existe usuario...");
        console.log("Se ha encontrado usuario con ese nombre");
    }
    else
    {
        var newUser = new User();
        newUser.Nombre = nombre;
        newUser.Apellidos = apellidos;
        // newUser.Usuario = usuario;
        newUser.Password = bcrypt.hashSync(password);
        newUser.Password = password;
        newUser.Categoria = categoria;
        newUser.Email = email;
        console.log("creando nombre: "+newUser.Nombre);
        console.log("creando password: "+newUser.Password);
        console.log("creando categoria: "+newUser.Categoria);
        console.log("No se ha encontrado usuario, debería crearlo...");
        
        newUser.save(function(err){
    		if(err)
    			throw err;
    		return cb(null, newUser);
        })
    }
  });
  
});

exports.isUser = isUser;
exports.addUser = addUser;