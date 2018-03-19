'use strict';

angular.module('app')
.controller('LoginCtrl1', function ($scope, $state, $rootScope, UserFactory) {
  var htmlClass = {
    website: 'transition-navbar-scroll top-navbar-xlarge bottom-footer',
    websitePricing: 'top-navbar-xlarge bottom-footer app-desktop',
    websiteSurvey: 'top-navbar-xlarge bottom-footer app-desktop app-mobile',
    websiteLogin: 'hide-sidebar ls-bottom-footer',
    websiteTakeQuiz: 'transition-navbar-scroll top-navbar-xlarge bottom-footer app-desktop app-mobile',
    appl3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l3',
    appl1r3: 'st-layout ls-top-navbar-large ls-bottom-footer show-sidebar sidebar-l1 sidebar-r3'
  };
  
  $scope.app.settings.htmlClass = htmlClass.website;
  $scope.app.settings.bodyClass = '';
  $rootScope.loginPage = true;
  $scope.hideloginbtn="true";


/*  function handleError(err) {
      alert('warning', 'Something went wrong :(', err.message);
    }


    $scope.submit = function () {
      $auth.login({
        userName: $scope.userName,
        password: $scope.password
      }).then(function (res) {
        $rootScope.userName = res.data.userName;
        $rootScope.loginPage = true;
        res.data.userRole == "Student" ? $state.go('app-student.dashboard') :  $state.go('app-instructor.dashboard');
      }).catch(handleError);
    };


    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function (res) {
        alert('success', 'Welcome', 'Thanks for coming back, ' + res.data.user.displayName + '!');
      })
        .error(handleError);
    };
    */
    var vm = this;

    // initialization
    /*UserFactory.getUser().then(function success(response) {
      vm.user = response.data;
    });*/

    $scope.submit = function() {
      loginform.$submitted;
      if($scope.loginform.$valid) 
     {   UserFactory.login($scope.userName, $scope.password).then(function success(response) {
          vm.user = response.data.user;
          if(response.data.userName)
          {
             $rootScope.userData = response.data;
          }

          if(response.data.userRole == "Student") {
             $state.go('app-student.dashboard');
          }
          else if(response.data.userRole == "Instructor")  {
             $state.go('app-instructor.dashboard');
          }
          else if(response.data.userRole == "Admin")
          {
             $state.go('app-admin.dashboard');
             
          }
          else if(!response.data.success)
          {
             $scope.loginerror = true;
          }
        }, handleError);
     }
    }

    $scope.logout = function() {
      UserFactory.logout();
      vm.user = null;
    }

    function handleError(response) {
      response.data.success == false? $scope.loginerror = true : '';
    }
  });
