function checkStatus() {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("inlog")
      return true;
    } else {
      console.log("utlog")
      return false;
    }
  }

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
    window.open("main.html", "_self");
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
    window.open("index.html", "_self");
  }, function(error) {
    console.log(error.code);
    console.log(error.message);
    alert(error.message);
  });
}


function profileInfo() {
  var storageRef = firebase.storage().ref();

  var roots = firebase.database().ref("users");
  var user = firebase.auth().currentUser;    
  var uid = user.uid; 
  var profileRef = roots.child(uid+"/profile/");

  var userRef = roots.child(uid);

  userRef.on("value", function(snapshot) {
    var username = snapshot.child("username").val();
    document.querySelector("#username").innerHTML = username;    // username 
     

  }, function (error) {
     console.log("Error: " + error.code);
  });

  var pic; var info;

  profileRef.once("value", function(snapshot) {
    pic = snapshot.child("profilePic").val()
    info = snapshot.child("profileInfo").val()

    console.log("info is: " + info)
    document.querySelector("#description").innerHTML = info;    // profile description! 


    var spaceRef = storageRef.child('profilePic/' + pic);
    var path = spaceRef.fullPath;

    //console.log("Path: " + path)
    var spaceRef = storageRef.child(path);
    storageRef.child(path+".png").getDownloadURL().then(function(url) {
        var test = url;
        console.log(url);
        document.querySelector('.profile_picture').src = test;        // profile picture


    }).catch(function(error) {
      console.log("erroew")
      console.log(error.code);
      console.log(error.message);
    });


  });
}




var geolocate;
var locate;

function getLocation() {
    if (navigator.geolocation) {
        var geolocate = navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        var geolocate = "Geolocation is not supported by this browser.";
    }
    return geolocate;
}


function showPosition(position) {
    locate = [position.coords.latitude,position.coords.longitude]; 
}


function picture() {        // stores pictures in database
  console.log("picture funcion")
  console.log(locate)
    var camera = document.getElementById('camera');
    var frame = document.getElementById('frame');
    var storage = firebase.storage(); 

    camera.addEventListener('change', function(e) {
        console.log('selected a blob');
        var file = e.target.files[0]; 
        var ref = firebase.database().ref("users");
        var user = firebase.auth().currentUser;    
        var uid = user.uid; 
        var userRef = ref.child(uid+"/pictures");

        var countChild = 0;

        var oldestTime = 99999999999999;
        var oldestKey = "";

        userRef.once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            if (oldestTime > childData.time) {
                oldestTime = childData.time;
                oldestKey = key;
            }
            countChild = countChild + 1;     
          });

          if (countChild >= 9) {
            var deleteRef = firebase.storage().ref("/images"); 
            var desertRef = deleteRef.child(oldestKey);
            desertRef.delete().then(function() {
                console.log("File deleted successfully")
            }).catch(function(error) {
              // Uh-oh, an error occurred!
            });

            var removePic = userRef.child("/" + oldestKey)
            removePic.remove();
          }
          
          var pictureRef = userRef.push({
            time: Date.now(),
            position: locate
          });

          var pictureKey = pictureRef.key;

          var ref = storage.ref();
          var imagesRef = ref.child("images/" + pictureKey);
          imagesRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob');
          });
          
        });

    });
}


function getUserPic() {                           // Get all user pictures.
  var storageRef = firebase.storage().ref();

  var roots = firebase.database().ref("users");
  var user = firebase.auth().currentUser;    
  var uid = user.uid; 
  var profileRef = roots.child(uid+"/pictures/");

  var pic; var iteration = 1;

  profileRef.once("value", function(snapshot) {

    snapshot.forEach(function(childSnapshot) {
      pic = childSnapshot.key;

      console.log("key is: " + pic)
    
      var spaceRef = storageRef.child('images/' + pic);
      var path = spaceRef.fullPath;

      var spaceRef = storageRef.child(path);

      var toHTML = ".p" + iteration;

      storageRef.child(path).getDownloadURL().then(function(url) {
          var test = url;
          //console.log("url is: " + url);

          //console.log("toHTML is : " + toHTML)
          document.querySelector(toHTML).src = test;        // picture to html

      }).catch(function(error) {
        console.log("erroew")
        console.log(error.code);
        console.log(error.message);
      });

      iteration = iteration + 1; 

      

      
    });


    /*
    pic = snapshot.child("profilePic").val()

    var spaceRef = storageRef.child('profilePic/' + pic);
    var path = spaceRef.fullPath;

    //console.log("Path: " + path)
    var spaceRef = storageRef.child(path);
    storageRef.child(path+".png").getDownloadURL().then(function(url) {
        var test = url;
        console.log("url is: " + url);
        //document.querySelector('.profile_picture').src = test;        // profile picture


    }).catch(function(error) {
      console.log("erroew")
      console.log(error.code);
      console.log(error.message);
    });*/


  });
}












