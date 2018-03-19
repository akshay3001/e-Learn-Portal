'use strict';

angular.module('app')
  .service('auth', function ($http, API_URL, authToken, $state, $window, $q) {
    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function (email, password) {
      return $http.post(API_URL + '/api/authenticat', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    this.register = function (email, password) {
      return $http.post(API_URL + 'register', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    //These are the credentails needed for google to start authenticating.
    var urlBuilder = [];
    var clientId = '142057024712-e1195uajauf4hq39gmso3e9pou3g1v5r.apps.googleusercontent.com';
    var redirectUri = window.location.origin;
    urlBuilder.push('response_type=code',
                    'client_id=' + clientId,
                    'redirect_uri=' + redirectUri,
                    'scope=profile email');

    
    this.googleAuth = function () {
      var url = 'https://accounts.google.com/o/oauth2/auth?' + urlBuilder.join('&');
      
      //Opening the window options. There are better options out there. This is just for basic show.
      var options = 'width=500, height=500, left=' + ($window.outherWidth - 500) / 2 + ',top' + ($window.outherHeight - 500) / 2;
      
      //This is an async operation so we're using $q.
      var deferred = $q.defer();
      
      //Open a window with google's authenticattion logon screen.
      var popup = $window.open(url, '', options);
      $window.focus();
      
      //When we click login, we will get back our response token. We get it back and post it to our server. 
      //Our server then uses that token to generate a full Access token that we can use to call google APIs.
      $window.addEventListener('message', function(event) {
          if(event.origin === $window.location.origin) {
            var code = event.data;
            popup.close();
            
            //We pass the token we got and provide the clientId and redirect URl. 
            //We get back the user, store the Jwt in the cache and resolve our deferred.
            $http.post(API_URL + 'auth/google', {
              code: code,
              clientId: clientId,
              redirectUri: redirectUri
            }).success(function(res) {
              authSuccessful(res);
              deferred.resolve(res);
            });
            
            
          }
          
      });
      
      return deferred.promise;
    };
  });
