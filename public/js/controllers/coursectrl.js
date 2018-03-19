'use strict';

angular.module('app')
.controller('coursectrl', function ($scope, courseFactory, $state, $rootScope, UserFactory) {	
    var htmlClass = {
        website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
        websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
        websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
        websiteLogin: 'hide-sidebar ls-bottom-footer',
        websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
        appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
        appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
    };
                        
    $scope.getallcourses = function() {
        $scope.app.settings.htmlClass = htmlClass.website;
        $scope.app.settings.bodyClass = '';
        $rootScope.loginPage= false;
                            
        var keyword = $rootScope.searchCourse || localStorage.getItem("keyword");
    	courseFactory.getallCourse(keyword).then(function success(response) {
        $scope.courses = response.data.course;
        //$rootScope.userName = response.data.userName
      }, handleError);
    };

    localStorage.removeItem("courseid");

    $scope.goToSearchDetailPage = function(courseid) {
        localStorage.setItem("courseid", courseid);
        $state.go('website-pages.take-course');
    };

    $scope.getallcourses();
    function handleError() {
    	alert("error");
    }
});