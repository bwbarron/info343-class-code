// script for index.html

Parse.initialize("gEp15mUlnA8xNOZDmuxKqSD0eEYNuNrdT1sZ7prT", "R8mX254MS70DE7XzJ4j0wvsV3CFglVlG419bXyz8");
// jessie's
//Parse.initialize("eU9YJ9oNpzfeEondOnXdFr7ZkyrpwA7l3zeIEyjl", "YphdeeP7rTbVupkSiWU50nWPFfqtioi52yG74roA");


$(function() {
    "use strict";

    // new Task "class" for parse
    var Task = Parse.Object.extend("Task");
    // new query that will return all tasks ordered by their createdAt field
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending("createdAt");

    var tasksList = $("#tasks-list");
    var errorMessage = $("#error-message");
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function hideError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $(".fa-spin").show();
    }

    function hideSpinner() {
        $(".fa-spin").hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onDataReturn, displayError)
            .always(hideSpinner());
    }

    function onDataReturn(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement("li"))
                .text(task.get("title"))
                .appendTo(tasksList);
        });
    }

    $("#new-task-form").submit(function(event) {
        event.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set("title", title);
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val("");
        });

        return false;
    });

    fetchTasks();

    window.setInterval(fetchTasks, 3000);
});