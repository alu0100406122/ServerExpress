var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const controlUsuario = require(path.join(__dirname,'app/config','usersController.js'));

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////////////////////////

//passport-local
passport.use(new LocalStrategy(
  function(username, password, cb) {
    console.log("Identificando usuario:");
    // console.log("User->"+username);
    // console.log("Password->"+password);

    controlUsuario.isUser(username, password, (err, user) =>
    {
        if(err)
        {
          console.log("error");
          return cb(null,false);
        }

        if(user != null)
        {
          console.log("Usuario logueado:"+JSON.stringify(user));
          return cb(null, user);
        }
        else
        {
          console.log("Usuario no verificado");
          return cb(null,null);
        }
    });
  }
));



////////////////////////////////////////////////////////////////////////
// app.use('/', index);
// app.use('/users', users);

// ROUTES

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});



app.post('/ok', function(req, res) {
    console.log("Nombre:"+req.body.nombre);
    console.log("Apellido:"+req.body.apellidos);
    return res.json({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos
    });

});


app.post('/login', function(req, res) {
  console.log("RUTA LOGIN...");
    console.log("Usuario:"+req.body.usuario);
    console.log("Password:"+req.body.password);
    controlUsuario.isUser(req.body.usuario, req.body.password, (err, user) => {
      if(err) {
          console.log("error");
          return res.json({Usuario: null, Password: null});
      }

      if(user != null){
        console.log("Usuario 123:"+JSON.stringify(user));
        console.log("req.body.usuario: "+user.Categoria);
        return res.json({
            Usuario: user.Usuario,
            Password: user.Password,
            Apellidos: user.Apellidos,
            Categoria: user.Categoria
        });
      }
      else {
        console.log("Usuario no registrado..");
        return res.json({Usuario: null, Password: null});
      }
    });
    
});

app.post('/registro', 
    function(req, res) {
      console.log("RUTA REGISTRO...");
      console.log("Nombre:"+req.body.nombre);
      console.log("Apellido:"+req.body.apellidos);
      console.log("Usuario:"+req.body.usuario);
      console.log("Password:"+req.body.password);
      console.log("Email:"+req.body.email);
      console.log("Categoria:"+req.body.categoria);
      // guardar los datos en mongooooooo
      controlUsuario.addUser(req.body.nombre, req.body.apellidos, req.body.usuario, req.body.password, req.body.categoria, req.body.email, (err, user) => {
        if(err) {
          console.log("error");
          throw err;
        }

        if(user != null)         {
          console.log("Usuario:"+JSON.stringify(user));
          
        }
        else {
          console.log("Usuario no creado..");
          
        }
      });
});


////////////////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
