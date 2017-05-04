
   var showDialog = function(id) {
    console.log(document.getElementById(id))
     //.show();
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

		function create_account(email,password) {
      console.log("create_account in scripts: " + email.value + " " + password.value)

      var returnMessage = "";
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function(result) {
        //once logged in do something here
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
      returnMessage = "You've created a new user! Please log in to play";
      return returnMessage
    
			//showPage('main.html');
		}

    function login(username,password) {
      console.log("inne i login")

      firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(result) {
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
      console.log("inne i logout")

      firebase.auth().signOut().then(function() {
        // console.log("Logged out!")
      }, function(error) {
       console.log(error.code);
       console.log(error.message);
       alert(error.message);
    });
    }
