// pulse

$(document).ready(function(){
  $('a').click(function(){
    $('a').toggleClass('red');
  })                  
})

// form

var formApp = angular.module('formApp', [])

    .controller('formController', function($scope) {
  
        // // we will store our form data in this object
        // $scope.formData = {};
        $scope.showerrors=false;
$scope.submitForm= function(){

if ($scope.form.$invalid){
	$scope.showErrors=true;
}
};
       
    });