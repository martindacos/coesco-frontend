angular.module("project").service("postService", ["$http", "$rootScope", "$location", function ($http, $rootScope, $location) {

    //Contact form
    this.postData = function (uploadUrl, file, email, phone, description) {

        //Set config
        var config = {
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };

        //Append data
        var fd = new FormData();
        fd.append('email', email);
        fd.append('phone', phone);
        fd.append('description', description);

        //Promise
        return $http.post(uploadUrl + file, fd, config).then(function (response) {
            return (response);
        });

    };


    //New Course
        this.postCourse = function (uploadUrl, nameCourse, zoneCourse, descriptionCourse, timeCourse, fechaIniCourse, fechaFinCourse, directionCourse, file) {

            //Set config
            var config = {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            };

            var fd = new FormData();
            fd.append('nameCourse', nameCourse);
            fd.append('zoneCourse', zoneCourse);
            fd.append('descriptionCourse', descriptionCourse);
            fd.append('timeCourse', timeCourse);
            fd.append('fechaIniCourse', fechaIniCourse);
            fd.append('fechaFinCourse', fechaFinCourse);
            fd.append('directionCourse', directionCourse);
            fd.append('file', file);
            fd.append('coesco', true);

            //Promise
            return $http.post(uploadUrl, fd, config).then(function (response) {
                return (response);
            });

        };

    //Modify Course
        this.modifyCourse = function (uploadUrl, nameCourse, zoneCourse, descriptionCourse, fechaIniCourse, fechaFinCourse, directionCourse, horarioCourse, active, ref) {

            //Set config
            var config = {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            };

            var fd = new FormData();
            fd.append('nameCourse', nameCourse);
            fd.append('zoneCourse', zoneCourse);
            fd.append('descriptionCourse', descriptionCourse);
            fd.append('fechaIniCourse', fechaIniCourse);
            fd.append('fechaFinCourse', fechaFinCourse);
            fd.append('directionCourse', directionCourse);
            fd.append('horarioCourse', horarioCourse);
            fd.append('active', active);
            fd.append('ref', ref);

            //Promise
            return $http.post(uploadUrl, fd, config).then(function (response) {
                return (response);
            });

        };
}]);