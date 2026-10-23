"use strict";

let tasks = [];     // Array to store tasks
let currentFilter = "all"; // Default filter is "all"   

function addTask()
{
   
    const inputfield = document.getElementById("textinput") ;   // Get the input field element
    const inputt = inputfield.value;    // Get the value of the input field

    if (inputt === "") return; // check if the input is empty, if so, return and do nothing

   // Add the new task to the tasks array with default properties
    tasks.push({ text: inputt  , completed: false  , Active: true });

    render();
   
     inputfield.value = "";  // Clear the input field after adding the task
}

function render()
{
    const list = document.getElementById("list"); // Get the list element where tasks will be displayed
   list.innerHTML = ""; // Clear the list before rendering new tasks
    for (let i = 0 ; i < tasks.length; i++) 
    {
         // Skip tasks that are not completed when the filter is set to "completed"
         if (currentFilter === "completed" && !tasks[i].completed) continue;

         // Skip tasks that are completed when the filter is set to "active"
         if (currentFilter === "active" && tasks[i].completed) continue;

        const p = document.createElement('p');  // Create a new paragraph element for each task
        p.style.display = "flex";  // Use flexbox for layout
        p.style.alignItems = "center";  // Center items vertically

         const textSpan = document.createElement('span');   // Create a span element to hold the task text
        textSpan.textContent = tasks[i].text; // Set the text content of the span to the task text
        textSpan.style.flex = "1";           // Make the text span take up the remaining space
        p.appendChild(textSpan);            // Append the text span to the paragraph

        const completedButton = document.createElement('button'); 

        if (tasks[i].completed) {completedButton.textContent = "Completed" ; completedButton.style.color = "green" ;}
        else {completedButton.textContent = "Mark as Completed" ; completedButton.style.color = "red" ;}

        completedButton.addEventListener("click", function() {
            tasks[i].completed = !tasks[i].completed; // Toggle the completed status
            render(); // Re-render the list
        });
        p.appendChild(completedButton); 
      
        completedButton.style.marginLeft = "200px";

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Remove";
        deleteButton.style.marginLeft = "100px"; // Add some space between the task and the delete button
        deleteButton.addEventListener("click", function() {
            tasks.splice(i, 1); // Remove the task from the array
            render(); // Re-render the list
        });

        p.appendChild(deleteButton);
        list.appendChild(p); 
    }
        
        
    
}


const button = document.getElementById("input")
button.addEventListener("click" , addTask);

const clear_button = document.getElementById("clear");
clear_button.addEventListener("click", function() {
    tasks = []; // Clear the tasks array
    render(); // Re-render the list
});

const All_button = document.getElementById("All");
All_button.addEventListener("click", function() {
    currentFilter = "all"; // Set the filter to "all"
    render(); // Show all tasks
});

const Completed_button = document.getElementById("Completed");
Completed_button.addEventListener("click", function() {
   currentFilter = "completed"; // Set the filter to "completed"
    render(); 
});

const Active_button = document.getElementById("Active");
Active_button.addEventListener("click", function() {
 currentFilter = "active"; // Set the filter to "active"
    render(); 
});
