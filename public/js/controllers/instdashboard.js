'use strict';

angular.module('app')
.controller('instdashboard', function ($scope, courseFactory, $state, $rootScope, UserFactory) {	
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
                    
    $scope.getcourses = function() {
    	courseFactory.getmyCourse().then(function success(response) {
        $scope.courses = response.data.course;
        $rootScope.userName = response.data.userName
      }, handleError);
    }

    $scope.courseDetailPage = function(course) {
        
        localStorage.setItem("courseid", course._id);
        $state.go('app-instructor.addCourse');
    }

    $scope.getcourses();
    function handleError() {
    	alert("error");
    }
});