google.maps.event.addDomListener(window, "load", function(){

 

  const ubicacion = new Localizacion(()=>{


    const myLocation = {
      lat: ubicacion.latitude,
      lng: ubicacion.longitude
    };

    
    const options = {
      center : myLocation,
      zoom: 15
    }

    let map = document.getElementById('map');
    const mapa = new google.maps.Map(map, options); 


    const mark = new google.maps.Marker({
      position: myLocation,
      map: mapa,
      title: "Mi ubicación"
  
    });


     // creamos el objeto geodecoder
    let geocoder = new google.maps.Geocoder();
    // Se muestra la dirección actual 
      geocoder.geocode({'latLng': myLocation}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let addressText=results[0]['formatted_address'];
        userAddress.innerHTML += `<p id="myAddress">${addressText}</p>`;
       }
      });
    


    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let request = {
      location: myLocation,
      radius: '2000',
      types: ['restaurant', 'food']
    };

    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(mapa);

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
          createInfo(results[i], i);
        }
      }
      resultsContainer.innerHTML = `<h2 class="restaurantsNum">¡Hay ${results.length} restaurantes cerca de ti!</h2>`; 
    });

    function crearMarcador(place){
        // Marcador para los restaurants más cercanos
        var marker = new google.maps.Marker({
          map: mapa,
          position: place.geometry.location
        });
    }

    document.getElementById('searchBy').addEventListener('click',()=>{
      let search = document.getElementById('searchInput').value;
      let searchRequest = {
        location: myLocation,
        radius: '2000',
        query: search,
        types: ['restaurant', 'food']
      };

      let serviceSearch = new google.maps.places.PlacesService(mapa);
      serviceSearch.textSearch(searchRequest, callback);

      function callback(results, status) {
        listContainer.innerHTML = '';

        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let place = results[i];
              listContainer.innerHTML += 
              `<div class="restaurantContainer"> 
                <p class="restaurant">${results[i].name}</p>
                <button class="infoButton" id="${results[i].id}" onclick="showInfo('${results[i].id}')">Saber + </button>
               </div>`;
            infoModalContainer.innerHTML += 
            `<div id="infoModal${results[i].id}" class="modal">
              <div class="modalContent">
                <img class="closeButton" src="img/cancel.png" alt="cancel button" onclick="closeInfo('${results[i].id}')">
                <div class="infoContent">
                  <h1 class="name"> ${results[i].name} </h1>
                  <p> <strong>Dirección:</strong>  ${results[i].formatted_address} </p>
                  <p> <strong>Rating:</strong>  ${results[i].rating} </p>
                </div>
              </div> 
            </div>`;      
          } 
        }
      }
    });
 });
});


let createInfo  = (result, number) =>{
  listContainer.innerHTML += 
    `<div class="restaurantContainer"> 
        <p class="restaurant">${result.name}</p>
        <button class="infoButton" id="${result.id}" onclick="showInfo('${result.id}')">Saber + </button>
      </div>`;
  infoModalContainer.innerHTML += 
    `<div id="infoModal${result.id}" class="modal">
       <div class="modalContent">
          <img class="closeButton" src="img/cancel.png" alt="cancel button" onclick="closeInfo('${result.id}')">
            <div class="infoContent">
              <h1 class="name"> ${result.name} </h1>
              <p> <strong>Dirección:</strong>  ${result.vicinity} </p>
              <p> <strong>Rating:</strong>  ${result.rating} </p>
            </div>
        </div> 
    </div>`;
}

let showInfo = (id) =>{
  document.getElementById('infoModal'+id).style.display = "inherit";
};

let closeInfo = (id) =>{
  document.getElementById('infoModal'+id).style.display = "none";
};
 


