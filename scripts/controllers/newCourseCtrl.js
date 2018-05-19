angular.module("project").controller("newCourseCtrl", ["$scope", '$cookieStore', "$http", "$location", 'restService', 'postService', function ($scope, $cookieStore, $http, $location, restService, postService) {


$scope.newCourse = function(){
    //Set vars
    var id = $cookieStore.get('globals').currentUser.authdata;
    var uploadUrl = restService.url + 'newCourse?auth=' + id;

    var file = document.getElementById("imgCourse").files[0];
    var fileName = file.name;
    console.log(fileName);
    var ext = fileName.substr(fileName.lastIndexOf('.')+1);
    if (ext != "jpg" && ext != "png") {
        swal('Error!', 'El archivo no tiene la extensión correcta', 'error');
        return;
    }

    postService.postCourse(uploadUrl, $scope.nameCourse, $scope.zoneCourse, $scope.descriptionCourse, $scope.timeCourse, $scope.fechaIniCourse, $scope.fechaFinCourse
    , $scope.directionCourse, file)
    .then(function success(response) {
        document.getElementById('newCourseForm').reset();
        $scope.get();
        swal('OK', 'Curso añadido correctamente','success')
    }, function error(response) {
        swal('Error!', 'An error ocurred :(', 'error');
    });
};


$scope.resetNewCourse = function(){
    document.getElementById('newCourseForm').reset();
};

    $scope.loading = false;
    $scope.source = "DB";
    $scope.get = function () {
        var id = $cookieStore.get('globals').currentUser.authdata;
        restService.get(restService.url, "allCoursesC?auth=" + id, '')
            .then(function (response) {
                $scope.courses = response.data;
            }, function error(response) {
                $scope.courses = [];
                swal('Error!', 'An error ocurred :(', 'error');
            });
    };

    $scope.get();

    $scope.deleteCourse = function(ref){
        console.log(ref);

        swal({
          title: '¿Estás seguro?',
          text: 'El curso ' + ref + ' no va a poder ser recuperado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, bórralo!'
        }).then(function () {
            var id = $cookieStore.get('globals').currentUser.authdata;
            //Set vars
            var deleteUrl = restService.url + 'deleteCourse/' + ref + "?auth=";

            postService.deleteCourse(deleteUrl, id)
            .then(function success(response) {
                swal('OK', 'Curso eliminado correctamente','success')
                $scope.get();
            }, function error(response) {
                swal('Error!', 'An error ocurred :(', 'error');
            });
        })
    };

    $scope.editCourse = function(course){
        $scope.editOf = course;
        $scope.nameCourse = course.name;
        $scope.zoneCourse = course.zone;
        $scope.descriptionCourse = course.description;
        $scope.dateCourse = course.time;
        $scope.activeCourse = course.active;
        $scope.fechaIniCourse = course.dateIni;
        $scope.fechaFinCourse = course.dateFin;
        $scope.directionCourse = course.direction;
        $scope.test = course.active;
        $scope.refC = course.ref;
    };

    $scope.modifyCourse = function(){
        //Set vars
        var id = $cookieStore.get('globals').currentUser.authdata;
        var uploadUrl = restService.url + 'modifyCourse?auth=' + id;

        postService.modifyCourse(uploadUrl, $scope.nameCourse, $scope.zoneCourse, $scope.descriptionCourse, $scope.fechaIniCourse, $scope.fechaFinCourse, $scope.directionCourse
        , $scope.dateCourse, $scope.test, $scope.refC)
        .then(function success(response) {
             $('#editCourseModal').modal('hide');
            $scope.get();
            swal('OK', 'Curso modificado correctamente','success')
        }, function error(response) {
            swal('Error!', 'An error ocurred :(', 'error');
        });
    };
}]);