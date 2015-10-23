
// form

var formApp = angular.module('formApp', ['ui.router','ngAnimate'])

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
                controller: 'RegisterFormController'
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

.controller('welcomeController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.pageClass = 'welcome';
}])

.controller('encounterController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.pageClass = 'encounter';
}])
    .controller('RegisterFormController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
  

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

    $state.go('encounter');
}
};

}])

        .controller('ReportFormController', ['$scope', '$rootScope', function($scope, $rootScope) {
  

        $rootScope.pageClass = 'report';
        $scope.submitReport = function(e, form){
        	e.preventDefault();
        	console.log(form);
        }

        // // we will store our form data in this object
        // $scope.formData = {};
        $scope.showerrors=false;
$scope.submitForm= function(){

if ($scope.form.$invalid){
	$scope.showErrors=true;
}
};

}]);

        
       
