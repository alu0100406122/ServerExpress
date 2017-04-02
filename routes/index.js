var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});



router.post('/ok', function(req, res) {
    console.log("Nombre:"+req.body.nombre);
    console.log("Apellido:"+req.body.apellidos);
    return res.json({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos
    });

});



module.exports = router;
