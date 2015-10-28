angular.module("Tasks", [])
    .constant("tasksKey", "tasks")
    .controller("TasksController", function ($scope, tasksKey) {
        "use strict";

        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        $scope.newTask = {};

        $scope.addTask = function() {
            $scope.tasks.push($scope.newTask);
            saveTasks();
            $scope.newTask = {};
        };

        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }
    });