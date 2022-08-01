// Add console.log to check to see if our code is working.
console.log("Working");

// // Get data from cities.js
// let countryData = countries;
// console.log(countryData)

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark": dark
  };
  console.log(baseMaps)
  // Add a 2nd layer group for the mortality data.
  let literacyRate = new L.LayerGroup();
  let mortalityRate = new L.LayerGroup();
  let gdp2015 = new L.LayerGroup();
  let alcohol2015 = new L.LayerGroup();
  
  
  // Add a reference to the mortality group to the overlays object.
  let overlays = {
    'Literacy': literacyRate,
    'Mortality Rate': mortalityRate,
	'GDP Per Capita 2015': gdp2015,
	'Alcohol 2015': alcohol2015 
  };
  
  // Then we add a control to the map that will allow the user to change which
  // layers are visible.
  L.control.layers(baseMaps, overlays).addTo(map);
  
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
	  return "#2f7d33";
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
	
		// Here we create a legend control object.
	let legend = L.control({
	position: "bottomright"
	});
  
	// Then add all the details for the legend
	legend.onAdd = function() {
	  let div = L.DomUtil.create("div", "info legend");
  
	  const mortalities = [0, 10, 22];
	  const colors = [
		"#2f7d33",
		"#e8c217",
		"#ea2c2c"
		];
  
	  // Looping through our intervals to generate a label with a colored square for each interval.
	  for (var i = 0; i < mortalities.length; i++) {
		console.log(colors[i]);
		div.innerHTML +=
		  "<i style='background: " + colors[i] + "'></i> " +
		  mortalities[i] + (mortalities[i + 1] ? "&ndash;" + mortalities[i + 1] + "<br>" : "+");
		}
	  return div;
	};
  
	// add legend to the map.
	legend.addTo(map);


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
		  return "#07b89d";
		}
		if (rate >= 80) {
		  return "#f07e06";
		}
		if (rate>= 70) {
		  return "#f00c76";
		}
		return "#5c0cf0";
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
   	literacyRate.addTo(map);
    // Close the braces and parentheses for the major earthquake data.
  });
/////////////////////////////////////////////////////////////////////////////
// Retrieve the country GeoJSON data.
d3.json('../cleaned_data/map.geoJSON').then(function(data) {
    function styleInfo(features) {
		return {
		  opacity: 1,
		  fillOpacity: .6,
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
		return "#209618";
	  }
	  if (gdp >= 25000) {
		return "#ebe41c";
	  }
	  if (gdp >= 10000) {
		return "#ed7d0c"
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
      gdp2015.addTo(map);
  });
/////////////////////////////////////////////////////////////////////////////
// Retrieve the country GeoJSON data.
d3.json('../cleaned_data/map.geoJSON').then(function(data) {
    function styleInfo(features) {
		return {
		  opacity: 1,
		  fillOpacity: .6,
		  fillColor: getColor(features.properties.alcohol_rate_2015),
		  color: "#000000",
		  radius: getRadius(features.properties.alcohol_rate_2015)*1.5,
		  stroke: true,
		  weight: 0.5
		};
	  }
	
	// This function determines the color of the marker based on the mortality state of the country
	function getColor(alcohol) {
	  if (alcohol >= 15 ) {
		return "#0c57c7";
	  }
	  if (alcohol >= 10) {
		return "#0ddb82";
	  }
	  if (alcohol >= 5) {
		return "#fc9312 "
	  }
	  return "#b013a0";
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
		layer.bindPopup("Country: " + feature.properties.Country + "<br>GDP per Capita 2015: " + feature.properties.alcohol_rate_2015);
        }
      	}).addTo(alcohol2015);
      // Then we add the literacy layer to our map.
      alcohol2015.addTo(map);
  });
  
// 	// // Here we create a legend control object.
// 	// let legend = L.control({
// 	// position: "bottomright"
// 	// });
  
// 	// // Then add all the details for the legend
// 	// legend.onAdd = function() {
// 	//   let div = L.DomUtil.create("div", "info legend");
  
// 	//   const mortalities = [>= 20%, >= 10%, >=0];
// 	//   const colors = [
// 	// 	"#ea2c2c",
// 	// 	"#e8c217",
// 	// 	"#2f7d33"
// 	// 	];
  
// 	//   // Looping through our intervals to generate a label with a colored square for each interval.
// 	//   for (var i = 0; i < mortalities.length; i++) {
// 	// 	console.log(colors[i]);
// 	// 	div.innerHTML +=
// 	// 	  "<i style='background: " + colors[i] + "'></i> " +
// 	// 	  mortalities[i] + (mortalities[i + 1] ? "&ndash;" + mortalities[i + 1] + "<br>" : "+");
// 	// 	}
// 	//   return div;
// 	// };
  
// 	// // add legend to the map.
// 	// legend.addTo(map);
  
	
// 	// Use d3.json to make a call to get our Tectonic Plate geoJSON data.
	
// 	// d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(tdata) {
// 	//   L.geoJson(tdata,{
// 	// 	style: styleInfo
// 	//   }).addTo(tectonicPlates);
	  
// 	//   tectonicPlates.addTo(map);
// 	//   // set style for tectonic plate overlay
// 	//   function styleInfo(feature) {
// 	// 	return {
// 	// 	  color: "#c1502e",
// 	// 	  weight: 1.5
// 	// 	};
// 	//  }
// 	//});
//   })
