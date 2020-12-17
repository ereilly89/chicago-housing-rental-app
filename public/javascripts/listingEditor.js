async function edit_listing() {
    console.log("Edit Listing");

    var form = document.getElementById("listing_edit-form").elements;
    var errorMessage = document.getElementById("error-msg");
    console.log(form);

    // make post request
    fetch('http://localhost:3000/listing/:listing_id/edit', {
      method: 'POST',
      body: JSON.stringify({
          name: form[0].value,
          description: form[1].value,
          neighborhood_overview: form[2].value,
          /*img: form[3].value,*/
          neighborhood_cleansed: form[4].value,
          latitude: form[5].value,
          longitude: form[6].value,
          room_type: form[7].value,
          bathrooms: form[8].value,
          bedrooms: form[9].value,
          beds: form[10].value,
          price: form[11].value,
          id: form[13].value,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })

  .then(res => res.json())
  .then(json => {
      console.log(json);
      errorMessage.innerText = json.message;
      if(json.host_id) {
          location.assign("/profile/host/" + json.host_id + "/listings");
      }
  })
  .catch(err => console.error(err));
}
