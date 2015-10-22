// pulse

// $(document).ready(function(){
//   $('a').click(function(){
//     $('a').toggleClass('red');
//   })                  
// })

// form

var formApp = angular.module('formApp', [])

//  .run(['$rootScope', function($rootScope){

// }])

    .controller('RegisterFormController', ['$scope', function($scope) {
  


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

        
       
