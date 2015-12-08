// form
var formApp = angular.module('formApp', ['ui.router', 'ngAnimate', 'ngCookies'])

.config(['$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider,
        $urlRouterProvider,
        $locationProvider) {

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false,
            rewriteLinks: false
        });

        $stateProvider
            .state('welcome', {
                url: '',
                templateUrl: 'welcome.html',
                controller: 'welcomeController'
            })


        .state('checkin', {
            url: '/checkin',
            templateUrl: 'check-in.html',
            controller: 'RegisterFormController',
            resolve: {
                user: ['$cookies', function($cookies) {
                    if ($cookies.getObject('mars_user')) {
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


    }
])

.run(['$rootScope', function($rootScope) {

}])

.controller('welcomeController', ['$scope', '$rootScope', '$http', '$cookies', function($scope, $rootScope, $http, $cookies) {
    $rootScope.pageClass = 'welcome';
    $cookies.putObject('mars_user', undefined);
}])

.controller('encounterController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
        $rootScope.pageClass = 'encounter';
        var API_URL_GET_ENCOUNTERS = "https://red-wdp-api.herokuapp.com/api/mars/encounters";

        $http.get(API_URL_GET_ENCOUNTERS).then(function(response) {

            $scope.encounters = response.data.encounters;
        });
    }])
    .controller('RegisterFormController', ['$scope', '$rootScope', '$state', '$http', '$cookies', function($scope, $rootScope, $state, $http, $cookies) {

        var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
        var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";


        $scope.colonist = {};

        $http.get(API_URL_GET_JOBS).then(function(response) {

            $scope.jobs = response.data.jobs;
        });



        $rootScope.pageClass = 'checkin';
        $scope.submitRegistration = function(e, form) {
            e.preventDefault();
        }

        // // we will store our form data in this object
        // $scope.formData = {};
        $scope.showErrors = false;
        $scope.submitForm = function() {

            if ($scope.form.$invalid) {
                $scope.showErrors = true;
            } else {


                $http({
                    method: 'POST',
                    url: API_URL_CREATE_COLONIST,
                    data: {
                        colonist: $scope.colonist
                    }

                }).then(function(response) {
                    $cookies.putObject('mars_user', response.data.colonist);
                    $state.go('encounter');
                    // debugger;
                })

            }
        };

    }])

.controller('ReportFormController', ['$scope', '$rootScope', '$http', '$cookies', '$state', function($scope, $rootScope, $http, $cookies, $state) {

    var ALIEN_TYPE_API_URL = "https://red-wdp-api.herokuapp.com/api/mars/aliens";
    var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

    $rootScope.pageClass = 'report';

    $scope.report = {
        "date": "2015-11-03",
        "colonist_id": $cookies.getObject("mars_user").id
    };

    $scope.showErrors = false;

    $http.get(ALIEN_TYPE_API_URL).then(function(response) {
        $scope.aliens = response.data.aliens;
    });

    $scope.submitReport = function(e, form) {
        e.preventDefault();

        if (form.$invalid) {
            $scope.showErrors = true;
        } else {
            $http({
                method: 'POST',
                url: ENCOUNTERS_API_URL,
                data: {
                    encounter: $scope.report
                }
            }).then(function(response) {
                $state.go('encounter');
            });
        }
    }
}]);