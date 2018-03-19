'use strict';

angular.module('app')
.controller('admindashboard', function ($scope, UserFactory, $state, $rootScope) {	
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

    $scope.getuser = function() {
    	UserFactory.getAllUser().then(function success(response) {
            $scope.Users = response.data;
        }, handleError);
    }

    $scope.deleteuser = function(id) {
        UserFactory.deleteUser(id).then(function success(response) {
            alert("hi");
        }, handleError);
    }

    $scope.getuser();
    function handleError() {
    	alert("error");
    }
});