let event_attendees = [];
localStorage.getItem('event_attendees');
function updateLocalStorage () {
    localStorage.setItem('attendees', JSON.stringify(event_attendees));
}


function addAttendee () {
    let attendeeInput = document.getElementById('enter-add-name');
    let name = attendeeInput.value.trim().toUpperCase();
    let regexp = /^[a-zA-Z ]*$/;
    if(event_attendees.includes(name)) {
        alert('participant already registered');
    }else if (name == '') {
        alert('name cannot be empty')
    }else if (!regexp.test(name)) {
        alert('special characters or symbols not accepted')
    }else {
       let new_attendee = name
       event_attendees.push(new_attendee);
       alert('successfully added');
       updateLocalStorage();
        attendeeInput.value = ''
    }
}


let searchAttendee = function() {
    let attendeeInput = document.getElementById('enter-search-name');
    let attendee_name = attendeeInput.value.trim().toUpperCase()
    let regexp = /^[a-zA-Z ]*$/;
    if(attendee_name == '') {
        alert('enter your name')
    }else if (!regexp.test(attendee_name)) {
        alert('special characters or symbols not accepted')
    }else {
        if(event_attendees.includes(attendee_name)) {
            document.getElementById('search-result').innerHTML = `${attendee_name} has fully registered for this event`
            attendeeInput.value = ''

        }else {
            alert(`${attendee_name} was not found`)
            updateLocalStorage();           
        }
    }

}

let displayAttendees = function() {
    let lists = `<ul id="lists">`
    event_attendees.forEach((participant) => {
        lists+=`<li>${participant} </li>`
    });
    lists+=`</ul>`
    document.getElementById('display-result').innerHTML = lists
}

let removeAttendee = function() {
    let attendeeInput = document.getElementById('enter-remove-name');
    let name = attendeeInput.value.trim().toUpperCase();
    let index = event_attendees.indexOf(name);
    if(index < 0) {
        alert('Participant not in the list')
    }else{
        event_attendees.splice(index, 1)
        alert(`${name} has been removed and is no longer fit to participate in this event`)
    }
}