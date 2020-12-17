async function edit_host_profile() {
    console.log("Edit Profile");

    var form = document.getElementById("edit_profile-form").elements;
    var errorMessage = document.getElementById("error-msg");
    console.log(form);

    // make post request
    fetch('http://localhost:3000/profile/host/:host_id/edit_profile', {
        method: 'POST',
        body: JSON.stringify({
            host_name: form[0].value,
            host_about: form[1].value,
            host_location: form[2].value,
            host_neighborhood: form[3].value,
            host_id: form[5].value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        errorMessage.innerText = json.message;
    })
    .catch(err => console.error(err));
}

async function edit_tenant_profile() {
    console.log("Edit Profile");

    var form = document.getElementById("edit_profile-form").elements;
    var errorMessage = document.getElementById("error-msg");
    console.log(form);

    // make post request
    fetch('http://localhost:3000/profile/tenant/:tenant_id/edit_profile', {
        method: 'POST',
        body: JSON.stringify({
            tenant_first: form[0].value,
            tenant_last: form[1].value,
            tenant_id: form[3].value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        errorMessage.innerText = json.message;
    })
    .catch(err => console.error(err));
}
