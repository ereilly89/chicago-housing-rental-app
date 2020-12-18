async function edit_listing() {
    console.log("Edit Listing");

    var form = document.getElementById("listing_edit-form").elements;
    var errorMessage = document.getElementById("error-msg");
    console.log(form);

    // make post request
    fetch('https://rentalapp-297023.ue.r.appspot.com/listing/:listing_id/edit', {
      method: 'POST',
      body: JSON.stringify({
          name: form[0].value,
          description: form[1].value,
          /*img: form[3].value,*/
          neighborhood_cleansed: form[3].value,
          latitude: form[4].value,
          longitude: form[5].value,
          room_type: form[6].value,
          bathrooms: form[7].value,
          bedrooms: form[8].value,
          beds: form[9].value,
          price: form[10].value,
          id: form[12].value,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })

  .then(res => res.json())
  .then(json => {
      console.log(json);
      errorMessage.innerText = json.message;
      if(json.id){
        location.assign("/listing/"+id.value);
      }
  })
  .catch(err => console.error(err));
}
