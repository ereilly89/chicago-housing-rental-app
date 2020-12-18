async function edit_host_profile() {
    console.log("Edit Profile");

    var form = document.getElementById("edit_profile-form").elements;
    var errorMessage = document.getElementById("h-profile-edit-error");
    console.log(form);

    // make post request
    fetch('https://rentalapp-297023.ue.r.appspot.com/profile/host/:host_id/edit_profile', {
        method: 'POST',
        body: JSON.stringify({
            host_name: form[0].value,
            host_about: form[1].value,
            host_phone: form[2].value,
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
        if(json.host_id){
          location.assign("/profile/host/"+host_id.value);
        }
    })
    .catch(err => console.error(err));
}

async function edit_tenant_profile() {
    console.log("Edit Profile");

    var form = document.getElementById("edit_profile-form").elements;
    var errorMessage = document.getElementById("t-profile-edit-error");
    console.log(form);

    // make post request
    fetch('https://rentalapp-297023.ue.r.appspot.com/profile/tenant/:tenant_id/edit_profile', {
        method: 'POST',
        body: JSON.stringify({
            tenant_first: form[0].value,
            tenant_last: form[1].value,
            tenant_phone: form[2].value,
            tenant_id: form[4].value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        errorMessage.innerText = json.message;
        if(json.tenant_id){
          location.assign("/profile/tenant/"+tenant_id.value);
        }
    })
    .catch(err => console.error(err));

}
