
var showDialog = function(id) {
  console.log(document.getElementById(id))
  //.show();
  var content = document.getElementById('content');
  content.load(id);
}

var hideDialog = function(id) {
  document.getElementById(id) //.hide();
}

function showPage(page) {
  console.log("showpage " + page)
  var content = document.getElementById('content');
  content.load(page);
}

function openMenu() {
  var menu = document.getElementById('menu');
  menu.open();
}

function loadPage(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page).then(menu.close.bind(menu));
}

function createAccount(email, password) {
  var returnMessage = "";
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function(result) {
    console.log("created new user!")  //once logged in do something here
    setNewData();
  }).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
    alert(error.message);
  });
//returnMessage = "You've created a new user! Please log in to play";
//return returnMessage

//showPage('main.html');
}

function setNewData() {
  console.log("inside setNewData")

  var ref = firebase.database().ref("users");
  var user = firebase.auth().currentUser;    
  var uid = user.uid; 
  var userRef = ref.child(uid);

  userRef.set({
    username: ""
  });
  /*
  var pictureRef = userRef.push({
  time: Date.now(),
  position: 0
  });

  var pictureKey = pictureRef.key;
  console.log("pictureKey: " + pictureKey)
  */

}

function login(username, password) {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(result) {
    console.log("logged in")
    //once logged in do something here
    //console.log("logged in then func");
  }).catch(function(error) {
     console.log(error.code);
     console.log(error.message);
     alert(error.message);
  });
  return;
  
  //hideDialog('login-dialog');
  //showPage('main.html');
}


function logout() {
  firebase.auth().signOut().then(function() {
    console.log("Logged out!")
  }, function(error) {
    console.log(error.code);
    console.log(error.message);
    alert(error.message);
  });
}


function getUserProfile() {
  console.log("getUserProfile");
  var message = "no";
  return message
}



var hello_world = function() {
  console.log("hello!");
}












