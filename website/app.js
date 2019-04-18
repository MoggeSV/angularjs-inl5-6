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

    .controller("homeController", function(userService, $rootScope, $http, $location, authService, dialogService) {

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


        //Sets grid or list active button
        $rootScope.cardActive = true;

        //Sets stars
        $rootScope.rating = function(input) {
            
            return `${Math.round(((input / 5) * 100) / 10) * 10}%`;
        }

       

        $rootScope.rowLimit = {
            "type": "select", 
            "name": "rowLimit",
            "value": "10", 
            "values": [ "2", "5", "10", "15", "20", "50", "100"] 
        };

        $rootScope.sortProducts = {
            "type": "select", 
            "name": "sortProducts",
            "value": "rating", 
            "values": [ "name", "price", "rating"] 
        };


        $rootScope.userComponent = "components/login.component.html"
        $rootScope.filterComponent = "components/filter.component.html"
        $rootScope.productComponent = "components/gridview.component.html"
        $rootScope.cartComponent = "components/cart.component.html"

        $rootScope.changeProductComponent = function(component, value) {
            $rootScope.productComponent = "components/" + component;
            $rootScope.cardActive = value;
        }

        $rootScope.changeUserComponent = function(component) {         
            $rootScope.userComponent = "components/" + component;
        }


        
        vm.login = login;

        function login() {
            console.log("login start ok");
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

        function initController() {
            authService.ClearCredentials();
        }

        vm.register = function () {
            vm.dataLoading = true;
            userService.Create(vm.user)
                .then(function (res) {
                    if(res.success) {
                        dialogService.Success("Registration was successful", true);
                        $location.path("/login");
                    } else {
                        dialogService.Error(res.message);
                        vm.dataLoading = false;
                    }
                })
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
    