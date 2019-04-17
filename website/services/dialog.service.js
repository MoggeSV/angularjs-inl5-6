(function () {

    angular
        .module("angularApp")
        .factory("dialogService", dialogService)

    dialogService.$inject = ["$rootScope"];
    function dialogService($rootScope) {

        var service = {};

        function Success(message, keepAfterLocationChange) {
            $rootScope.dialog = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            }
        };

        function Error(message, keepAfterLocationChange) {
            $rootScope.dialog = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            }
        };

        function initService() {
            
            function clearDialogMessage() {
                var dialog =  $rootScope.dialog;
                if (dialog) {
                    if (!dialog.keepAfterLocationChange) {
                        delete $rootScope.dialog;
                    } else {
                        dialog.keepAfterLocationChange = false;
                    }
                }
            }

            
            $rootScope.$on("$locationChangeStart", function() {
                clearDialogMessage();
            })
        }


        service.Success = Success;
        service.Error = Error;

        initService();
        return service;
    }
})();