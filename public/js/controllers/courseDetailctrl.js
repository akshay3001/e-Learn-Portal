'use strict';

angular.module('app')
.controller('courseDetailctrl', function ($scope,$http, courseFactory, $state, $rootScope, UserFactory, API_URL) {
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
$("#customPlyr").hide();


$scope.searchCourseLesson = function() {
      $scope.courseid = localStorage.getItem("courseid")
      $http({
        url: API_URL+'/api/lesson',
        method: 'GET',
        params: {courseid: $scope.courseid}
      }).then(function(response) {                                
         $scope.lessons = response.data.lessons.filtarray;
      }, function(error) {
        alert(error.message);
      });  
}

$scope.searchCoursebyID = function() {
      $scope.courseid = localStorage.getItem("courseid")
      $http({
        url: API_URL+'/api/getsinglecourse',
        method: 'GET',
        params: {courseid: $scope.courseid}
      }).then(function(response) {                                
         $scope.course = response.data.course;
      }, function(error) {
        alert("This is not free course so please Purchase this video Login with student");
        $state.go('website-pages.login');
      });  
}

function handleError() {
  alert("error");
}

$scope.searchCourseLesson();
$scope.searchCoursebyID();

$scope.playvideo = function(videoid){

  plyr.get().forEach(function(instance) { 
    instance.destroy();
  });


   // angular.element("#plyr").parent(".plyr").hide();
   // angular.element("#customPlyr").parent(".plyr").hide();

  if(videoid.indexOf("/") >= 0) {
     var path = API_URL+"/uploads"+videoid;
      console.log(path);
      //$("#plyr").parent().hide();
     angular.element("#customPlyr source").attr("src", path);
  }
  else
  {
    //$("#customPlyr").parent().hide();
  $(".plyr--video").first().hide();
  angular.element("#plyr").attr("data-video-id", videoid);
  }

  plyr.setup();
    if(videoid.indexOf("/") >= 0) {
      $("#customPlyr").show();
      $("#plyr").parent().hide();
  }
  else
  {
    $(".plyr--video").first().hide();
    $("#customPlyr").parent().hide();
  }
  //plar.destroyed()
}


});