
redirect = () =>{
  window.open("foodmap.html", "_self");
}

color = () =>{
  splash.style.color='#EDE6E3';
  mapStyle.style.color= "#F06449"; 
}
   
setTimeout("redirect()",2000);
setTimeout("color()", 1000);
   