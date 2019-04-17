(function() {

    angular
        .module("angularApp")
        .controller("loginController", loginController);

    loginController.$inject = ["$location", "authService", "dialogService"];
    function loginController($location, authService, dialogService) {
        
        var vm = this;

        function login() {
            vm.dataLoading = true;

            authService.Login(vm.email, vm.password) 
                .then(function (res) {
                   
                    if(res.success) {
                        authService.SetCredentials(res.id, res.token);
                        $location.path("/home");
                    } else {
                        dialogService.Error(res.message);
                        vm.dataLoading = false;
                    }
                })               
        }

        (function initController() {
            authService.ClearCredentials();
        })();

        vm.login = login;
    }

})();