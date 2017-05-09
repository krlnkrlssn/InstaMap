

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
    window.open("main.html");
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
    window.open("index.html");
  }, function(error) {
    console.log(error.code);
    console.log(error.message);
    alert(error.message);
  });
}


function getUserProfile() {
  console.log("userP")

  var storage = firebase.storage().ref(); 

  var roots = firebase.database().ref("users");
  var user = firebase.auth().currentUser;    
  var uid = user.uid; 
  var userRef = roots.child(uid+"/profile/");

  var pic; var info; var link;

  userRef.once("value", function(snapshot) {
    pic = snapshot.child("profilePic").val()
    info = snapshot.child("profileInfo").val()


    /*console.log("snapshot: " + pic + " info: " + info)

    var storageRef = storage.ref("profilePic");
    var tangRef = storageRef.child(pic + "png");
*/


    var spaceRef = storage.child('profilePic/' + pic);
    var path = spaceRef.fullPath;

    console.log("space: " + spaceRef + "  path: " + path)

    var gsReference = storage.refFromURL('gs://test.appspot.com')

    storage.child('images/photo_1.png').getDownloadURL().then(function(url) {
      var test = url;
    }).catch(function(error) {

    });


  });


  console.log("after once")

}

var hello_world = function() {
  console.log("hello!");
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

function picture() {
  console.log("picture funcion")
  console.log(locate)
    var camera = document.getElementById('camera');
    var frame = document.getElementById('frame');
    var storage = firebase.storage(); 

    camera.addEventListener('change', function(e) {
        console.log('selected a blob');
        var file = e.target.files[0]; 
        //frame.src = URL.createObjectURL(file); var file = frame.src; // use the Blob or File API
        var ref = firebase.database().ref("users");
        var user = firebase.auth().currentUser;    
        var uid = user.uid; 
        var userRef = ref.child(uid+"/pictures");

        var countChild = 0;

        var oldestTime = 99999999999999;
        var oldestKey = "";

        userRef.once("value", function(snapshot) {
          // The callback function will get called twice, once for "fred" and once for "barney"
         snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            if (oldestTime > childData.time) {
                oldestTime = childData.time;
                oldestKey = key;
            }

            //console.log("key is:  " + key)
            //var timestamp = userRef.child(key + "/time");         
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

//      console.log("pictureKey: " + pictureKey)

        var ref = storage.ref();
        var imagesRef = ref.child("images/" + pictureKey);
        imagesRef.put(file).then(function(snapshot) {
            console.log('Uploaded a blob');
        });
          
        });

    });
}






