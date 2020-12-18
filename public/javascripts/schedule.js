addEventListeners();


function addEventListeners() {
    const form = document.querySelector('#scheduleBooking-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createBooking();
    })

    var date_start = document.getElementById("datepicker_start");
    var date_end = document.getElementById("datepicker_end");
    console.log("adding event listeners...");
    $("#datepicker_start").on('change', (event) => {
       
        console.log("date start changed");
        var form = document.getElementById("scheduleBooking-form").elements;
        var errorMessage = document.getElementById("booking-error");

        var date_s = form[2].value.split("/");
        var m1 = Number(date_s[0])-1;
        var y1 = Number(date_s[2]);
        var d1 = Number(date_s[1]);
        if (date_s.length == 3) {
            dateStart = new Date(y1, m1, d1);
        } else {
            dateStart = null;
        }

        var date_e = form[3].value.split("/");
        var m2 = Number(date_e[0])-1;
        var y2 = Number(date_e[2]);
        var d2 = Number(date_e[1]);
        if (date_e.length == 3) {
            dateEnd = new Date(y2, m2, d2);
        } else {
            dateEnd = null;
        }

        var days = 0;
        if (dateStart != null && dateEnd != null) {
            if (dateStart > dateEnd) {
                let date1 = dateStart;
                let date2 = dateEnd;
                days = daysDiff(date1, date2);
                console.log(days);
            } 
        }

        var price = Number(document.getElementById("price").value);
        var totalPrice = document.getElementById("totalPrice");

        totalPrice.innerHTML = "$" + days*price;
        
        
    })

    $("#datepicker_end").on('change', (event) => {
        console.log("date end changed.");
        var form = document.getElementById("scheduleBooking-form").elements;
        var errorMessage = document.getElementById("booking-error");

        var date_s = form[2].value.split("/");
        var m1 = Number(date_s[0])-1;
        var y1 = Number(date_s[2]);
        var d1 = Number(date_s[1]);
        if (date_s.length == 3) {
            dateStart = new Date(y1, m1, d1);
        } else {
            dateStart = null;
        }

        var date_e = form[3].value.split("/");
        var m2 = Number(date_e[0])-1;
        var y2 = Number(date_e[2]);
        var d2 = Number(date_e[1]);
        if (date_e.length == 3) {
            dateEnd = new Date(y2, m2, d2);
        } else {
            dateEnd = null;
        }

        var days = 0;
        if (dateStart != null && dateEnd != null) {
            let date1 = dateStart;
            let date2 = dateEnd;
            days = daysDiff(date1, date2);
            console.log(days);
        }

        var price = Number(document.getElementById("price").value);
        var totalPrice = document.getElementById("totalPrice");
        
        totalPrice.innerHTML = "$" + days*price;
        

    })

    //$("input").on('click', (event) => {
    //}



}

function secondsDiff(d1, d2) {
    let millisecondDiff = d2 - d1;
    let secDiff = Math.floor( ( d2 - d1) / 1000 );
    return secDiff;
 }
 
function minutesDiff(d1, d2) {
    let seconds = secondsDiff(d1, d2);
    let minutesDiff = Math.floor( seconds / 60 );
    return minutesDiff;
}

function hoursDiff(d1, d2) {
    let minutes = minutesDiff(d1, d2);
    let hoursDiff = Math.floor( minutes / 60 );
    return hoursDiff;
}

function daysDiff(d1, d2) {
    let hours = hoursDiff(d1, d2);
    let daysDiff = Math.floor( hours / 24 );
    return daysDiff;
}


async function createBooking() {
    var form = document.getElementById("scheduleBooking-form").elements;
    var errorMessage = document.getElementById("booking-error");
    console.log(form);
    var today = new Date();

    var date_s = form[2].value.split("/");
    console.log(date_s);
    var m1 = Number(date_s[0])-1;
    var y1 = Number(date_s[2]);
    var d1 = Number(date_s[1]);
    if (date_s.length == 3) {
        dateStart = new Date(y1, m1, d1);
    } else {
        dateStart = null;
    }

    var date_e = form[3].value.split("/");
    var m2 = Number(date_e[0])-1;
    var y2 = Number(date_e[2]);
    var d2 = Number(date_e[1]);
    if (date_e.length == 3) {
        dateEnd = new Date(y2, m2, d2);
    } else {
        dateEnd = null;
    }

    var days = 0;
    if (dateStart != null && dateEnd != null) {
        let date1 = dateStart;
        let date2 = dateEnd;
        days = daysDiff(date1, date2);
        console.log(days);
    }

    var price = Number(document.getElementById("price").value);
    console.log("total: " + days*price);

    var totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = "$" + days*price;

    // make post request
    fetch('https://rentalapp-297023.ue.r.appspot.com/booking/' + form[0].value, {
        method: 'POST',
        body: JSON.stringify({
            listing_id: form[0].value,
            tenant_id: form[1].value,
            schedule_date: today,
            date_start: dateStart,
            date_end:  dateEnd,
            days: days
            
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        errorMessage.innerHTML = json.message;
        if (json.booking) {
            //location.assign("/booking/" + json.booking.listing_id + "/payment");
            location.assign("/profile/tenant/" + json.booking.tenant_id + "/bookings");
        }
    })
    .catch(err => console.error(err));
}

async function deleteBooking() {
    // make post request
    fetch('https://rentalapp-297023.ue.r.appspot.com/booking/' + form[0].value, {
        method: 'DELETE',
        body: JSON.stringify({
            listing_id: form[0].value,
            tenant_id: form[1].value,
            schedule_date: today,
            date_start: dateStart,
            date_end:  dateEnd,
            days: days
            
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        errorMessage.innerHTML = json.message;
        if (json.booking) {
            //location.assign("/booking/" + json.booking.listing_id + "/payment");
            location.assign("/profile/tenant/" + json.booking.tenant_id + "/bookings");
        }
    })
    .catch(err => console.error(err));
}