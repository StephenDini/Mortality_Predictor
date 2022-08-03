// Add console.log to check to see if our code is working.
console.log("Working");

// We create the tile layer that will be the background of our map.
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the third tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [0, 0],
	zoom: 2,
	layers: [street]
});



// Create a base layer that holds all three maps.
let baseMaps = {
	"Streets": street,
	"Satellite": satelliteStreets,
	"Dark": dark
  };


  let mortalityRate = new L.LayerGroup();
  let literacyRate = new L.LayerGroup();
  let gdp2015 = new L.LayerGroup();
  let alcohol2015 = new L.LayerGroup();
  
 
  let overlays = {
	"Mortality Rate": mortalityRate,
	"Literacy Rate": literacyRate,
	"GDP per Capita 2015": gdp2015,
    "Alcohol Rate 2015": alcohol2015
};

// L.control.layers(baseMaps, overlays).addTo(map);

var layerControl = new L.Control.Layers(null, {
    "Mortality Rate": mortalityRate,
	"Literacy Rate": literacyRate,
	"GDP per Capita 2015": gdp2015,
    "Alcohol Rate 2015": alcohol2015
}).addTo(map);

// Retrieve the country GeoJSON data.
  d3.json('../cleaned_data/map.geoJSON').then(function(data) {
	function styleInfo(features) {
		return {
		  opacity: 1,
		  fillOpacity: .6,
		  fillColor: getColor(features.properties.mortality_rate),
		  color: "#000000",
		  radius: getRadius(features.properties.mortality_rate)*.7,
		  stroke: true,
		  weight: 0.5
		};
	  }
	
	// This function determines the color of the marker based on the mortality state of the country
	function getColor(mortality) {
	  if (mortality >= 20 ) {
		return "#ea2c2c";
	  }
	  if (mortality >= 10) {
		return "#e8c217";
	  }
	  return "#60f205";
    }

    //This function determines the radius of the country marker based on its magnitude.
	//Countries with a mortalitiy stae of 0 were being plotted with the wrong radius.
	function getRadius(mortality) {
        if (mortality === 0) {
          return 1;
        }
        return mortality;
      }
	  
	  
      // Creating a GeoJSON layer with the retrieved data.
      L.geoJson(data,{
          // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
			console.log(feature);
            	return L.circleMarker(latlng);
            	},
        // We set the style for each circleMarker using our styleInfo function.
      	style: styleInfo,
       // We create a popup for each circleMarker to display the literacy and location 
       //  after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        console.log(feature)
		layer.bindPopup("Country: " + feature.properties.Country + "<br>Mortality Rate: " + feature.properties.mortality_rate);
		}
	}).addTo(mortalityRate);
      // Then we add the literacy layer to our map.
      mortalityRate.addTo(map);
	
});



////////////////////////////////////////////////////////////////////      

    // Retrieve the literacy data
	d3.json("../cleaned_data/map.geojson").then(function(data) {
	// 	L.circleMarker([feature.properties.Latitude, feature.properties.Longitude])
	//     .bindPopup("<h2>" + country.Country + "</h2> <hr> <h3>Literacy " + country.Literacy_Rate.toLocaleString() + "</h3>")
	//     .addTo(map)
    // });
	//   // Use the same style as the earthquake data.
	//   // Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
	  
	  function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: .6,
		  fillColor: getColor(feature.properties.Literacy_Rate),
		  color: "#000000",
		  radius: getRadius(feature.properties.Literacy_Rate)*.2,
		  stroke: true,
		  weight: 0.5
		};
	  }
	
  
	  function getColor(rate) {
		if (rate >= 90) {
		  return "#60f205";
		}
		if (rate >= 80) {
		  return "#e8c217";
		}
		if (rate>= 70) {
		  return "#f26005";
		}
		return "#ea2c2c";
	  }


      function getRadius(rate) {
        if (rate === 0) {
          return 1;
        }
        return rate;
      }
      // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data,{
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
			console.log(feature);
            	return L.circleMarker(latlng);
        		},
      	// We set the style for each circleMarker using our styleInfo function.
    	style: styleInfo,
    	 // We create a popup for each circleMarker to display the literacy and location 
    	 //  after the marker has been created and styled.
     	onEachFeature: function(feature, layer) {
		console.log(feature);
      	layer.bindPopup("Country: " + feature.properties.Country + "<br>Literacy Rate: " + feature.properties.Literacy_Rate);
      	}
    	}).addTo(literacyRate);
    	// Add the major earthquakes layer to the map.
   	// literacyRate.addTo(map);
    // Close the braces and parentheses for the major earthquake data.
  });

/////////////////////////////////////////////////////////////////////////////
// Retrieve the country GeoJSON data.
d3.json('../cleaned_data/map.geoJSON').then(function(data) {
    function styleInfo(features) {
		return {
		  opacity: 1,
		  fillOpacity: .8,
		  fillColor: getColor(features.properties.gdp_per_capita_2015),
		  color: "#000000",
		  radius: getRadius(10),
		  stroke: true,
		  weight: 0.5
		};
	  }
	
	// This function determines the color of the marker based on the mortality state of the country
	function getColor(gdp) {
	  if (gdp >= 40000 ) {
		return "#60f205";
	  }
	  if (gdp >= 25000) {
		return "#e8c217";
	  }
	  if (gdp >= 10000) {
		return "#f26005"
	  }
	  return "#ea2c2c";
    }

    //This function determines the radius of the country marker based on its magnitude.
	//Countries with a mortalitiy stae of 0 were being plotted with the wrong radius.
	function getRadius(gdp) {
        if (gdp === 0) {
          return 1;
        }
        return gdp;
      }
    
      // Creating a GeoJSON layer with the retrieved data.
      L.geoJson(data,{
          // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
			console.log(feature);
            	return L.circleMarker(latlng);
            	},
        // We set the style for each circleMarker using our styleInfo function.
      	style: styleInfo,
       // We create a popup for each circleMarker to display the literacy and location 
       //  after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        console.log(feature)
		layer.bindPopup("Country: " + feature.properties.Country + "<br>GDP per Capita 2015: " + feature.properties.gdp_per_capita_2015);
        }
      	}).addTo(gdp2015);
      // Then we add the literacy layer to our map.
    //   gdp2015.addTo(map);
  });
/////////////////////////////////////////////////////////////////////////////
// Retrieve the country GeoJSON data.
d3.json('../cleaned_data/map.geoJSON').then(function(data) {
    function styleInfo(features) {
		return {
		  opacity: 1,
		  fillOpacity: .8,
		  fillColor: getColor(features.properties.alcohol_rate_2015),
		  color: "#000000",
		  radius: getRadius(features.properties.alcohol_rate_2015)*1.5,
		  stroke: true,
		  weight: 0.5
		};
	  }
	
	// This function determines the color of the marker based on the mortality state of the country
	function getColor(alcohol) {
	  if (alcohol >= 12 ) {
		return "#e6ebe0";
	  }
	  if (alcohol >= 8) {
		return "#9bc1bc";
	  }
	  if (alcohol >= 4) {
		return "#ed6a5a"
	  }
	  return "#8c5aa3";
    }

    //This function determines the radius of the country marker based on its magnitude.
	//Countries with a mortalitiy stae of 0 were being plotted with the wrong radius.
	function getRadius(alcohol) {
        if (alcohol === 0) {
          return 1;
        }
        return alcohol;
      }
    
      // Creating a GeoJSON layer with the retrieved data.
      L.geoJson(data,{
          // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
			console.log(feature);
            	return L.circleMarker(latlng);
            	},
        // We set the style for each circleMarker using our styleInfo function.
      	style: styleInfo,
       // We create a popup for each circleMarker to display the literacy and location 
       //  after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        console.log(feature)
		layer.bindPopup("Country: " + feature.properties.Country + "<br>Alcohol Rate 2015: " + feature.properties.alcohol_rate_2015);
        }
      	}).addTo(alcohol2015);
      // Then we add the literacy layer to our map.
    //   alcohol2015.addTo(map);
  });
  
	// Here we create a legend control object.
	let legend = L.control({
		position: "bottomright"
		});
	  
		// Then add all the details for the legend
		legend.onAdd = function() {
		  let div = L.DomUtil.create("div", "info legend");
	  
		  const mortalityRate = [0, 10, 20];
		  const colors = [
			"#ea2c2c",
			"#e8c217",
			"#60f205"
			];
	  
		  // Looping through our intervals to generate a label with a colored square for each interval.
		  for (var i = 0; i < mortalityRate.length; i++) {
			console.log(colors[i]);
			div.innerHTML +=
			  "<i style='background: " + colors[i] + "'></i> " +
			  mortalityRate[i] + (mortalityRate[i + 1] ? "&ndash;" + mortalityRate[i + 1] + "<br>" : "+");
			}
		  return div;
		};
	  
		// add legend to the map.
		map.addControl(legend);

		let legend2 = L.control({
			position: "bottomright"
			});
		  
			// Then add all the details for the legend
			legend2.onAdd = function() {
			  let div = L.DomUtil.create("div", "info legend");
		  
			  const literacyRate = [0, 70, 80, 90, 100];
			  const colors = [
				"#f92427",
				"#e3822d",
				"#e8c217",
				"#60f205"
				];
		  
			  // Looping through our intervals to generate a label with a colored square for each interval.
			  for (var i = 0; i < (literacyRate.length - 1); i++) {
				console.log(colors[i]);
				div.innerHTML +=
				  "<i style='background: " + colors[i] + "'></i> " +
				  literacyRate[i] + (literacyRate[i + 1] ? "&ndash;" + literacyRate[i + 1] + "<br>" : "+");
				}
			  return div;
			};

		    // add legend to the map.
			// legend2.addTo(map);
			map.addControl(legend2);

			let legend3 = L.control({
				position: "bottomright"
				});
			  
				// Then add all the details for the legend
				legend3.onAdd = function() {
				  let div = L.DomUtil.create("div", "info legend");
			  
				  const gdp2015 = [0, 10000, 25000, 40000];
				  const colors = [
					"#f92427",
					"#e3822d",
					"#e8c217",
					"#60f205"
					];
			  
				  // Looping through our intervals to generate a label with a colored square for each interval.
				  for (var i = 0; i < gdp2015.length; i++) {
					console.log(colors[i]);
					div.innerHTML +=
					  "<i style='background: " + colors[i] + "'></i> " +
					  gdp2015[i] + (gdp2015[i + 1] ? "&ndash;" + gdp2015[i + 1] + "<br>" : "+");
					}
				  return div;
				};
			  
				// add legend to the map.
				// legend3.addTo(map);
				map.addControl(legend3);

				let legend4 = L.control({
					position: "bottomright"
					});
				  
					// Then add all the details for the legend
					legend4.onAdd = function() {
					  let div = L.DomUtil.create("div", "info legend");
				  
					  const alcohol2015 = [0, 4, 8, 12];
					  const colors = [
						"#e6ebe0",
						"#9bc1bc",
						"#ed6a5a",
						"#8c5aa3"
						];
						
					  // Looping through our intervals to generate a label with a colored square for each interval.
					  for (var i = 0; i < alcohol2015.length; i++) {
						console.log(colors[i]);
						div.innerHTML +=
						  "<i style='background: " + colors[i] + "'></i> " +
						  alcohol2015[i] + (alcohol2015[i + 1] ? "&ndash;" + alcohol2015[i + 1] + "<br>" : "+");
						}
					  return div;
					};
				  
					// add legend to the map.
					// legend4.addTo(map);
					map.addControl(legend4);

	// var baseMap = {
	// 	"Mortality Rate": baseMap1,
	// 	"Literacy Percentage": baseMap2,
	// 	"GDP per Capita 2015": baseMap3,
	// 	"Alcohol Percentage": baseMap4
	// 	};
						   
	// 	L.control.layers(baseMap).addTo(map);
			
// Add and remove layers
// map.on('click', function (eventLayer) {
	// Switch to the Permafrost legend...
	// if (map.hasLayer(legend)) {
	// 	map.removeControl(legend2);
	// 	map.removeControl(legend3);
	// 	map.removeControl(legend4);
	// 	map.addControl(legend);
	// } else if (map.hasLayer(legend2)) {
	// 	map.removeControl(legend);
	// 	map.removeControl(legend3);
	// 	map.removeControl(legend4);
	// 	map.addControl(legend2);
	// }
	// else 
	// { // Or switch to the treeline legend...
	// 	map.removeControl(legend2);
	// 	map.removeControl(legend);
	// 	map.removeControl(legend3);
	// 	map.removeControl(legend4);
	// }
// 	console.log("FIRED")
// });
			
	