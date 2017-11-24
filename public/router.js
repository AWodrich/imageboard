//HERE COMES THE FRONT END ROUTING


angular.module('app.routes', ['ui.router', 'myApp'])

  .config(function($stateProvider) {
      $stateProvider
          .state('home', {
              url: '/',
              views: {
                  'main': {
                      templateUrl: 'views/home.html'
                  }
              }
          })

          .state('singleImage', {
              url: '/image/:imageId',
              views: {
                  'main': {
                      templateUrl: 'views/singleImage.html'
                  }
              },
              controller: 'viewImageDetails'

            //   controller: 'ViewController'
          })
  });

  // console.log('module', angular.module('app.routes', ['ui.router']));






// angular.module('app.routing', [])
//     .service('serviceHttp', function($http){
//         this.getArticles = function(){
//             return $http.get('http://localhost:8080/articles')
//             .then(
//                 function(result){ return result },
//                 function() { alert("Error: No data returned") }
//             );
//         }
// });
