'use strict';

angular.module('scrumApp', [])

    .controller('scrum-ctrl', function ($scope, $http) {

      //array consultas
      $scope.query = [];

      //Variables para ir cambiando de entre menus
      $scope.perfil = 1;
      $scope.comunes = 0;
      $scope.scrum_us = 0;
      $scope.scrum_sp = 0;
      $scope.scrum_us_sp = 0;
      $scope.dev_choose_us = 0;
      $scope.dev_my_us = 0;

      //Funciones

      $scope.userData = function(){
        $scope.activo = 0;
        $scope.comunes = 0;
        $scope.scrum_us_sp = 0;
        $scope.scrum_sp = 0;
        $scope.scrum_us = 0;
        $scope.dev_choose_us = 0;
        $scope.dev_my_us = 0;
        $scope.perfil = 1;


        console.log('Obteniendo Datos del Usuario...');
        $http({
      method: 'POST',
      url: '/get/user-data',
      data: {
            nombre: 'Alex',  //aqui se pasa el nombre por una cookie
        }


      }).then(function successCallback(response) {

            $scope.query = response.data.result;
            $scope.profile = angular.copy( $scope.query);

            console.log("Datos de usuario Obtenidos del Servidor");
            console.log(response.data.result);


        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
            console.log("No has podido logearte");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      };


      //TABLAS EDITABLES PERFIL

       $scope.enabledEditUser =[];
       $scope.updUser = [];


      $scope.editUser = function(index){
        var original = $scope.query[index];
        var updated = $scope.profile[index];
        $scope.updUser.push(updated);
        $scope.updUser.push(original);


        console.log($scope.updUser);

        console.log("edit index"+index);
        $scope.enabledEditUser[index] = !$scope.enabledEditUser[index];
      }

      $scope.submitUser = function(){


      if ($scope.updUser.length !=0){
      $http({
      method: 'POST',
      url: '/post/update-user',
      data: $scope.updUser

      }).then(function successCallback(response) {

        console.log("Sprints actualizados con exito");


      // this callback will be called asynchronously
      // when the response is available
      }, function errorCallback(response) {
        console.log("No has podido actualizar los sprints");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      });
      $scope.updUser = [];

      alert('Base de datos actualizada!');
      location.reload();
      }



      }

      //FIN TABLAS EDITABLES PERFIL





    $scope.registro = function () {
    $http({
  method: 'POST',
  url: '/post/register',
  data: {
        name: $scope.name,
        rol: $scope.rol,
        nick: $scope.nick,
        password: $scope.password,
        email: $scope.email
    }

}).then(function successCallback(response) {
        console.log("Estas registrado");
        console.log(response);
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("Estas registrado");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

};

    $scope.login = function () {
    $http({
  method: 'POST',
  url: '/get/login',
  data: {
        nick_login: $scope.nick_login,
        password_login: $scope.password_login

    }

}).then(function successCallback(response) {

        console.log("Estas logeado");
        console.log(response);

    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("No has podido logearte");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

};

$scope.getStories = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 1;
  $scope.comunes = 1;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;


  $scope.titulo = " HISTORIAS COMPLETADAS";


  console.log('Obteniendo Historias de Usuario...');
  $http({
method: 'GET',
url: '/get/completed-Stories'

}).then(function successCallback(response) {

      $scope.query = response.data.result;
      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
}, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
});

};

$scope.getSprint = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 2;
  $scope.comunes = 1;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;


  $scope.titulo = "HISTORIAS DEL SPRINT ACTIVO";

  console.log('Obteniendo Historias de Usuario...');
  $http({
method: 'GET',
url: '/get/sprint-Stories'

}).then(function successCallback(response) {

      $scope.query = response.data.result;
      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
}, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
});

};


$scope.getMultipleSprint = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 3;
  $scope.comunes = 1;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;


  $scope.titulo = "HISTORIAS ASIGNADAS A  MÁS DE UN SPRINT";

  console.log('Obteniendo Historias de Usuario...');
  $http({
method: 'GET',
url: '/get/sprint-multiple-Stories'

}).then(function successCallback(response) {

      $scope.query = response.data.result;
      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
}, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
});

};
$scope.getAssignedStories = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 4;
  $scope.comunes = 1;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;


  $scope.titulo = "HISTORIAS ASIGNADAS A UN DESARROLLADOR";

  console.log('Obteniendo Historias de Usuario...');
  $http({
method: 'POST',
url: '/get/assigned-Stories',
data: {
      nombre: $scope.nombre,
  }

}).then(function successCallback(response) {

      $scope.query = response.data.result;
      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
}, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
});

};

$scope.activeAssignedStories = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 4;
  $scope.comunes = 0;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;



};

$scope.activeScrumOptions = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 5;
  $scope.comunes = 0;

  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;

};

$scope.editPerfil = function(){
  //$window.location.href = '/historias-terminadas.html';
  $scope.activo = 0;
  $scope.comunes = 0;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.scrum_us = 0;
  $scope.perfil = 1;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;

};



$scope.editStories = function(){
  //$window.location.href = '/historias-terminadas.html';

  $scope.scrum_us = 1;
  $scope.comunes = 0;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 0;
  $scope.dev_my_us = 0;



  $scope.titulo = "HISTORIAS DE USUARIOS";


  console.log('Obteniendo Historias de Usuario...');
  $http({
  method: 'GET',
  url: '/get/all-Stories'

  }).then(function successCallback(response) {

      $scope.query = response.data.result;
      $scope.Stories = angular.copy( $scope.query);

      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
  }, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
  });

  };


  //TABLAS EDITABLES HISTORIAS



	 $scope.enabledEdit =[];
   $scope.nuevos = [];
   $scope.eliminados = [];
   $scope.actualizados = [];



    $scope.addStory = function(){

	    var us ={ Nombre:"",Prioridad:"",Dificultad:"",
	                   Comentarios:"",'Horas acumuladas':"",Status:"",'As a':"",'I want':"",'So that':"",disableEdit:false};
		$scope.Stories.push(us);
    $scope.nuevos.push(us);

		 $scope.enabledEdit[$scope.Stories.length-1]=true;
	}
	$scope.editStory = function(index){
    var original = $scope.query[index];
    var updated = $scope.Stories[index];
    $scope.actualizados.push(updated);
    $scope.actualizados.push(original);


    console.log($scope.actualizados);

		console.log("edit index"+index);
		$scope.enabledEdit[index] = !$scope.enabledEdit[index];
	}
	$scope.deleteStory = function(index) {
    $scope.eliminados = $scope.Stories[index];
    console.log($scope.eliminados);
		  $scope.Stories.splice(index,1);

      $http({
    method: 'POST',
    url: '/post/delete-Stories',
    data: $scope.eliminados

    }).then(function successCallback(response) {

          console.log("Historia eliminada con exito");


      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
          console.log("No has podido eliminar la historia");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


	}

	$scope.submitStory = function(){

		console.log($scope.nuevos);

    if ($scope.nuevos.length !=0){
    $http({
  method: 'POST',
  url: '/post/add-Stories',
  data: $scope.nuevos

  }).then(function successCallback(response) {

        console.log("Historias insertadas con exito");


    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("No has podido logearte");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  $scope.nuevos = [];

}

console.log($scope.actualizados);

if ($scope.actualizados.length !=0){
$http({
method: 'POST',
url: '/post/update-Stories',
data: $scope.actualizados

}).then(function successCallback(response) {

    console.log("Historias actualizadas con exito");


// this callback will be called asynchronously
// when the response is available
}, function errorCallback(response) {
    console.log("No has podido logearte");
// called asynchronously if an error occurs
// or server returns response with an error status.
});
$scope.actualizados = [];

alert('Base de datos actualizada!');
location.reload();
}



	}


  //FIN TABLAS EDITABLES HISTORIAS


  $scope.getPendingStories = function(){
    //$window.location.href = '/historias-terminadas.html';
    $scope.scrum_us = 0;
    $scope.comunes = 1;
    $scope.scrum_us_sp = 0;
    $scope.scrum_sp = 0;
    $scope.perfil = 0;
    $scope.dev_choose_us = 0;
    $scope.dev_my_us = 0;


    $scope.titulo = "HISTORIAS PENDIENTES";


    console.log('Obteniendo Historias de Usuario Pendientes...');
    $http({
  method: 'GET',
  url: '/get/pending-Stories'

  }).then(function successCallback(response) {

        $scope.query = response.data.result;
        console.log("Historias pendientes obtenidas con exito.");
        console.log(response.data.result);


    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("No se han encontrado historias pendientes.");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  };

  $scope.editSprints = function(){

    $scope.scrum_us = 0;
    $scope.comunes = 0;
    $scope.scrum_us_sp = 0;
    $scope.scrum_sp = 1;
    $scope.perfil = 0;
    $scope.dev_choose_us = 0;
    $scope.dev_my_us = 0;

    $scope.titulo = " SPRINTS";


    console.log('Obteniendo Sprints...');
    $http({
    method: 'GET',
    url: '/get/all-Sprints'

    }).then(function successCallback(response) {


        $scope.query = response.data.result;
        $scope.scrum_sps = angular.copy( $scope.query);

        console.log("Sprints obtenidos con exito.");
        console.log(response.data.result);


    // this callback will be called asynchronously
    // when the response is available
    }, function errorCallback(response) {
        console.log("No has podido obtener los sprints");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

    };

  //TABLAS EDITABLES SPRINT



   $scope.enabledEditSprint =[];
   $scope.newSprint = [];
   $scope.delSprint = [];
   $scope.updSprint = [];


    $scope.addSprint = function(){

      var sp ={ id_sp:"",'Fecha inicio':"",'Fecha fin':"",
                     Nombre:"",'Horas acumuladas':"",Status:"", Review:"-1", disableEdit:false};
    $scope.scrum_sps.push(sp);
    $scope.newSprint.push(sp);

     $scope.enabledEditSprint[$scope.scrum_sps.length-1]=true;
  }
  $scope.editSprint = function(index){
    var original = $scope.query[index];
    var updated = $scope.scrum_sps[index];
    $scope.updSprint.push(updated);
    $scope.updSprint.push(original);


    console.log($scope.updSprint);

    console.log("edit index"+index);
    $scope.enabledEditSprint[index] = !$scope.enabledEditSprint[index];
  }
  $scope.deleteSprint = function(index) {
    $scope.delSprint = $scope.scrum_sps[index];
    console.log($scope.delSprint);
      $scope.scrum_sps.splice(index,1);

      $http({
    method: 'POST',
    url: '/post/delete-Sprints',
    data: $scope.delSprint

    }).then(function successCallback(response) {

          console.log("Sprint eliminado con exito");


      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
          console.log("No has podido eliminar el sprint");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


  }

  $scope.submitSprint = function(){

    console.log($scope.newSprint);

    if ($scope.newSprint.length !=0){
    $http({
  method: 'POST',
  url: '/post/add-Sprints',
  data: $scope.newSprint

  }).then(function successCallback(response) {

        console.log("Sprints insertados con exito");


    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("No se han podido insertar los sprints");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  $scope.newSprint = [];

  }

  console.log($scope.updSprint);

  if ($scope.updSprint.length !=0){
  $http({
  method: 'POST',
  url: '/post/update-Sprints',
  data: $scope.updSprint

  }).then(function successCallback(response) {

    console.log("Sprints actualizados con exito");


  // this callback will be called asynchronously
  // when the response is available
  }, function errorCallback(response) {
    console.log("No has podido actualizar los sprints");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
  });
  $scope.updSprint = [];

  alert('Base de datos actualizada!');
  location.reload();
  }



  }

  //FIN TABLAS EDITABLES SPRINT


    $scope.scrum_spStories = function(){




      $scope.titulo = "AÑADIR HISTORIAS AL SPRINT";

      $scope.editSprints(); //todos los sprints
      $scope.editStories(); //todas las historias
      $scope.titulo = "AÑADIR HISTORIAS AL SPRINT";

      $scope.scrum_us_sp = 1;
      $scope.scrum_us = 0;
      $scope.comunes = 0;
      $scope.scrum_sp = 0;
      $scope.perfil = 0;
      $scope.dev_choose_us = 0;
      $scope.dev_my_us = 0;


      console.log('Obteniendo Sprints...');
      $http({
      method: 'GET',
      url: '/get/develop'

      }).then(function successCallback(response) {


          $scope.query = response.data.result;
          $scope.comuneselop = angular.copy( $scope.query);

          console.log("Sprints obtenidos con exito.");
          console.log(response.data.result);


      // this callback will be called asynchronously
      // when the response is available
      }, function errorCallback(response) {
          console.log("No has podido obtener los sprints");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      });



      };

      //TABLAS EDITABLES AÑADIR HISTORIAS AL SPRINT

       $scope.enabledEditDevelop =[];
       $scope.newDevelop = [];
       $scope.delDevelop = [];
       $scope.updDevelop = [];


        $scope.addDevelop = function(){

          var us_sp ={ NombreSp:"", NombreUs:"",disableEdit:false};
        $scope.comuneselop.push(us_sp);
        $scope.newDevelop.push(us_sp);

         $scope.enabledEditDevelop[$scope.comuneselop.length-1]=true;
      }
      $scope.editDevelop = function(index){
        var original = $scope.query[index];
        var updated = $scope.comuneselop[index];
        $scope.updDevelop.push(updated);
        $scope.updDevelop.push(original);


        console.log($scope.updDevelop);

        console.log("edit index"+index);
        $scope.enabledEditDevelop[index] = !$scope.enabledEditDevelop[index];
      }
      $scope.deleteDevelop = function(index) {
        $scope.delDevelop = $scope.comuneselop[index];
        console.log($scope.delDevelop);
          $scope.comuneselop.splice(index,1);

          $http({
        method: 'POST',
        url: '/post/delete-develop',
        data: $scope.delDevelop

        }).then(function successCallback(response) {

              console.log("Sprint eliminado con exito");


          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
              console.log("No has podido eliminar el sprint");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });


      }

      $scope.submitDevelop = function(){

        console.log($scope.newDevelop);

        if ($scope.newDevelop.length !=0){
        $http({
      method: 'POST',
      url: '/post/add-develop',
      data: $scope.newDevelop

      }).then(function successCallback(response) {

            console.log("Sprints insertados con exito");


        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
            console.log("No se han podido insertar los sprints");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.newDevelop = [];

      }

      console.log($scope.updDevelop);

      if ($scope.updDevelop.length !=0){
      $http({
      method: 'POST',
      url: '/post/update-develop',
      data: $scope.updDevelop

      }).then(function successCallback(response) {

        console.log("Sprints actualizados con exito");


      // this callback will be called asynchronously
      // when the response is available
      }, function errorCallback(response) {
        console.log("No has podido actualizar los sprints");
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      });
      $scope.updDevelop = [];

      alert('Base de datos actualizada!');
      location.reload();
      }



      }

      //FIN TABLAS EDITABLES AÑADIR HISTORIAS AL SPRINT





//PARTE DE MAIN-Developer
$scope.chooseStories = function(){
  //$window.location.href = '/historias-terminadas.html';

  $scope.scrum_us = 0;
  $scope.comunes = 0;
  $scope.scrum_us_sp = 0;
  $scope.scrum_sp = 0;
  $scope.perfil = 0;
  $scope.dev_choose_us = 1;
  $scope.dev_my_us = 0;


  $scope.historiasElegidas = [];


  $scope.titulo = "ELEGIR HISTORIA DE USUARIO";


  console.log('Obteniendo Historias de Usuario...');
  $http({
  method: 'GET',
  url: '/get/all-Stories'

  }).then(function successCallback(response) {

      $scope.query = response.data.result;
      $scope.Stories = angular.copy( $scope.query);

      console.log("Estas logeado");
      console.log(response.data.result);


  // this callback will be called asynchronously
  // when the response is available
  }, function errorCallback(response) {
      console.log("No has podido logearte");
  // called asynchronously if an error occurs
  // or server returns response with an error status.
  });

  };



  //FIN PARTE MAIN-Developer

  $scope.chooseStory = function(index){
    var user_story = $scope.Stories[index];

    console.log("edit index"+index);

    $scope.historiasElegidas.push(user_story);

    console.log(user_story);
    console.log($scope.historiasElegidas);


    $scope.enabledEdit[index] = !$scope.enabledEdit[index];
  };

  $scope.submitChooseStory = function(){
    console.log('ENTRO A LA FUNCION!');

    $http({
    method: 'POST',
    url: '/post/choose-stories',
    data: $scope.historiasElegidas,

    }).then(function successCallback(response) {

      console.log("Historias elegidas con exito");


    // this callback will be called asynchronously
    // when the response is available
    }, function errorCallback(response) {
      console.log("No has podido elegir las historias de usuario");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

    alert('Historias escogidas con exito!');
    location.reload();
  };


  $scope.myStories = function(){
    //$window.location.href = '/historias-terminadas.html';
    $scope.activo = 4;
    
    $scope.dev_my_us = 1;
    $scope.comunes = 0;
    $scope.scrum_us_sp = 0;
    $scope.scrum_sp = 0;
    $scope.scrum_us = 0;
    $scope.perfil = 0;
    $scope.dev_choose_us = 0;

    $scope.historiasElegidas = [];


    $scope.titulo = "MIS HISTORIAS";

    console.log('Obteniendo Historias de Usuario...');
    $http({
  method: 'POST',
  url: '/get/assigned-Stories',
  data: {
        nombre: 'Alex',  //aqui se pasa el nombre por una cookie
    }

  }).then(function successCallback(response) {

        $scope.query = response.data.result;
        $scope.Stories = angular.copy( $scope.query);

        console.log("Estas logeado");
        console.log(response.data.result);


    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
        console.log("No has podido logearte");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  };


  $scope.submitMyStories = function(){
    console.log('ENTRO A LA FUNCION!');

    $http({
    method: 'POST',
    url: '/post/my-stories',
    data: $scope.historiasElegidas,

    }).then(function successCallback(response) {

      console.log("Historias actualizadas con exito");


    // this callback will be called asynchronously
    // when the response is available
    }, function errorCallback(response) {
      console.log("No has podido actualizar las historias de usuario");
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

    alert('Historias actualizadas con exito!');
    location.reload();
  };







});
