var user = JSON.parse(localStorage.getItem("loggedInUser"))
console.log(user)
var database = firebase.database().ref("/");

// var eventName = document.getElementById("eventName");
// var date = document.getElementById("date");
// var description = document.getElementById("description");
// var container = document.getElementById("container")
//     // console.log(eventName, date, description, database)

// function submitFunc() {
//     var eventData = {
//             name: eventName.value,
//             date: date.value,
//             description: description.value
//         }
//         // console.log(eventData)
//     if (eventName.value !== "" && date.value !== "") {
//         database.child('event Data').push(eventData).then(function() {
//             alert("SuccessFully Send");
//             eventName.value = ""
//             date.value = ""
//             description.value = ""

//         });
//     } else {
//         alert("Please Enter Required Informations")
//     }
// }
database.child("event Data").on("child_added", function(snap) {
    var obj = snap.val()
        // console.log(obj.name)
    obj.key = snap.key
    console.log(obj.email)

    if (obj.email === user.email) {
        var panel = document.createElement("DIV")
        panel.setAttribute("class", "panel panel-primary")
        panel.setAttribute("id", obj.key)

        var panelhead = document.createElement("DIV")
        panelhead.setAttribute("class", "panel-heading")

        var collapse = document.createElement("div")
        collapse.setAttribute("id", "12" + obj.key)
        collapse.setAttribute("class", "panel-collapse collapse")

        var panelbody = document.createElement("DIV")
        panelbody.setAttribute("class", "panel-body")

        var panelfooter = document.createElement("DIV")
        panelfooter.setAttribute("class", "panel-footer")

        // Panel Head
        var h4 = document.createElement("h4");
        h4.setAttribute("class", "card-title")

        var a = document.createElement("a")
        a.setAttribute("data-toggle", "collapse")
        a.setAttribute("class", "panelhead")
        a.setAttribute("href", "#12" + obj.key)
        atext = document.createTextNode("Event Name: " + obj.Eventname.toUpperCase())
        a.appendChild(atext)
        h4.appendChild(a)
        panelhead.appendChild(h4)

        // Panel Body
        var p1 = document.createElement("P");
        p1.setAttribute("class", "card-text")
        p1text = document.createTextNode("Event Organizer: " + obj.name.toUpperCase());

        p1.appendChild(p1text)
        var p2 = document.createElement("P");
        p2.setAttribute("class", "card-text")
        p2text = document.createTextNode("Event Date: " + obj.date)
        p2.appendChild(p2text)
        var p3 = document.createElement("P");
        p3.setAttribute("class", "card-text")
        p3text = document.createTextNode("Event Description: " + obj.description)
        p3.appendChild(p3text)

        //panel footer
        var deleteBtn = document.createElement("button")
        var deleteBtntext = document.createTextNode("Delete")
        deleteBtn.appendChild(deleteBtntext)
        deleteBtn.onclick = function() {
            remove(obj.key)
        }
        var editBtn = document.createElement("button")
        var editBtntext = document.createTextNode("Edit")
        editBtn.appendChild(editBtntext)
        editBtn.onclick = function() {
            editTodo(obj.key, obj.Eventname, obj.name, obj.date, obj.place, obj.description)
        }

        deleteBtn.setAttribute("class", "btn btn-primary")
        editBtn.setAttribute("class", "btn btn-primary")


        panelbody.appendChild(p1)
        panelbody.appendChild(p2)
        panelbody.appendChild(p3)
        panelfooter.appendChild(editBtn)
        panelfooter.appendChild(deleteBtn)
        panel.appendChild(panelhead)
        collapse.appendChild(panelbody)
        collapse.appendChild(panelfooter)
        panel.appendChild(collapse)
        container.appendChild(panel)
    }


})

/// Edit event
function editTodo(key, Ename, name, date, place, description) {
    console.log(key, Ename, name, date, place, description)
    var neweventname = prompt('Edit Event Name', Ename);
    var neworganizername = prompt('Edit Organization Name', name);
    var newdate = prompt('Edit date 00/00/0000', date);
    var newplace = prompt('Edit place', place);
    var newdescription = prompt('Edit description', description);
    var newEventData = {
        Eventname: neweventname,
        name: neweventname,
        date: newdate,
        description: newdescription,
        place: newplace,
        email: user.email
    }

    if (newEventData !== '') { // check if the value is not empty
        var updates = {};
        updates[key] = newEventData;
        database.child("event Data").update(updates);
        location.reload("#")

    }

}

function remove(key) {
    database.child("event Data/" + key).remove();
}
database.child("event Data").on("child_removed", function(data) {
    var deleted = document.getElementById(data.key);
    deleted.remove();
    alert("Successfully Removed")
})

function signOutFunc() {
    window.location.replace("../index.html")
}