
// form

var formApp = angular.module('formApp', ['ui.router','ngAnimate', 'ngCookies'])

.config(['$stateProvider',
         '$urlRouterProvider',
         '$locationProvider',
          function($stateProvider,
                   $urlRouterProvider,
                   $locationProvider){

            $locationProvider.html5Mode ({
                enabled: true,
                requireBase: false,
                rewriteLinks: false
            });

            $stateProvider
             .state('welcome', {
                url: '/',
                templateUrl: 'welcome.html',
                controller: 'welcomeController'


             })


             .state('checkin', {
                url: '/checkin', 
                templateUrl: 'check-in.html',
                controller: 'RegisterFormController',
                resolve: {
                        user: ['$cookies', function($cookies){
                            if($cookies.getObject('mars_user')){
                                $state.go('encounter');
                            }
                        }]
                    }

                })

             .state('encounter', {
                url: '/encounter', 
                templateUrl: 'encounter.html',
                controller: 'encounterController'
             })

             .state('report', {
                url: '/report', 
                templateUrl: 'report.html',
                controller: 'ReportFormController'
             })


}])

.run(['$rootScope', function($rootScope){

}])

.controller('welcomeController', ['$scope', '$rootScope','$http', '$cookies', function($scope, $rootScope, $http, $cookies) {
    $rootScope.pageClass = 'welcome';
    $cookies.putObject('mars_user', undefined);
}])

.controller('encounterController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.pageClass = 'encounter';
}])
    .controller('RegisterFormController', ['$scope', '$rootScope', '$state', '$http', '$cookies',  function($scope, $rootScope, $state, $http, $cookies) {
  
var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";

$scope.colonist ={};

$http.get(API_URL_GET_JOBS).then (function(response){
    
    $scope.jobs = response.data.jobs;
});



        $rootScope.pageClass = 'checkin';
        $scope.submitRegistration = function(e, form){
        	e.preventDefault();
        	console.log(form);
        }

        // // we will store our form data in this object
        // $scope.formData = {};
        $scope.showErrors=false;
$scope.submitForm= function(){

if ($scope.form.$invalid){
	$scope.showErrors=true;
} else {


$http({ 
    method: 'POST',
    url: API_URL_CREATE_COLONIST,
    data: { colonist: $scope.colonist }
    
}).then(function(response){
     $cookies.putObject('mars_user', response.data.colonist);
     $state.go('encounter');
     // debugger;
})
  
}
};

}])

        .controller('ReportFormController', ['$scope', '$rootScope', function($scope, $rootScope) {
  

// var ALIEN_TYPE_API_URL = "https://red-wdp-api.herokuapp.com/api/mars/aliens";
// var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

// $scope.alient ={};

// $http.get(ALIEN_TYPE_API_URL).then (function(response){
    
//     $scope.jobs = response.data.aliens;
// });




        $rootScope.pageClass = 'report';
        $scope.submitReport = function(e, form){
        	e.preventDefault();
        	console.log(form);
        }

        

        $scope.showerrors=false;
$scope.submitForm= function(){

if ($scope.form.$invalid){
	$scope.showErrors=true;
} else {
    alert('Report filed!');
}
};

}]);

        
       
