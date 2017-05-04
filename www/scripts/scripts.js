
   var showDialog = function(id) {
      document.getElementById(id).show();
      }

    var hideDialog = function(id) {
      document.getElementById(id).hide();
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


		function login(username,password) {
			hideDialog('login-dialog');
			showPage('main.html');
		}

		function create_account(realname,username,password) {
			showPage('main.html');
		}
