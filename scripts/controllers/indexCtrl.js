angular.module("project").controller("indexCtrl", ["$scope", "$http", "$rootScope", "$location", 'restService', 'postService', 'authService', function ($scope, $http, $rootScope, $location, restService, postService, authService) {

    var id = "l";
    $scope.route = function (route) {
        return route === $location.path();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.showNax = function () {
        return authService.showAdminNav($location.path());
    }

    $scope.showRestaurant = function () {
        return authService.isRestaurant($location.path());
    }

    $scope.scroll = function (i) {
        id = "section" + i;
        var element = document.getElementById(id);
        if (element != null) {
            element.scrollIntoView();
        } else {
            $location.path("/formacion#" + id);
        }
    }

    $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {
        if (id != "l") {
            document.getElementById(id + "l").className = "";
            window.location.reload();
            id = "l";
        }
    })
}]);