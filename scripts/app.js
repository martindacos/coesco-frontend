//Modules
angular.module("project", ['ngRoute', 'angularSpinners', 'ngCookies']);

//Sections
angular.module("project").config(["$routeProvider", function ($routeProvider) {
    //Routing
    $routeProvider
        .when("/formacion", {
            controller: "formacionCtrl",
            templateUrl: "views/formacion.html"
        })
        .when("/legal", {
              templateUrl: "views/legal.html"
        })
        .when("/privacidad", {
              templateUrl: "views/privacidad.html"
        })
        .when("/login", {
              controller: "loginCtrl",
              templateUrl: "views/login.html"
        })
        .otherwise("/formacion");

}])
    .run(['$rootScope', '$location', '$cookieStore', '$http', 'authService', function ($rootScope, $location, $cookieStore, $http, authService) {

        $rootScope.$on('$routeChangeStart', function (event) {

        if (!authService.isLoggedIn($location.path())) {
            console.log('DENY');
            console.log('Current route name: ' + $location.path());
            $location.path('/login');
         } else {
            console.log('ALLOW');
         }
        });
    }]);