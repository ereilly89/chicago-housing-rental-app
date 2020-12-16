
addEventListeners();

function addEventListeners() {

    //Sign in form listener***********************************
    const signin_form = document.querySelector('#signin-form');
    const tenantSelect = document.getElementById("tenant-radio");

    if (signin_form != null) {

        signin_form.addEventListener('submit', (event) => {

            // disable default action
            event.preventDefault();

            //Sign in as tenant
            if (tenantSelect.checked) {
                signInTenant();

            //Sign in as host
            } else {
                signInHost();
            }
        });
    }

    //Tenant sign up form listener********************************
    const t_signup_form = document.querySelector('#t-signup-form');

    if (t_signup_form != null) {

        t_signup_form.addEventListener('submit', (event) => {

            // disable default action
            event.preventDefault();
            signUpTenant();
        });
    }

    //Host sign up form listener**********************************
    const h_signup_form = document.querySelector('#h-signup-form');

    if (h_signup_form != null) {

        h_signup_form.addEventListener('submit', (event) => {

            // disable default action
            event.preventDefault();
            signUpHost();
        });
    }
}



//********Sign-In **************************************************************

async function signInTenant() {
    // get form contents
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    var errorMessage = document.getElementById("signin-error");

    // make post request
    fetch('http://localhost:3000/tenant/signin', {
        method: 'POST',
        body: JSON.stringify({
            "tenant_id": username.value,
            "password": password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        errorMessage.innerText = json.message;
        if(json.user) {
            location.assign("/listings");
        }
    })
    .catch(err => console.error(err));
}


async function signInHost() {
    // get form contents
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const tenantSelect = document.getElementById("tenant-radio");

    var errorMessage = document.getElementById("signin-error");

    // make post request
    fetch('http://localhost:3000/host/signin', {
        method: 'POST',
        body: JSON.stringify({
            "host_id": username.value,
            "password": password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        errorMessage.innerText = json.message;
        if (json.user) {
            location.assign("/listings");
        }
    })
    .catch(err => console.error(err));
}


//********Sign-Up **************************************************************

async function signUpTenant() {
    //get form contents
    const username = document.getElementById("username");
    const tenant_phone = document.getElementById("tenant_phone");
    const first = document.getElementById("first");
    const last = document.getElementById("last");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");

    var errorMessage = document.getElementById("t-signup-error");

    // make post request
    fetch('http://localhost:3000/tenant/signup', {
        method: 'POST',
        body: JSON.stringify({
            "tenant_id": username.value,
            "tenant_phone": tenant_phone.value,
            "first": first.value,
            "last": last.value,
            "password1": password1.value,
            "password2": password2.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json()
    })
    .then(json => {
        console.log(json);
        if (json.user) {
            location.assign("/listings");
        } else {
            errorMessage.innerText = json.message;
        }
    })
    .catch(err => console.error(err));
}


async function signUpHost() {
    //get form contents
    const username = document.getElementById("username");
    const host_name = document.getElementById("host_name");
    const host_phone = document.getElementById("host_phone");
    const host_about = document.getElementById("host_about");
    const host_neighborhood = document.getElementById("host_neighborhood");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const today = new Date();
    const host_since = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()

    var errorMessage = document.getElementById("h-signup-error");

    // make post request
    fetch('http://localhost:3000/host/signup', {
        method: 'POST',
        body: JSON.stringify({
            "host_id": username.value,
            "host_name": host_name.value,
            "host_phone": host_phone.value,
            "host_about": host_about.value,
            "host_since": host_since,
            "host_neighbourhood": host_neighborhood.value,
            "host_listings_count": 0,
            "password1": password1.value,
            "password2": password2.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json()
    })
    .then(json => {
        console.log(json);
        if (json.user) {
            location.assign("/listings");
        } else {
            errorMessage.innerText = json.message;
        }
    })
    .catch(err => console.error(err));
}
