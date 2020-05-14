//reference to the ul with id "task-list"
const taskList = document.querySelector("#task-list");
//refernce to the form element with id "task-form"
const taskForm = document.querySelector("#task-form");


//function for rendering the input values and the x (delete) button
renderTasks = (doc) => {
    let li = document.createElement("li");
    let task = document.createElement("span");
    let x = document.createElement("div");

    //setting attributes=document id from the db (doc.id)
    li.setAttribute("data-id", doc.id);
    task.textContent = doc.data().task;
    x.textContent = "x";

    //appending elements

    li.appendChild(task);
    li.appendChild(x);
    taskList.appendChild(li);
}

//getting data
//snapshot represents data inside the collection
//forEach represents all documents inside the collection
db.collection("tasks").get().then((snapshot) => {
    snapshot.forEach(doc => {
        renderTasks(doc);
    })
})

//saving data in to the db
taskForm.addEventListener("submit", (event) => {
    event.preventDefault(); //this prevents defaulr reloading upon clicking the submit button
    db.collection("tasks").add({ //add method takes an objects as a parameter, this object is documents inside the db collection
        task: taskForm.task.value //reference to the html form=>task input field, takes it's value

    });
    //empty the input field after clicking the button
    taskForm.task.value = " ";
})

//deleting data