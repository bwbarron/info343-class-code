"use strict";

document.addEventListener("DOMContentLoaded", function () {
    function addStates(states, listElement) {
        listElement.innerHTML = "";
        states.forEach(function(state) {
            var li = document.createElement("li");
            li.textContent = state.name;
            listElement.appendChild(li);
        });
    }

    var statesList = document.getElementById("states-list")
    addStates(usaStates, statesList);

    document.getElementById("state-filter-field").addEventListener("keyup", function() {
        var filter = this.value;
        var filteredStates = usaStates.filter(function(state) {
            return state.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        });
        addStates(filteredStates, statesList);
    });
});