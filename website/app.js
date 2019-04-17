var app = angular
    .module("angularApp", ["ngRoute", "ngCookies"])
    
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when("/", {
            controller: "homeController",
            templateUrl: "partials/home/home.view.html",
            controllerAs: "vm"
        })

        .otherwise({ redirectTo: "/" });
    
    })

    .controller("homeController", function(userService, $rootScope, $http) {

        var vm = this;
        vm.user = null;
        vm.allUsers = [];

        $http.get("http://localhost:3001/api/products").then((res) => $rootScope.products = res.data);




        function getCurrentUser(id) {
            userService.GetUser(id)
                .then(function (user) {
                    vm.user = user;             
                })      
        }

        function getAllUsers() {
            userService.GetUsers()
                .then(function (users) {
                    vm.allUsers = users
                })
        }

        function deleteUser(id) {
            userService.Delete(id)
                .then(function () {
                    getAllUsers();
                })
        }

        function initController() {
            getCurrentUser($rootScope.globals.currentUser.id);
            getAllUsers();
        }


        //initController();
        vm.deleteUser = deleteUser;


        //Sets row limits
        $rootScope.rowLimit = 5;

        //Sets grid or list active button
        $rootScope.cardActive = true;

        //Sets stars
        $rootScope.rating = function(input) {
            
            return `${Math.round(((input / 5) * 100) / 10) * 10}%`;
        }

        //Sorting products
        $rootScope.sortColumn = "-rating";
    
        $rootScope.sortData = function (sortBy) {
            $rootScope.sortColumn = sortBy;
        }




        $rootScope.userComponent = "components/login.component.html"
        $rootScope.filterComponent = "components/filter.component.html"
        $rootScope.productComponent = "components/gridview.component.html"

        $rootScope.changeProductComponent = function(component) {
            $rootScope.productComponent = "components/" + component;
        }

        $rootScope.changeUserComponent = function(component) {         
            $rootScope.userComponent = "components/" + component;
        }

    })









/*     .run(function($rootScope, $location, $cookies, $http) {
  
        $rootScope.globals = $cookies.getObject("globals") || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common["Authorization"] = 'Bearer ' +  $rootScope.globals.currentUser.token;
           
        }

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            var restrictedPage = $.inArray($location.path(), ["/login", "/register"]) === -1;
            
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path("/login");
            }
        })      
    }) 
*/
    


    // .controller("angularController", function($scope, $http) {
        
    //     //Setting products
    //     $http.get("http://localhost:5000/api/products")
    //         .then((res) => $scope.products = res.data)
        

    //     //Sets row limits
    //     $scope.rowLimit = 5;

    //     //Sets grid or list active button
    //     $scope.cardActive = true;

    //     //Sets stars
    //     $scope.rating = function(input) {
            
    //         return `${Math.round(((input / 5) * 100) / 10) * 10}%`;
    //     }

    //     //Sorting products
    //     $scope.sortColumn = "-rating";
    
    //     $scope.sortData = function (sortBy) {
    //         $scope.sortColumn = sortBy;
    //     }
    // })
    