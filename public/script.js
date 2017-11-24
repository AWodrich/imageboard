//  Browser Side!!

(function() {
    //only one object, that connects to the view
    //in the html document make sure to insert ng-app='MyApp'
    // angular module with the name i gave it to, 'myApp'

    // Dependency injection
    // giving a function an object
    //
    var myApp = angular.module('myApp', ['app.routes', 'ui.router']);

    // declaring the controllers
    // it takes a name and a function.
    // we are looking to connect model and view.
    // this is the controller for the view.
    // connect to the html => ng-controller
    // $scope is an object. all services start with an $
    myApp.controller('imageList', ($scope, $http, $timeout) => {
        $http.get('/images')
            .then(res => {
                console.log('getting images?', res);
                $scope.message='getting images';
                $scope.images = res.data;

                // where comes the data????
            })
    })

    myApp.controller('uploadImages', ($scope, $http) => {
        $scope.file = {};
        $scope.submit = (() => {
            var file = $('input[type="file"]').get(0).files[0];
            // console.log('==================running submit, file', file);
            var formData = new FormData();
            formData.append('file', file);
            formData.append('title', $scope.title)
            formData.append('user', $scope.user)
            formData.append('description', $scope.description)
    // AJAX REQUEST IN ANGULAR
            $http({
                url: '/upload',
                method: 'POST',
                data: formData,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            })
                .then(() => {
                    console.log('===============formdata??', formData);
                    console.log('it worked');
                })
        })
    });

    myApp.controller('viewImageDetails', ($scope, $stateParams, $http) => {
        console.log("image Id", $stateParams.imageId);;

        $http({
            url:`/image/${$stateParams.imageId}`,
            method: 'GET'
        })
            .then(res => {
                console.log('what is the result here???', res);
                console.log('on front end side, getting details', res.data.title, res.data.image, res.data.description);
                $scope.title = res.data.title;
                $scope.description = res.data.description;
                $scope.imageSrc = res.data.image;
            })
    });

    myApp.controller('submitComments', ($scope, $stateParams) => {
        $scope.submit = (() => {
            console.log('in submit comments section front end side now?');
            console.log('scope object after submit comment', $scope);
            console.log('state params after submit comment', $stateParams);

            // var file = $('input[type="file"]').get(0).files[0];
            // // console.log('==================running submit, file', file);
            // var formData = new FormData();
            // formData.append('file', file);
            // formData.append('title', $scope.title)
            // formData.append('user', $scope.user)
            // formData.append('description', $scope.description)
        });
    })
})();



// $state.params

//

// AJAX REQUEST

    // $.ajax({
    //     url: '/upload',
    //     method:'POST',
    //     data: formData,
    //     processData: false,
    //     contentType: false
    // });
    //it is important to set processData and contentType to false when uploading images.
    // myApp.controller('cityList', ($scope, $http) => {
    //     $scope.cities = [
    //         {
    //             name: 'Berlin',
    //             country: 'Germany'
    //         },
    //         {
    //             name: 'London',
    //             country: 'England'
    //         }
    //     ];
    //
    //     // $http.get('/cities').then(res => {
    //     //     $scope.cities = res.data;
    //     //     console.log($scope.cities);
    //     // }
    // });
