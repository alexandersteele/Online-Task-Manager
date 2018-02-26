var app = angular.module('app', [])
  app.controller('PostsCtrl', function ($scope) {
    $scope.posts = [
      {
        username: 'dickeyxxx',
        body: 'Node rules!'
      },
      {
        username: 'jeffdickey',
        body: 'trying out angular.js...'
      }
    ]
    $scope.addPost = function () {
      // Only add a post if there is a body
      if ($scope.postBody) {
        $scope.posts.unshift({
          username: 'dickeyxxx',
          body: $scope.postBody
        })
        $scope.postBody = null
      }
    }
  })
