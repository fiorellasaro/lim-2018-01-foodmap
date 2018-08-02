google.maps.event.addDomListener(window, "load", function(){

 

  const ubicacion = new Localizacion(()=>{

    const myLocation = {
      lat: ubicacion.latitude,
      lng: ubicacion.longitude
    };

    
    const options = {
      center : myLocation,
      zoom: 16
    }

    let map = document.getElementById('map');
    const mapa = new google.maps.Map(map, options); 

    const mark = new google.maps.Marker({
      position: myLocation,
      map: mapa,
     /*  title: "Mi ubicación" */
  
    });

    const informationPlace = new google.maps.InfoWindow();
    mark.addListener('click', function(){
      informationPlace.open(mapa, mark);
    });

    let autocomplete = document.getElementById('searchInput');
    let search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo("bounds", mapa);
    search.addListener('place_changed', function(){
      informationPlace.close();
      mark.setVisible(false);

      let place = search.getPlace();
      console.log(place);
      if(!place.geometry.viewport){
        window.alert('errror al mostrar el lugar');
        return;
      }

      if(place.geometry.viewport){
        mapa.fitBounds(place.geometry.viewport);
      }else{
        mapa.setCenter(place.geometry.location);
        mapa.setZoom(16);
      }

      mark.setPosition(place.geometry.location);
      mark.setVisible(true);

    });
    

 

  });


});


 

    
/* let map;
    map = new google.maps.Map(document.getElementById('map'), {center:{
      lat: ubicacion.latitude,
      lng: ubicacion.longitude
    },
    zoom: 10
  }); */
    


document.getElementById('restaurantInfo').addEventListener('click',() =>{
  document.getElementById('infoModal').style.display = "inherit";
});

document.getElementsByClassName('close')[0].addEventListener('click',() =>{
  document.getElementById('infoModal').style.display = "none";
});
 


