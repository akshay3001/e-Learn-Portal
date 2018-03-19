'use strict';

angular.module('app')
.controller('addCourse', function ($scope,$http, courseFactory, $state, $rootScope, UserFactory, API_URL) {
 var htmlClass = {
  website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
  websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
  websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
  websiteLogin: 'hide-sidebar ls-bottom-footer',
  websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
  appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
  appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
};

$scope.app.settings.htmlClass = htmlClass.appl3;
$scope.app.settings.bodyClass = '';
$rootScope.menuStudent = false;
$rootScope.loginPage = true;

$scope.course = {};


$scope.Prnames = ["Premium", "Free"];


$scope.submit = function() {
  $scope.course.description =  angular.element(".note-editable").html();
  console.log($scope.course)
  courseFactory.createNewCourse($scope.course).then(function success(response) {
    alert("course updated sucessfully. Now create Lesson");
    localStorage.setItem("courseid", response.data._id);

  }, handleError);
}

$scope.addLesson = function() {
      $scope.lesson.courseid = localStorage.getItem("courseid")
      $http({
        url: API_URL +'/api/lesson',
        method: 'POST',
        data: $scope.lesson
      }).then(function(response) {                                
         alert("updated sucessfully");
         $scope.addlessonTab();
      }, function(error) {
        alert(error.message);
      });
  
}

$scope.addlessonTab = function() {
      $scope.courseid = localStorage.getItem("courseid")
      $http({
        url: API_URL +'/api/lesson',
        method: 'GET',
        params: {courseid: $scope.courseid}
      }).then(function(response) {                                
         $scope.lessons = response.data.lessons.filtarray;
      }, function(error) {
        alert(error.message);
      });  
}

$scope.courseDetail = function() {
  alert("hi");
}

function handleError() {
  alert("error");
}

});