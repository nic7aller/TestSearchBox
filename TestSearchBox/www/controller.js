angular.module('TestApp', [])
    .controller('TestAppController', function($scope) {
        $scope.input = document.getElementById('pac-input');
        $scope.searchBox = new google.maps.places.SearchBox($scope.input);
        $scope.currentLocation = { lat: 39.9977549, lng: -83.008578 };
        $scope.bounds = {
            north: ($scope.currentLocation.lat + 0.030),
            east: ($scope.currentLocation.lng + 0.030),
            south: ($scope.currentLocation.lat - 0.030),
            west: ($scope.currentLocation.lng - 0.030)
        }
        $scope.searchBox.setBounds($scope.bounds);
        $scope.searchBox.addListener('places_changed', function () {
            $scope.placesChanged();
        });
        $scope.locations = [];
        $scope.placesChanged = function () {
            $scope.locations = $scope.searchBox.getPlaces();
            var index = 0;
            $scope.locations.forEach(function (place) {
                var ltlg = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                place.distance = getDistance($scope.currentLocation, ltlg);
                place.index = index;
                index++;
            });
            $scope.$apply();
            console.log($scope.locations);
        }

        $scope.getItem = function (index) {
            alert($scope.locations[index].name);
        }

        // Adapted functions from Mike Williams and Mathias Bynens on Stack Overflow
        var rad = function (x) {
            return x * Math.PI / 180;
        };

        var getDistance = function (p1, p2) {
            var R = 6378137; // Earth’s mean radius in meter
            var m = 0.000621371192237; // Miles per meter
            var dLat = rad(p2.lat - p1.lat);
            var dLong = rad(p2.lng - p1.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c * m;
            return d; // returns the distance in miles
        };
        
});