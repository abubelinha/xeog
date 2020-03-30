function mpintersect(p1,p2) { // https://github.com/Turfjs/turf/issues/1276
// adaptamos turf.intersect para que poida funcionar tamén con multipolígonos
// para funcionar, previamente debe estar cargada a librería turf.js
	//var inter=null;
	var inter=Array();
	var union; // AQUÍ meteremos a unión das diversas interseccións atopadas
	//var inter;
	var mp1= JSON.parse(JSON.stringify(p1));
	var mp2= JSON.parse(JSON.stringify(p2));
	if(mp1.geometry.type=="Polygon") {
		mp1.geometry.type="Multipolygon";
		mp1.geometry.coordinates=Array(mp1.geometry.coordinates);
	}
	if(mp2.geometry.type=="Polygon") {
		mp2.geometry.type="Multipolygon";
		mp2.geometry.coordinates=Array(mp2.geometry.coordinates);
	}
	//console.log(JSON.stringify(mp1.geometry.coordinates));
	//console.log(JSON.stringify(mp2.geometry.coordinates));
	mp1.geometry.coordinates.forEach(function(coords1){
		var feat1={'type':'Polygon','coordinates':coords1};
		mp2.geometry.coordinates.forEach(function(coords2){
			var feat2={'type':'Polygon','coordinates':coords2};
			var int12=turf.intersect(feat1,feat2);
			if(int12!==null) {
				inter.push(int12); 
				union=turf.union((union==null?int12:union),int12);
				//inter=turf.union(feat1,feat2);
				//console.log(inter);
			}
		});
	});
	return(union);
	return(inter);
}
function randomsquare(maxlat=70,minlat=35,maxlon=40,minlon=-25,steplat=5,steplon=5) {
/* xenera un polígono geojson aleatorio que encaixa nunha grid predefinida */
//function randomsquare(maxlat=90,minlat=-90,maxlon=180,minlon=-180) {
	//var lat=minlat+Math.random()*(maxlat-minlat) , lon=minlon+Math.random()*(maxlon-minlon);
	//var poly = turf.polygon([[ [-10.0, 45.0], [-5.0, 45.0], [-5.0, 40.0], [-10.0, 40.0], [-10.0, 45.0] ]]);
	var nstepslat=(maxlat-minlat)/steplat; var nstepslon=(maxlon-minlon)/steplon;
	var lat=Math.floor(Math.random()*nstepslat)*steplat + minlat;
	var lon=Math.floor(Math.random()*nstepslon)*steplon + minlon;
	var poly = turf.polygon([[ [lon, lat], [lon+steplon, lat], [lon+steplon, lat+steplat], [lon, lat+steplat], [lon, lat] ]]);
	return poly;
}