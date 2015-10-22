// script for index.html

Parse.initialize("gEp15mUlnA8xNOZDmuxKqSD0eEYNuNrdT1sZ7prT", "R8mX254MS70DE7XzJ4j0wvsV3CFglVlG419bXyz8");
// jessie's parse.com keys
//Parse.initialize("eU9YJ9oNpzfeEondOnXdFr7ZkyrpwA7l3zeIEyjl", "YphdeeP7rTbVupkSiWU50nWPFfqtioi52yG74roA");


$(function() {
    "use strict";

    // new Task "class" for parse
    var Task = Parse.Object.extend("Task");
    // new query that will return all tasks ordered by their createdAt field
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending("createdAt");
    tasksQuery.notEqualTo("done", true);

    var tasksList = $("#tasks-list");
    var errorMessage = $("#error-message");
    var tasks = [];
    var ratingElement = $("#rating");

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
            var li = $(document.createElement("li"))
                .text(task.get("title"))
                .addClass(task.get("done") ? "completed-task" : "")
                .appendTo(tasksList)
                .click(function() {
                    task.set("done", !task.get("done"));
                    task.save().then(renderTasks, displayError);
                });

            $(document.createElement("span"))
                .raty({
                        readOnly: true,
                        score: (task.get("rating") || 0),
                        hints: ["crap", "awful", "ok", "nice", "awesome"]
                    })
                .appendTo(li);
        });
    }

    function showMessage(message) {
        // boolean operations like this can be used for setting defaults
        // depends on truthy or falsey values
        alert(message || "Hello");
    }

    //showMessage(); // this would cause an alert with "Hello" to appear

    $("#new-task-form").submit(function(event) {
        event.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set("title", title);
        task.set("rating", ratingElement.raty("score"));
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val("");
                ratingElement.raty("set", {});
            });

        return false;
    });

    fetchTasks();

    ratingElement.raty();

    window.setInterval(fetchTasks, 3000);
});