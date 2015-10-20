(function(){
var app = angular.module ("project3", []);

app.controller("InstaController", ['$scope', '$http', function($scope, $http){

  $scope.loading = false;
  $scope.posts = [];
  $scope.getPhotos = function(e){
    e && e.preventDefault();
    $scope.loading=true;
    var searchInput ="https://api.instagram.com/v1/tags/" +$scope.hashtag+ "/media/recent?callback=JSON_CALLBACK&client_id=4a2e2da76afc432cb575e56e3919aad6";
    $http.jsonp(searchInput).then(function(response){
  
      $scope.posts = response.data.data;
      console.log($scope.posts)
      $scope.loading=false;
});


};

}]);

})();


// $(function() {

//    // set some initial variables
//    var standard_resolution,
//        tags,
//        instaUrl,
//        $photoList = $('.photo-list'),
//        photo = '';

//    // when the form is submitted
//    $('#tag-search').on('submit', function(event) {

//       event.preventDefault();
//       $('.search-bg').css("display", "none");

//       // reset all the things
//       $photoList.empty();
//       photo = '',

//       // get the search string
//       tags = $('#tags').val().replace(/ /g, '+'),
//       instaUrl = "https://api.instagram.com/v1/tags/" + tags + "/media/recent?client_id=4a2e2da76afc432cb575e56e3919aad6";

//       // make the call to the endpoint
//       $.ajax({
//          method: 'GET',
//          url: instaUrl,
//          dataType: 'jsonp'
//       })
//       // if it works...
//       .done(function(data) {
        
//         console.log(data.data);
        
//         var photos = data.data;
//    $.each(photos, function (key, value) {
//      photo += '<li>';
//      photo += '<div class="pics">';
//      photo += '<img src="'+ value.images.standard_resolution.url +'" />';
//      photo += '<div class="under-photo-container">';
//      photo += '<div class="profile-photo">';
//      photo += '<img src="' + value.caption.from.profile_picture + '" />';
//      photo += '<ul="comments">';
//      photo += '<p>' + value.caption.from.username + '</p>';
//      photo += '<i class="fa fa-heart"></i>' + value.likes.count + '';
//      photo += '<i class="fa fa-wechat"></i> ' +value.comments.count;
//      photo += '</ul>';
//      photo += '</div>';
//      photo += '</div>';
//      photo += '</div>';
//      photo += '</li>';
     
    
// }); 

// /*} else {
//             photo += '<p style="margin-top: 18px;">Sorry, hashtag not found.</p>';
//          }   */ 
        
//       $photoList.append(photo);  
       
//       })
//       // and if it fails...
//       .fail(function() {
//          $photoList.append('<li>Sorry! There was a problem, please try again.</li>');
//       });
//    });
// });


