

    function openDialog(id) {
      document.getElementById(id);
<<<<<<< Updated upstream
        //.show();
=======
      //.show();
>>>>>>> Stashed changes
    };

    function hideDialog(id) {
      document.getElementById(id);
<<<<<<< Updated upstream
        //.hide();
=======
      //.hide();
>>>>>>> Stashed changes
    };

    function showPage(page) {
      console.log("showpage " + page)

      var content = document.getElementById('content');
<<<<<<< Updated upstream
      console.log(content)
      //content.load(page)
=======
      content.load(page);
>>>>>>> Stashed changes
    }

    function openMenu() {
      var menu = document.getElementById('menu');
      menu.open();
    };

    function loadPage(page) {
      var content = document.getElementById('content');
      var menu = document.getElementById('menu');
      content.load(page).then(menu.close.bind(menu));
    };


		/*function login(username,password) {
			hideDialog('login-dialog');
			showPage('main.html');
		}*/

		function create_account(realname,username,password) {
			showPage('main.html');
		}
