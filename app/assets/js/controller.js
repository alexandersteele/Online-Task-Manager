var myApp = angular.module("myApp", ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap']);

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

myApp.controller('indexCtrl', function ($scope, tasks, $alert, $http) {
    $http.get('http://127.0.0.1:5000/tasks').then(function(result){
       $scope.tasks = result.data;
   }), function(){
       window.alert('There was an error!');
   }; 
    //$scope.contacts = contacts.get();

});

myApp.controller('taskCtrl', function ($scope, $routeParams, tasks) {
    $scope.task = tasks.find($routeParams.id);
});

myApp.controller('addTaskCtrl', function ($scope, tasks) {
    $scope.submit = function(){
       tasks.create($scope.task);
       $scope.task = null;
       $scope.added = true;
}; 
});

myApp.factory('tasks', function () {
    var tasks = [
        {
            owner: 'Alex',
            title: 'Mow lawn',
            task: 'Mow all of the local lawns',
            completed: 'false'
        },
        {
            owner: 'Alex',
            title: 'Mow lawn',
            task: 'Mow all of the local lawns',
            completed: 'false'
        }
    ];

    return {
        get: function () {
            return tasks;
        },
        find: function (index) {
            return tasks[index];
        },
        create: function (task) {
            tasks.push(task);
        }
    };
})
