

    function openDialog(id) {
      document
        .getElementById(id)
        .show();
    };

    function hideDialog(id) {
      document
        .getElementById(id)
        .hide();
    };

    function showPage(page) {
      var content = document.getElementById('content');
      content.load(page)
    }

    function openMenu() {
      var menu = document.getElementById('menu');
      menu.open();
    };

    function loadPage(page) {
      var content = document.getElementById('content');
      var menu = document.getElementById('menu');
      content.load(page)
        .then(menu.close.bind(menu));
    };

    var map;

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 59.348, lng: 18.071},
        zoom: 16,
        mapTypeId: 'satellite',
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
      });
    }

		function login(username,password) {
			hideDialog('login-dialog');
			showPage('main.html');
		}

		function create_account(realname,username,password) {
			showPage('main.html');
		}