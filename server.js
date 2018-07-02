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

//Peticion POST para registrar usuarios
app.post("/post/register", function(req,res){
  console.log('POST realizado con exito');
  console.log(req.body);

  var quer = {
    Nombre: req.body.name,
    Rol: req.body.rol,
    Nick: req.body.nick,
    password: req.body.password,
    "e-mail": req.body.email
  };
  var sql = 'insert into team_member set' + mysql.escape(quer);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err)console.log(err)

    if (result) return res.status(200).send({message: 'Usuario registrado con exito'})


    res.redirect("/");
    res.end();
  })
});

//Peticion POST para logear usuarios (comprobamos si estan en el sistema)
app.post("/get/login", function(req,res){
  console.log('Comprobando usuario en el sistema...');
  console.log(req.body)
  var sql = 'select Nick, password, Rol from team_member where nick = "' + req.body.nick_login + '" and password= "' + req.body.password_login +'";';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result.length!=0) {

      console.log("Cuenta valida");
      console.log(result);
      return res.status(200).send({message: 'Cuenta valida', result})
    }
    else {
      return res.status(404).send({message: 'No se ha encontrado usuario en la base de datos'})

    }
    res.redirect("/");
    res.end();
  })
});

app.post("/get/user-data", function(req,res){
  console.log('Obteniendo Datos del Usuario...');

  console.log(req.body);

  var sql = 'select * from team_member  where nick = "' + req.body.nick + '";' //Aqui habra que recoger el nombre de una cookie
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);


      return res.status(200).send({message: 'Datos de Usuario Encontrados en la Base de Datos', result})
      console.log("Datos de Usuario Encontrados en la Base de Datos");
    } else {
      return res.status(404).send({message: 'No se han encontrado Datos de Usuario'})
      console.log("No se han encontrado Datos de Usuario");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});


app.get("/get/completed-Stories", function(req,res){
  console.log('Obteniendo historias completadas...');
  var sql = 'select * from user_story where Status = "Terminada"';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.get('/get/sprint-Stories', function(req,res){
  console.log('Obteniendo historias del sprint activo...');
  var sql = 'SELECT DISTINCT user_story.* FROM user_story INNER JOIN develop INNER JOIN sprint WHERE user_story.id_us = develop.id_us AND sprint.id_sp = develop.id_sprint AND sprint.Status = "Activo"';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.get('/get/sprint-multiple-Stories', function(req,res){
  console.log('Obteniendo historias que están en múltiples sprints...');
  var sql = 'SELECT * FROM user_story where user_story.id_us IN (SELECT develop.id_us FROM develop GROUP BY develop.id_us HAVING COUNT(develop.id_us) >= 2)';

  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.post('/get/assigned-Stories', function(req,res){
  console.log('Obteniendo historias asignadas al usuario en cuestión...');
  var sql = 'SELECT DISTINCT stored_user_story.* FROM stored_user_story INNER JOIN team_member WHERE stored_user_story.Developer = team_member.id_tm AND team_member.Nombre = "' + req.body.nombre +'" GROUP BY Nombre;';

  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.post('/get/my-stories', function(req,res){
  console.log('Obteniendo historias asignadas al usuario en cuestión...');
  var sql = 'SELECT DISTINCT stored_user_story.* FROM stored_user_story INNER JOIN team_member WHERE stored_user_story.Developer = team_member.id_tm AND team_member.Nick = "' + req.body.nick +'" GROUP BY Nombre;';

  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});



app.get('/get/all-Stories', function(req,res){
  console.log('Obteniendo historias que están en múltiples sprints...');
  var sql = 'SELECT * FROM user_story';

  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});



app.post("/post/add-Stories", function(req,res){
  console.log('Añadiendo historias de usuario...');

  for (var i = 0; i < req.body.length; i++) {
    var quer = {
      Nombre: req.body[i].Nombre,
      Prioridad: req.body[i].Prioridad,
      Dificultad: req.body[i].Dificultad,
      Comentarios: req.body[i].Comentarios,
      "Horas acumuladas": req.body[i]['Horas acumuladas'],
      Status: req.body[i].Status,
      "As a": req.body[i]['As a'],
      "I want": req.body[i]['I want'],
      "So that": req.body[i]['So that']

    };

    var sql = 'insert into user_story set ' + mysql.escape(quer);
    console.log(sql);
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
  }

  if (i = req.body.length) return res.status(200).send({message: 'Historias Añadidas'})
  else return res.status(500).send({message: 'Error, no se han podido añadir las Historias'})

  res.redirect("/");
  res.end();

});



app.post("/post/delete-Stories", function(req,res){
  console.log('Eliminando historia de usuario...');

  var quer = {
    Nombre: req.body.Nombre,
    Prioridad: req.body.Prioridad,
    Dificultad: req.body.Dificultad,
    Comentarios: req.body.Comentarios,
    "Horas acumuladas": req.body['Horas acumuladas'],
    Status: req.body.Status,
    "As a": req.body['As a'],
    "I want": req.body['I want'],
    "So that": req.body['So that']
  };

  var sql = 'DELETE from user_story WHERE Nombre = "' + req.body.Nombre + '" and Comentarios= "' + req.body.Comentarios +'";';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      return res.status(200).send({message: 'Cuenta eliminada'})
      console.log("Cuenta eliminada");
    }
    res.redirect("/");
    res.end();
  })
});

app.post("/post/update-Stories", function(req,res){
  console.log('Actualizando historias de usuario...');
  console.log(req.body.length);
  for (var i = 0; i < req.body.length-1; i++) {
    var quer = {
      Nombre: req.body[i].Nombre,
      Prioridad: req.body[i].Prioridad,
      Dificultad: req.body[i].Dificultad,
      Comentarios: req.body[i].Comentarios,
      "Horas acumuladas": req.body[i]['Horas acumuladas'],
      Status: req.body[i].Status,
      "As a": req.body[i]['As a'],
      "I want": req.body[i]['I want'],
      "So that": req.body[i]['So that']

    };

    var sql = 'UPDATE user_story SET ' + mysql.escape(quer) + 'WHERE Nombre = "' + req.body[i+1].Nombre + '" AND Comentarios = "'+req.body[i+1].Comentarios +'"';
    console.log(sql);
    i++;
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
  }

  if (i = req.body.length) return res.status(200).send({message: 'Historias Actualizadas'})
  else return res.status(500).send({message: 'Error, no se han podido actualizar las Historias'})

  res.redirect("/");
  res.end();

});

app.get("/get/pending-Stories", function(req,res){
  console.log('Obteniendo historias pendienets...');
  var sql = 'select * from user_story where Status = "Pendiente de validacion"';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias Encontradas', result})
      console.log("Historias Encontradas");
    } else {
      return res.status(404).send({message: 'No se han encontrado historias completadas'})
      console.log("No se han encontrado historias completadas");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.get('/get/all-Sprints', function(req,res){
  console.log('Obteniendo historias que están en múltiples sprints...');
  var sql = "select id_sp, DATE_FORMAT(`Fecha inicio`,'%y-%m-%d') as 'Fecha inicio', DATE_FORMAT(`Fecha fin`,'%y-%m-%d') as 'Fecha fin', Nombre, Status, Review from sprint";

  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Sprints Encontrados', result})
      console.log("Sprints Encontradss");
    } else {
      return res.status(404).send({message: 'No se han encontrado Sprints'})
      console.log("No se han encontrado Sprints");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});

app.post("/post/delete-Sprints", function(req,res){
  console.log('Eliminando Sprint...');

  var quer = {
    'Fecha inicio': req.body['Fecha inicio'],
    'Fecha fin': req.body['Fecha fin'],
    Nombre: req.body.Nombre,
    Status: req.body.Status,
    Review: req.body.Review
  };

  var sql = 'DELETE from sprint WHERE Nombre = "' + req.body.Nombre + '" and Status= "' + req.body.Status +'";';
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log("Sprint eliminado");
      return res.status(200).send({message: 'Sprint eliminado'})
    }
    res.redirect("/");
    res.end();
  })
});


app.post("/post/add-Sprints", function(req,res){
  console.log('Añadiendo Sprints...');

  for (var i = 0; i < req.body.length; i++) {

    var quer = {
      'Fecha inicio': req.body[i]['Fecha inicio'],
      'Fecha fin': req.body[i]['Fecha fin'],
      Nombre: req.body[i].Nombre,
      Status: req.body[i].Status,
      Review: req.body[i].Review
    };

    var sql = 'insert into sprint set ' + mysql.escape(quer);
    console.log(sql);
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
  }

  if (i = req.body.length) return res.status(200).send({message: 'Sprints Añadidps'})
  else return res.status(500).send({message: 'Error, no se han podido añadir los Sprints'})

  res.redirect("/");
  res.end();

});


app.post("/post/update-Sprints", function(req,res){
  console.log('Actualizando Sprints...');
  console.log(req.body.length);
  for (var i = 0; i < req.body.length-1; i++) {

    var quer = {
      'Fecha inicio': req.body[i]['Fecha inicio'],
      'Fecha fin': req.body[i]['Fecha fin'],
      Nombre: req.body[i].Nombre,
      Status: req.body[i].Status,
      Review: req.body[i].Review
    };

    var sql = 'UPDATE sprint SET ' + mysql.escape(quer) + 'WHERE `Fecha inicio` = "' + req.body[i+1][`Fecha inicio` ] + '" AND `Fecha fin` = "'+req.body[i+1][`Fecha fin` ] +'"';
    console.log(sql);
    i++;
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
  }

  if (i = req.body.length) return res.status(200).send({message: 'Sprints Actualizados'})
  else return res.status(500).send({message: 'Error, no se han podido actualizar los Sprints'})

  res.redirect("/");
  res.end();

});

app.get('/get/develop', function(req,res){
  console.log('Obteniendo historias y sprints...');
  var sql = "SELECT sprint.Nombre as NombreSp, user_story.Nombre as NombreUs FROM develop INNER JOIN user_story INNER JOIN sprint WHERE user_story.id_us = develop.id_us AND sprint.id_sp = develop.id_sprint";
  console.log(sql);
  query(sql,function(result,err){
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    //if(err) console.log(err)
    if (result) {
      console.log(result);

      return res.status(200).send({message: 'Historias y Sprints encontrados', result})
      console.log("Sprints Encontradss");
    } else {
      return res.status(404).send({message: 'No se han encontrado Sprints ni Historias'})
      console.log("No se han encontrado Sprints");
    }

    res.json(result);
    res.redirect("/");
    res.end();
  })
});


app.post("/post/add-develop", function(req,res){
  console.log('Añadiendo Historias y Sprints...');

  for (var i = 0; i < req.body.length; i++) {

    var quer = {
      NombreSp: req.body[i].NombreSp,
      NombreUs: req.body[i].NombreUs
    };

    var sql = 'SELECT user_story.id_us, sprint.id_sp FROM user_story INNER JOIN sprint WHERE sprint.Nombre = "' + req.body[i].NombreSp + '" AND user_story.Nombre = "' + req.body[i].NombreUs + '"';
    console.log(sql);
    var sql2 = 'SELECT * FROM user_story WHERE user_story.Nombre = "' + req.body[i].NombreUs + '"';
    query(sql,function(result1,err){
      if(err)console.log(err)
      if(result1){
        query(sql2,function(result2,err){
          if(err)console.log(err)

          var quer2 = {
            id_sprint: result1[0].id_sp,
            id_us: result1[0].id_us
          }

          var quer3 = {
            Nombre: result2[0].Nombre,
            Prioridad: result2[0].Prioridad,
            Dificultad: result2[0].Dificultad,
            Comentarios: result2[0].Comentarios,
            "Horas acumuladas": result2[0]['Horas acumuladas'],
            Status: result2[0].Status,
            "As a": result2[0]['As a'],
            "I want": result2[0]['I want'],
            "So that": result2[0]['So that'],
            Sprint: result1[0].id_sp

          };
          var sql3 = 'insert into develop set' + mysql.escape(quer2);
          console.log(sql3);

          var sql4 = 'insert into stored_user_story set' + mysql.escape(quer3);

          query(sql3,function(result,err){
            if(err)console.log(err)
            if(result)console.log(result)
          });

          query(sql4,function(result,err){
            if(err)console.log(err)
            if(result)console.log(result)
          });


          var sql5 = 'SELECT id_es_us FROM stored_user_story WHERE Nombre = "' + result2[0].Nombre + '"';


          query(sql5,function(result,err){
            if(err)console.log(err)
            if(result){

              var quer4 = {
                id_story: result1[0].id_us,
                id_store: result[0].id_es_us
              }

              var sql5 = 'insert into store set' + mysql.escape(quer4);
              query(sql5,function(result,err){
                if(err)console.log(err)
                if(result)console.log(result)
              });
            }
          });
        });
      }
    });
  }
  if (i = req.body.length) return res.status(200).send({message: 'Sprints Añadidos'})
  else return res.status(500).send({message: 'Error, no se han podido añadir los Sprints'})

  res.redirect("/");
  res.end();

});


app.post("/post/delete-develop", function(req,res){
  console.log('Eliminando Historia asociado a Sprint...');

  var quer = {
    NombreSp: req.body.NombreSp,
    NombreUs: req.body.NombreUs
  };

  var sql = 'SELECT user_story.id_us, sprint.id_sp FROM user_story INNER JOIN sprint WHERE sprint.Nombre = "' + req.body.NombreSp + '" AND user_story.Nombre = "' + req.body.NombreUs + '"';
  console.log(sql);
  query(sql,function(result,err){
    if(err)console.log(err)
    if(result){

      var quer2 = {
        id_sprint: result[0].id_sp,
        id_us: result[0].id_us
      }
      var sql2 = 'DELETE from develop WHERE id_sprint = "' + result[0].id_sp + '" and id_us= "' + result[0].id_us +'";';
      console.log(sql2);
      query(sql2,function(result,err){
        if(err)console.log(err)
        if(result)console.log(result)
      });


    var sql3 = 'DELETE FROM stored_user_story WHERE Nombre = "' + req.body.NombreUs + '" and Sprint = "' + result[0].id_sp + '"';
    query(sql3,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
}
  });
});


app.post("/post/update-develop", function(req,res){
  console.log('Actualizando Historias asociadas a los sprints...');
  console.log(req.body);

  for (var i = 0; i < req.body.length-1; i++) {

    var quer = {
      NombreSp: req.body[i].NombreSp,
      NombreUs: req.body[i].NombreUs
    };

    var sql = 'SELECT user_story.id_us, sprint.id_sp FROM user_story INNER JOIN sprint WHERE sprint.Nombre = "' + req.body[i].NombreSp + '" AND user_story.Nombre = "' + req.body[i].NombreUs + '"';
    console.log(sql);

    var sql2 = 'SELECT user_story.id_us, sprint.id_sp FROM user_story INNER JOIN sprint WHERE sprint.Nombre = "' + req.body[i+1].NombreSp + '" AND user_story.Nombre = "' + req.body[i+1].NombreUs + '"';
    console.log(sql2);

    i++;

    query(sql,function(result1,err){
      if(err)console.log(err)

      if(result1){
        console.log(result1);
        var quer2 = {
          id_sprint: result1[0].id_sp,
          id_us: result1[0].id_us
        }
        query(sql2,function(result2,err){
          if(err)console.log(err)
          if(result2){
            console.log(result2);


            var sql3 = 'UPDATE develop SET ' + mysql.escape(quer2) + ' WHERE id_sprint = "' + result2[0].id_sp + '" AND id_us = "'+ result2[0].id_us +'"';
            console.log(sql3);
            query(sql3,function(result3,err){
              if(err)console.log(err)
              if(result3)console.log(result3)
            });
          }

        });

        var sql4 = 'SELECT * FROM user_story WHERE id_us = "'+ result1[0].id_us +'" ';
        console.log(sql4);
        query(sql4,function(result4,err){
          if(err)console.log(err)
          if(result4){

            var quer3 = {
              Nombre: result4[0].Nombre,
              Prioridad: result4[0].Prioridad,
              Dificultad: result4[0].Dificultad,
              Comentarios: result4[0].Comentarios,
              "Horas acumuladas": result4[0]['Horas acumuladas'],
              Status: result4[0].Status,
              "As a": result4[0]['As a'],
              "I want": result4[0]['I want'],
              "So that": result4[0]['So that'],
              Sprint: result1[0].id_sp
            };

            var sql5 = 'insert into stored_user_story set' + mysql.escape(quer3);
            console.log(sql5);
            query(sql5,function(result5,err){
              if(err)console.log(err)
              if(result5)console.log(result5)
            });

          }
        });
      }

    });
  }
  if (i = req.body.length) return res.status(200).send({message: 'Sprints Añadidos'})
  else return res.status(500).send({message: 'Error, no se han podido añadir los Sprints'})

  res.redirect("/");
  res.end();

});


app.post("/post/update-user", function(req,res){
  console.log('Actualizando datos del usuario...');
  console.log(req.body.length);

  for (var i = 0; i < req.body.length-1; i++) {
    var quer = {
      Nombre: req.body[i].Nombre,
      Nick: req.body[i].Nick,
      password: req.body[i].password,
      "e-mail": req.body[i]['e-mail']
    };

    var sql = 'UPDATE team_member SET ' + mysql.escape(quer) + 'WHERE Nombre = "' + req.body[i+1].Nombre + '" AND Nick = "'+req.body[i+1].Nick +'"';
    console.log(sql);
    i++;
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });
  }

  if (i = req.body.length) return res.status(200).send({message: 'Usuario Actualizado'})
  else return res.status(500).send({message: 'Error, no se ha podido actualizar el usuario'})

  res.redirect("/");
  res.end();

});

app.post("/post/choose-stories", function(req,res){
  console.log('Eligiendo historias de usuario...');
  console.log(req.body);

  var sql0 = 'select id_tm from team_member  where nick = "' + req.body[0] + '";' //Aqui habra que recoger el nombre de una cookie
  console.log(sql0);
  query(sql0,function(result,err){
    if(err)console.log(err)
    if(result){
      var id = result[0].id_tm;

      for (var i = 1; i < req.body.length; i++) {
        var quer = {
          id_tm: id                 //esto irá con COOKIES!!
        };

        var sql = 'UPDATE develop SET ' + mysql.escape(quer) + ' WHERE `id_us` = "' + req.body[i].id_us + '"';
        console.log(sql);
        query(sql,function(result,err){
          if(err)console.log(err)
          if(result)console.log(result)
        });

        var quer2 = {
          Developer:id,           //esto irá con COOKIES!!
        }

        var sql2 = 'UPDATE stored_user_story SET ' + mysql.escape(quer2) + ' WHERE `Nombre` = "' + req.body[i].Nombre + '"';
        console.log(sql2);
        query(sql2,function(result,err){
          if(err)console.log(err)
          if(result)console.log(result)
        });

      }

      if (i = req.body.length) return res.status(200).send({message: 'Historias escogidas con exito'})
      else return res.status(500).send({message: 'Error, no se han podido escoger las historias'})

      res.redirect("/");
      res.end();
      
    }
  });



});




app.post("/post/my-stories", function(req,res){
  console.log('Actualizando historias de usuario...');
  console.log(req.body.length);
  console.log(req.body);

  for (var i = 0; i < req.body.length; i++) {

    var quer = {
      Status: req.body[i].Status,
    };

    var sql = 'UPDATE user_story SET ' + mysql.escape(quer) + ' WHERE `Nombre` = "' + req.body[i].Nombre + '"';
    console.log(sql);
    query(sql,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });



    var sql2 = 'UPDATE stored_user_story SET ' + mysql.escape(quer) + ' WHERE `Nombre` = "' + req.body[i].Nombre + '"';
    console.log(sql2);
    query(sql2,function(result,err){
      if(err)console.log(err)
      if(result)console.log(result)
    });

  }

  if (i = req.body.length) return res.status(200).send({message: 'Historias escogidas con exito'})
  else return res.status(500).send({message: 'Error, no se han podido escoger las historias'})

  res.redirect("/");
  res.end();

});














connection.connect((err, res) => {
  if (err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(port, function() {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})
