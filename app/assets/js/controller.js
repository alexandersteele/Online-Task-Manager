var myApp = angular.module("myApp", ['ngRoute', 'ngSanitize', 'ngResource', 'mgcrea.ngStrap']);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'indexCtrl',
        templateUrl: '/partials/index.html'
    });

    $routeProvider.when('/task/:id', {
        controller: 'taskCtrl',
        templateUrl: '/partials/task.html'
    });

    $routeProvider.when('/add-task', {
        controller: 'addTaskCtrl',
        templateUrl: '/partials/add.html'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

})

myApp.controller('indexCtrl', function ($scope, tasks, $alert) {

    $scope.tasks = tasks.get();

});

myApp.controller('taskCtrl', function ($scope, $routeParams, tasks) {
    var response = tasks.find($routeParams.id)
    response.$promise.then(function onSuccess(data) {
            // access data from 'response'
            $scope.task = data[0];
        },
        function onFail(data) {
            // handle failure
        });
});

myApp.controller('addTaskCtrl', function ($scope, tasks) {
    $scope.submit = function () {
        $scope.task.$save();
        $scope.task = tasks.create();
    };

    $scope.task = tasks.create();
});

myApp.factory('tasks', function ($resource) {

    var resource = $resource('http://localhost:5000/tasks/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
    return {
        get: function () {
            return resource.query();
        },
        find: function (id) {
            return $resource('http://localhost:5000/task/:id').query({
                id: id
            });
        },
        create: function () {
            return new resource();
        }
    };


})

myApp.directive('editable', function () {
    return {
        restrict: 'A',
        templateUrl: '/partials/editable.html',
        scope: {
            value: '=editable',
            field: '@fieldType'
        },
        controller: function ($scope) {
            $scope.editor = {
                showing: false,
                value: $scope.value
            };

            $scope.toggleEditor = function () {
                $scope.editor.showing = !$scope.editor.showing;
            };

            $scope.field = ($scope.field) ? $scope.field : 'text';

            $scope.save = function () {
                $scope.value = $scope.editor.value;
                $scope.toggleEditor();
            };
        }
    };
})
