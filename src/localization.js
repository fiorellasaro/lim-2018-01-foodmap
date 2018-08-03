class Localizacion {
  constructor (callback){
    if(navigator.geolocation){
       //obtenemos nuestra localización
      navigator.geolocation.getCurrentPosition((position) =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude; 
      callback();
      });
      
    }else{
      alert("No hay soporte de geolocalización");
      }
    }
}
