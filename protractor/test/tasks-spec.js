/* Test script for the Tasks List app */

describe("the tasks app", function () {
    var taskTitleInp = element(by.model("newTask.title"));
    var addTaskButton = element(by.buttonText("Add Task"));
    var tasksList = element.all(by.repeater("task in tasks"));
    var requiredMsg = $(".title-required-error");

    beforeEach(function () {
        browser.get("http://localhost:8000");
    });

    it("must have the proper page title", function () {
        expect(browser.getTitle()).toEqual("My Tasks");
    });

    it("must add a task", function () {
        var title = "Learn Protractor";
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it("must add a task after hitting enter", function () {
        var title = "Learn Protractor";
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it("must clear the title after adding", function () {
        addTask("box should be cleared");
        expect(taskTitleInp.getAttribute("value")).toEqual("");
    });

    it("must add multiple tasks", function () {
        var num = 20;
        addMultipleTasks(num);
        expect(tasksList.count()).toEqual(num);
    });

    it("must show required validation error", function () {
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys("abc");
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys("abc");
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it("must disable button when task title blank", function () {
        expect(addTaskButton.getAttribute("disabled")).toEqual("true");
        taskTitleInp.sendKeys("abc");
        expect(addTaskButton.getAttribute("disabled")).toBe(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys("       ");
        expect(addTaskButton.getAttribute("disabled")).toEqual("true");
    });

    it("must toggles done with click", function () {
        addTask("test style class");
        addTask("not marked as done");
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute("class")).toContain("completed-task");
        expect(tasksList.get(1).getAttribute("class")).not.toContain("completed-task");
    });

    it("must purge completed tasks", function () {
        addTask("Task 1");
        addTask("Task 2");
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText("Purge Completed Tasks")).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual("Task 2");
    });

    function addTask(title) {
        taskTitleInp.sendKeys(title);
        addTaskButton.click();
    }

    function addMultipleTasks(n) {
        for(var i = 0; i < n; i++) {
            addTask("Task " + i);
        }
    }
});