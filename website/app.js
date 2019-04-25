var app = angular
    .module("angularApp", ["ngRoute", "ngCookies"])
    
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when("/", {
            controller: "homeController",
            templateUrl: "partials/home/home.view.html",
            controllerAs: "vm"
        })

        .when("/login", {
            controller: "loginController",
            templateUrl: "components/login.component.html",
            controllerAs: "vm"
        })

        .when("/register", {
            controller: "registerController",
            templateUrl: "components/register.component.html",
            controllerAs: "vm"
        })

        .when("/mypage", {
            controller: "dashboardController",
            templateUrl: "partials/mypage/mypage.view.html",
            controllerAs: "vm"
        })

        .otherwise({ redirectTo: "/" });
    
    })

    .controller("homeController", function(userService, $rootScope, $http, $location, authService, dialogService, $cookies) {

        

        $rootScope.cart = [];
        $rootScope.emptycart = "";

        hasCookies();

        setCookie = function (cart) {
            var expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + 7);
            $cookies.putObject('cart', cart, {'expires': expiredDate});
        }

        function hasCookies() {
            if ($cookies.getObject('cart')) {
                $rootScope.cart = $cookies.getObject('cart');
            }
        }

    
        $rootScope.logout = function () {
            $rootScope.globals.currentUser = null;
            $location.path("/");
        }

        $rootScope.loginCheck = function () {
            if ($rootScope.globals.currentUser) {
                return true;
            }else{
                return false;
            }
        }

        // shopping cart

        var getProductId = function(products, id) {
            return _.find(products, function(product){
                return product.id === id
            })
        }

        $rootScope.addingToQuantity = function(product){
            product.quantity++;
            return product;
        }

        $rootScope.subtractFromQuantity = function(product){
            product.quantity--;
            return product;
        }
 
        $rootScope.addItem = function(product) {
            var found = getProductId($rootScope.cart, product.id);

            if(found) {
                found.quantity += product.quantity;
            }
            else {
                $rootScope.cart.push(angular.copy(product));
            }
            setCookie($rootScope.cart);
        }

        $rootScope.removeItem = function(product) {
            var index = $rootScope.cart.indexOf(product);
            $rootScope.cart.splice(index, 1);
            setCookie($rootScope.cart);
        }

        $rootScope.getProductCost = function(product) {
            return product.quantity * product.price;
        }

        $rootScope.getProductQuantity = function(product) {
            return product.quantity;
        }

        
        $rootScope.getTotal = function() {
            var total = _.reduce($rootScope.cart, function(sum, product) {
                return sum + $rootScope.getProductCost(product);
                
            }, 0);

            if($rootScope.cart.length === 0) {
                $rootScope.emptycart = "Your cart is empty."
            }
            else {
                $rootScope.emptycart = ""
            }   
            return total;
        }

        $rootScope.getQuantity = function() {
            var quantity = _.reduce($rootScope.cart, function(sum, product) {
                return sum + $rootScope.getProductQuantity(product);
            }, 0);
 
            if(quantity === 0) {
                $rootScope.badgeColor = "badge-secondary"
                
            } else {
                $rootScope.badgeColor = "badge-danger"
            }


            return quantity;
        }
        
        

        $http.get("http://localhost:3001/api/products").then((res) => $rootScope.products = res.data);



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



    })
    .controller("loginController", function($location, authService, dialogService) {
        var vm = this;

        function login() {
            vm.dataLoading = true;

            authService.Login(vm.email, vm.password) 
                .then(function (res) {
                    if(res.success) {
                        authService.SetCredentials(res.id, res.token);
                        $location.path("/mypage");
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
    })
    .controller("registerController", function (userService, $location, $rootScope, dialogService) {
        var vm = this;

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

    .controller("dashboardController", function ($rootScope, userService, $location) {
        if ( $rootScope.globals.currentUser !== undefined) {
            var vm = this;
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

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
        }; 

        initController();


        } else{
            $location.path("/login");
        }
    })
    









    .run(function($rootScope, $location, $cookies, $http) {

  
        $rootScope.globals = $cookies.getObject("globals") || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common["Authorization"] = 'Bearer ' +  $rootScope.globals.currentUser.token;
            console.log("inloggad"+ $cookies.getObject('globals'));
        }

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            var restrictedPage = $.inArray($location.path(), ["/login", "/register", "/"]) === -1;
            
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path("/login");
            }
        })      
    }) 

    