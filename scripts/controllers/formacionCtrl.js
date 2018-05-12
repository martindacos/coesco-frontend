angular.module("project").controller("formacionCtrl", ["$scope", "$http", "$location", 'restService', 'postService', function($scope, $http, $location, restService, postService) {

            actual = null;

            $scope.submitContact = function() {
                //Set vars
                var uploadUrl = restService.url + 'contactEmail' + "?name=";

                swal('Procesando su solicitud ...', '', 'info')
                swal.showLoading();

                postService.postData(uploadUrl, $scope.nameForm, $scope.email, $scope.phone, $scope.description)
                    .then(function success(response) {
                        document.getElementById('myForm').reset();
                        swal('OK', 'Mensaje enviado correctamente', 'success')
                    }, function error(response) {
                        swal('Error!', 'An error ocurred :(', 'error');
                    });
            };


            $scope.resetContact = function() {
                document.getElementById('myForm').reset();
            };

            $scope.get = function(i) {
                swal('Cargando ...', '', '')
                swal.showLoading();

                if (actual != null) {
                    var elementA = document.getElementById(actual);
                    if (elementA != null) elementA.classList.remove("active");
                }

                var element = document.getElementById("page" + i);
                if (element != null) {
                    element.classList.add("active");
                    actual = "page" + i;
                }

                restService.get(restService.url, "coursesP/?page=" + i, '')
                    .then(function(response) {
                            $scope.courses = response.data;

                            if ($scope.pages == null) {
                                restService.get(restService.url, "coursesS/", '')
                                    .then(function(response) {
                                        $scope.pages = response.data;
                                        actual = "page1";
                                    }, function error(response) {
                                        $scope.page = 0;
                                    });
                            }

                            swal.close();
                            },
                            function error(response) {
                                $scope.courses = [];
                            });
                    };



            if ($scope.courses == null) {
                $scope.get(1);
            }

            $scope.setCourse = function(name){
                //console.log(inscription);
                var myEl = angular.element( document.querySelector( '#title' ) );
                myEl.html(name);
            };

            }]);