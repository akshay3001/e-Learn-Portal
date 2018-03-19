app.factory('courseFactory', function courseFactory($http, API_URL, $q) {
    'use strict';
    return {
      createNewCourse: createNewCourse,
      getmyCourse: getmyCourse,
      getallCourse: getallCourse 
    };

    function createNewCourse(obj) {
      return $http.post(API_URL + '/api/course', {
        title: obj.title,
        genre: "username1",
        duration: obj.duration,
        instructor: "instructor",
        description: obj.description,
        price:obj.price 
      }).then(function success(response) {
        return response;
      });
    }

    function getmyCourse() {
      return $http.get(API_URL + '/api/course').then(function success(response) {
        return response;
      });
    }

    function getallCourse(value) {
      
      var config = {
              keyword: value || ""       
      }
      return $http.post(API_URL + '/api/allcourse', config).then(function success(response) {
        return response;
      });
    }
});