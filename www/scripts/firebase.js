(function() {

  var app = angular.module('myApp', ['onsen']);

  loginUser = function(email, password) {   
    console.log("inside loginUser");
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      //console.log("logged in then func");
    }).catch(function(error) {
       console.log(error.code);
       console.log(error.message);
       alert(error.message);
    });
    return;
  }

  logoutUser = function() {
      firebase.auth().signOut().then(function() {
        // console.log("Logged out!")
      }, function(error) {
       console.log(error.code);
       console.log(error.message);
       alert(error.message);
    });
  }




  app.controller('LoginController', function($scope){
    $scope.login = function(email, password) {
      loginUser(email, password);
    };
  });

});