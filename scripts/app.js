//Modules
angular.module("project", ['ngRoute', 'angularSpinners', 'ngCookies']);

//Sections
angular.module("project").config(["$routeProvider", function ($routeProvider) {
    //Routing
    $routeProvider
        .when("/dashboard", {
            controller: "dashboardCtrl",
            templateUrl: "views/dashboard.html"
        })
        .when("/modifyCourse", {
              controller: "modifyCourseCtrl",
              templateUrl: "views/modifyCourse.html"
        })
        .when("/newCourse", {
             controller: "newCourseCtrl",
             templateUrl: "views/newCourse.html"
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
        .otherwise("/index");


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