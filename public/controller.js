'use strict';

angular.module('scrumApp', [])

    .controller('scrum-ctrl', function ($scope, $http) {

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




});
