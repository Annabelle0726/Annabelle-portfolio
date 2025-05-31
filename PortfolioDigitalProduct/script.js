// Task 0
// Sign up for a Mapbox account and add your access token below.
// Remove YOUR-ACCESS-TOKEN-HERE, and put your token between the quotes
mapboxgl.accessToken = "pk.eyJ1IjoiYW5uYWJlbGxlMDcyNiIsImEiOiJjbGthZmtoZmkwNXJnM2RxOXd0c2M2cml5In0.GXPbM2TBmDamLFC4oLokyg";

// Task 1
function filterPlacesByType(typePreference) {
    // Step 1: Create a new filteredPlaces array and store it in a variable
    let filteredPlaces = [];
    // Step 2: Loop through PLACES
    for (let i = 0; i < PLACES.length; i++) {
        // Step 3: If a place object's type property matches the typePreference parameter, add it to filteredPlaces
        if (typePreference[i] === PLACES[i].type) {
            filteredPlaces.push(PLACES[i]);
        } else {
            console.log("No match");
        }
    }
    // Step 4: After the loop, return filteredPlaces
    return filteredPlaces;
}

// Task 2
function createCard(place) {
    // Step 1: Create a new div element and store it in a variable
    let card = document.createElement("div");
    // Step 2: Add the col class to the new div element
    card.classList.add("col");
    // Step 3: Set the innerHTML of the div with a template string.
    // It should resemble the structure shown in the readme. Interpolate the values for place.name, place.img, and place.location where needed
    let img = document.createElement("img");
    img.src = place.img;
    card.appendChild(img);
    let h2 = document.createElement("h2");
    h2.innerHTML = place.name;
    card.appendChild(h2);
    let p = document.createElement("p");
    p.innerHTML = place.location;
    card.appendChild(p);
    // Step 4: Return the element
    return card;
}

// Task 3
function populateRecommendationCards(filteredPlaces) {
    // Step 1: Store the DOM element with the id "recommendations" in a variable
    let recommendation = document.getElementById("recommendations");
    // Step 2: Clear the "recommendations" innerHTML
    recommendation.innerHTML = "";
    // Step 3: Loop through the filteredPlaces array
    for (let i = 0; i < filteredPlaces.length; i++) {
        // Step 4: Create a card for each place using the createCard function
        let card = createCard(filteredPlaces[i]);
        // Step 5: Add/append each card to the recommendations DOM element
        recommendation.appendChild(card);
    }
}

// Task 4
function findPlaceByName(placeName) {
    // Step 1: Loop through the PLACES array
    for (let i = 0; i < PLACES.length; i++) {
        // Step 2: If a place object's name property matches the placeName parameter, return that place object
        if (placeName === PLACES[i].name) {
            return PLACES[i];
        } else {
            console.log("No match");
        }
    }
}
