(function () {

    angular
        .module("angularApp")
        .factory("userService", userService);

    userService.$inject = ["$http", "$rootScope"];
    
    function userService($http, $rootScope) {
        var service = {};

        function handleResponse(res) {
            return res.data;
        }

        function GetUsers() {
            return $http
                .get("http://localhost:3001/api/users/")
                .then(handleResponse, handleResponse)
        }

        function GetUser(id) {
            return $http
                .get("http://localhost:3001/api/users/" + id)
                .then(handleResponse, handleResponse)
        }        

        function Create(user) {
            console.log(user);
            return $http
                .post("http://localhost:3001/api/users/register", user)
                .then(handleResponse, handleResponse)
        }

        function Update(id) {
            return $http
                .put("http://localhost:3001/api/users/" + id)
                .then(handleResponse, handleResponse)
        }

        function Delete(id) {
            return $http
                .delete("http://localhost:3001/api/users/" + id)
                .then(handleResponse, handleResponse)            
        }
        
        service.GetUsers = GetUsers;
        service.GetUser = GetUser;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;
    }

})();