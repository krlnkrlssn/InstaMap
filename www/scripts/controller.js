// controller.js

(function() {
    var app = angular.module('myApp', ['onsen']);

    this.createUser = function(email, password) {
      var returnMessage = "";
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
        //once logged in do something here
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
      returnMessage = "You've created a new user! Please log in to play";
      return returnMessage
    }

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
      console.log("logincontroller här");
      $scope.login = function(email, password) {
        console.log("scope " +email +" " + password)
        loginUser(email, password);
      };
    });

    app.controller('CreateNewUser', function($scope){
      console.log("create new user här");
      $scope.create_account = function(email, password) {
        console.log("create account: " +email +" " + password)
        
      };
    });




    app.controller('SlidingMenuController', function($scope){

        $scope.checkSlidingMenuStatus = function(){

            $scope.slidingMenu.on('postclose', function(){
                $scope.slidingMenu.setSwipeable(false);
            });
            $scope.slidingMenu.on('postopen', function(){
                $scope.slidingMenu.setSwipeable(true);
            });
        };

        $scope.checkSlidingMenuStatus();
    });

    //Map controller
    app.controller('MapController', function($scope, $timeout){

        $scope.map;
        $scope.markers = [];
        $scope.markerId = 1;

        //Map initialization
        $timeout(function(){

        var mapStyle =     [
              {
                "stylers": [
                  {
                    "color": "#ffffff"
                  }
                ]
              },
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#393939"
                  }
                ]
              },
              {
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#9e9e9e"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#bdbdbd"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#454545"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1b1b1b"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#bebebe"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#404040"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8a8a8a"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#454545"
                  }
                ]
              },
              {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#4e4e4e"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#666666"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#616161"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#757575"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3d3d3d"
                  }
                ]
              }
            ];

            var latlng = new google.maps.LatLng(35.7042995, 139.7597564);
            var myOptions = {
                zoom: 8,
                center: latlng,
                styles: mapStyle,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            $scope.overlay = new google.maps.OverlayView();
            $scope.overlay.draw = function() {}; // empty function required
            $scope.overlay.setMap($scope.map);
            $scope.element = document.getElementById('map_canvas');
            $scope.hammertime = Hammer($scope.element).on("hold", function(event) {
                $scope.addOnClick(event);
            });

        },100);

        //Delete all Markers
        $scope.deleteAllMarkers = function(){

            if($scope.markers.length == 0){
                ons.notification.alert({
                    message: 'There are no markers to delete!!!'
                });
                return;
            }

            for (var i = 0; i < $scope.markers.length; i++) {

                //Remove the marker from Map
                $scope.markers[i].setMap(null);
            }

            //Remove the marker from array.
            $scope.markers.length = 0;
            $scope.markerId = 0;

            ons.notification.alert({
                message: 'All Markers deleted.'
            });
        };

        $scope.rad = function(x) {
            return x * Math.PI / 180;
        };


        //Add single Marker
        $scope.addOnClick = function(event) {
            var x = event.gesture.center.pageX;
            var y = event.gesture.center.pageY-44;
            var point = new google.maps.Point(x, y);
            var coordinates = $scope.overlay.getProjection().fromContainerPixelToLatLng(point);

            var marker = new google.maps.Marker({
                position: coordinates,
                map: $scope.map
            });

            marker.id = $scope.markerId;
            $scope.markerId++;
            $scope.markers.push(marker);


            $timeout(function(){
            //Creation of the listener associated to the Markers click

            google.maps.event.addListener(marker, "click", function (e) {
                ons.notification.confirm({
                    message: 'Do you want to delete the marker?',
                    callback: function(idx) {
                        switch(idx) {
                            case 0:
                                ons.notification.alert({
                                    message: 'You pressed "Cancel".'
                                });
                                break;
                            case 1:
                                for (var i = 0; i < $scope.markers.length; i++) {
                                    if ($scope.markers[i].id == marker.id) {
                                        //Remove the marker from Map
                                        $scope.markers[i].setMap(null);

                                        //Remove the marker from array.
                                        $scope.markers.splice(i, 1);
                                    }
                                }
                                ons.notification.alert({
                                    message: 'Marker deleted.'
                                });
                                break;
                        }
                    }
                });
            });
            },1000);


        };
    });
})();
