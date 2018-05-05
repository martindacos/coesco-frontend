angular.module("project").controller("formacionCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function ($scope, $http, $location, restService, postService) {


$scope.submitContact = function(){
    //Set vars
    var uploadUrl = restService.url + 'contactEmail' + "?name=";

    swal('Procesando su solicitud ...', '','info')
    swal.showLoading();

    postService.postData(uploadUrl, $scope.nameForm, $scope.email, $scope.phone, $scope.description)
    .then(function success(response) {
        document.getElementById('myForm').reset();
        swal('OK', 'Mensaje enviado correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetContact = function(){
    document.getElementById('myForm').reset();
};

$scope.get = function () {
        swal('Cargando ...', '','')
        swal.showLoading();

        restService.get(restService.url, "courses/", '')
            .then(function (response) {
                $scope.courses = response.data;
                swal.close();
            }, function error(response) {
                $scope.courses = [];
            });
    };


$scope.get();

}]);