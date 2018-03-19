app.factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory, $q) {
    'use strict';
    return {
      login: login,
      logout: logout,
      getUser: getUser,
      getAllUser: getAllUser
    };

    function login(username, password) {
      return $http.post('/api/authenticat', {
        userName: username,
        password: password
      }).then(function success(response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    }


    function deleteuser(id) {
      return $http.post(API_URL + '/api/authenticat', {
        userName: username,
        password: password
      }).then(function success(response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    }

    function logout() {
      AuthTokenFactory.setToken();
    }

    function getUser() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me');
      } else {
        return $q.reject({ data: 'client has no auth token' });
      }
    }

    function getAllUser() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/api/allusers');
      } else {
        return $q.reject({ data: 'client has no auth token' });
      }
    }
  });