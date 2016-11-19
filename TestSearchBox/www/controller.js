angular.module('TestApp', [])
    .controller('TestAppController', function($scope) {
        $scope.autocomplete = function () {
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            var places = [];
            searchBox.addListener('places_changed', function () {
                places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                /*places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }


                });*/
            });
        };
});