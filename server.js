var express = require('express'),
    app     = express(),
    bodyParser =  require('body-parser'),
    mysql   = require('mysql');

var connection = mysql.createConnection({
   host:       'localhost',
   user:       'root',
   password:   '',
   database:   'scrum',
});

const port = process.env.PORT || 3001

function query(request,callback){
   connection.query(request,function(que_err,que_res,que_fileds){
            if(que_err) callback(undefined,que_err)
            else callback(que_res,undefined);
   });
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public')); //Esto es la pagina que se muestra al acceder a http://localhost/puerto

app.post("/post/register", function(req,res){
   console.log('POST realizado con exito');
   console.log(req.body);

    var quer = {
     //id_tm:2,
      Nombre: req.body.name,
      Rol: req.body.rol,
      Nick: req.body.nick,
      password: req.body.password,
      e-mail: req.body.email
   };
   var sql = 'insert into team_member set' + mysql.escape(quer);
   query(sql,function(result,err){
      if(err)console.log(err)
      //i++;
      res.redirect("/");
      res.end();
   })
});

app.post("/post/login", function(req,res){
    console.log('Estamos comprobando si esta en el sistema');
    console.log(req.body)
    var sql = 'select Nick, password from team_member where nick = "' + req.body.nick_login + '" and password= "' + req.body.password_login +'";';
    console.log(sql);
    query(sql,function(result,err){
        if(err)console.log(err)
        if(result) console.log("Cuenta valida");
        res.redirect("/");   //Con esto volvemos a esa direccion
        res.end();
    })






});





/*
app.get("/get/sprint",function(req,res){
   query('select * from team_member',function(result,err){
      if(err)console.log(err)
      res.json(result);
      res.end();
   });
});
var i = 15;
app.get("/post",function(req,res){
   var quer = {
     id_tm:i+1,
      Nombre:'Eduardo',
      Rol:'ScrumMaster',
      Nick:'Edu',
      password:'12345',
      "e-mail":'edu@gmail.com'
   };
   var sql = 'insert into team_member set' + mysql.escape(quer);
   query(sql,function(result,err){
      if(err)console.log(err)
      i++;
      res.redirect("/get");
      res.end();
   })
});

app.get("/delete",function(req,res){
   var sql = 'delete from team_member where id_tm = ' + i;
   query(sql,function(result,err){
      if(err)console.log(err)
      i--;
      res.redirect("/get");
      res.end();
   })
});
*/

connection.connect((err, res) => {
    if (err){
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')

app.listen(port, function() {
    console.log(`API REST corriendo en http://localhost:${port}`)
})
})
