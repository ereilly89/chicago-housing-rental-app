addEventListeners();

function addEventListeners() {
    const form = document.querySelector('#scheduleBooking-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createBooking();
    })
}

async function createBooking() {
    var form = document.getElementById("scheduleBooking-form").elements;
    var errorMessage = document.getElementById("booking-error");
    console.log(form);
    var today = new Date();
   
    var dateStart = null;
    var dateEnd = null;

    var date_s = form[2].value.split("/");
    var m1 = Number(date_s[0])-1;
    var y1 = Number(date_s[2]);
    var d1 = Number(date_s[1]);
    if (date_s.length == 3) {
        dateStart = new Date(y1, m1, d1, 0, 0, 0, 0);
    } else {
        dateStart = "";
    }

    var date_e = form[3].value.split("/");
    var m2 = Number(date_e[0])-1;
    var y2 = Number(date_e[2]);
    var d2 = Number(date_e[1]);
    if (date_e.length == 3) {
        console.log("changed dateend");
        dateEnd = new Date(y2, m2, d2, 0, 0, 0, 0);
    } else {
        dateEnd = "";
    }
    

    // make post request
    fetch('http://localhost:3000/booking/' + form[0].value, {
        method: 'POST',
        body: JSON.stringify({
            listing_id: form[0].value,
            tenant_id: form[1].value,
            schedule_date: today,
            date_start: dateStart,
            date_end:  dateEnd
            
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        errorMessage.innerHTML = json.message;
        if (json.tenant_id) {
            location.assign("/profile/tenant/" + json.tenant_id + "/bookings");
        }
        
    })
    .catch(err => console.error(err));
}