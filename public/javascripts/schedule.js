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
    console.log(form[0].value);
    // make post request
    fetch('http://localhost:3000/booking/' + form[0].value, {
        method: 'POST',
        body: JSON.stringify({
            listing_id: form[0].value,
            tenant_id: form[1].value,
            date_start: form[2].value,
            date_end: form[3].value,
            schedule_date: today.getMonth() + "/" + today.getDay() + "/" + today.getYear()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        if (json.tenant_id) {
            location.assign("/profile/tenant/" + json.tenant_id + "/bookings");
        }
        
    })
    .catch(err => console.error(err));
}