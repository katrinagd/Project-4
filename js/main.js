
// form

var formApp = angular.module('formApp', ['ui.router'])

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
                templateUrl: 'welcome.html'
             })


             .state('checkin', {
                url: '/checkin', 
                templateUrl: 'check-in.html',
                controller: 'RegisterFormController'
             })

             .state('encounter', {
                url: '/encounter', 
                templateUrl: 'encounter.html'
             })

             .state('report', {
                url: '/report', 
                templateUrl: 'report.html',
                controller: 'ReportFormController'
             })


}])
//  .run(['$rootScope', function($rootScope){

// }])

    .controller('RegisterFormController', ['$scope', '$state', function($scope, $state) {
  


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

        .controller('ReportFormController', ['$scope', function($scope) {
  


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

        
       
