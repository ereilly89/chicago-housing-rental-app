

async function createListing() {
    console.log("create listing");

    var form = document.getElementById("createListing-form").elements;
    var errorMessage = document.getElementById("error-msg");
    var photo = document.getElementById("file");
    console.log("PHOTO:"+photo.files[0]);
    console.log(form);
    console.log(form[3]);
    console.log(photo);

    var fd = new FormData();
    console.log(photo.files[0])

    // make post request
    fetch('http://localhost:3000/listing/create', {
        method: 'POST',
        body: JSON.stringify({
            name: form[0].value,
            description: form[1].value,
            neighborhood_cleansed: form[3].value,
            latitude: form[4].value,
            longitude: form[5].value,
            room_type: form[6].value,
            bathrooms: form[7].value,
            bedrooms: form[8].value,
            beds: form[9].value,
            price: form[10].value,
            host_id: form[13].value,
            host_name: form[14].value,
            host_since: form[15].value,
            number_of_reviews: 0,
            review_scores_rating: 100,
            
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


function getFeatures() {

    var neighborhoodArray = ['Albany Park', 'Archer Heights', 'Armour Square', 'Ashburn', 'Auburn Gresham', 'Austin', 'Avalon Park', 'Avondale', 'Belmont Cragin', 'Beverly', 'Bridgeport', 'Brighton Park', 'Burnside', 'Calumet Heights', 'Chatham', 'Chicago Lawn', 'Clearing', 'Douglas', 'Dunning', 'East Garfield Park', 'East Side', 'Edgewater', 'Edison Park', 'Englewood', 'Forest Glen', 'Fuller Park', 'Gage Park', 'Garfield Ridge', 'Grand Boulevard', 'Greater Grand Crossing', 'Hegewisch', 'Hermosa', 'Humboldt Park', 'Hyde Park', 'Irving Park', 'Jefferson Park', 'Kenwood', 'Lake View', 'Lincoln Park', 'Lincoln Square', 'Logan Square', 'Loop', 'Lower West Side', 'Mckinley Park', 'Montclare', 'Morgan Park', 'Mount Greenwood', 'Near North Side', 'Near South Side', 'Near West Side', 'New City', 'North Center', 'North Lawndale', 'North Park', 'Norwood Park', 'Oakland', 'Ohare', 'Portage Park', 'Pullman', 'Riverdale', 'Rogers Park', 'Roseland', 'South Chicago', 'South Deering', 'South Lawndale', 'South Shore', 'Uptown', 'Washington Heights', 'Washington Park', 'West Elsdon', 'West Englewood', 'West Garfield Park', 'West Lawn', 'West Pullman', 'West Ridge', 'West Town', 'Woodlawn']
    var roomTypeArray = ['Entire home/apt', 'Hotel room', 'Private room', 'Shared room']

    var instanceArray = new Array(1);
    var featureArray = new Array(86);

    featureArray[0] = createListingForm.latitude.value;
    featureArray[1] = createListingForm.longitude.value;
    featureArray[2] = createListingForm.bathrooms.value;
    featureArray[3] = createListingForm.bedrooms.value;
    featureArray[4] = createListingForm.beds.value;

    for (var i=5; i < 86; i++) {
        featureArray[i] = 0;
    }
    
    var neighborhood = createListingForm.neighborhood.value;
    var roomType = createListingForm.roomType.value;

    var nIndex = neighborhoodArray.indexOf(neighborhood);
    featureArray[5 + nIndex] = 1;

    var rIndex = roomTypeArray.indexOf(roomType);
    featureArray[82 + rIndex] = 1;

    instance =  featureArray;
    instanceArray[0] = featureArray;
    
    return instanceArray;
}

async function getPrice(instance) {

     // make post request
     fetch('https://us-east1-ml.googleapis.com/v1/projects/rentalapp-297023/models/ListingPriceRecommender/versions/ListingPriceRecommender_v3:predict', {
        method: 'POST',
        body: JSON.stringify({
            "instances": instance
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ya29.a0AfH6SMC3nrrnhv8gN7E3ZQhVP9iszmK3KOA4wMcq75qRO4vv0jFWHyTUA_H6yq4rX8D9dV_-jo65Bkpy_vf_zOEH_ULeZErtldQLAiPCSRiTVxiXAUfNyHkHQ-bPy0tVGDGTOBi20A4jPtNO3jh-kJ1_ro-EMCjZGfxtsEhrXP1R',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        if (json.predictions) {
            pricePerDay.value = "$" + (json.predictions[0]).toFixed(2);
        } else {
            pricePerDay.value = "ERROR";
        }
    })
    .catch(err => console.error(err));
    
}
