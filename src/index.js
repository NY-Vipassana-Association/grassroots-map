import L from "leaflet";
import oldStudentData from "./oldStudentData.json";

const dhammaHouseCoordinates = [40.7544, -73.9905];

const nycBoroughsStyle = feature => ({
  // fillColor: getColor(feature.properties.density),
  weight: 2,
  opacity: 1,
  color: "blue",
  dashArray: "3",
  fillOpacity: 0.5
});

const addNycBoroughsTo = async map => {
  let nycBoroughsResponse;
  try {
    nycBoroughsResponse = await fetch(
      "http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson"
    );
  } catch (e) {
    console.log("error loading nyc boroughs");
    return;
  }

  const nycBoroughsGeojson = await nycBoroughsResponse.json();

  L.geoJson(nycBoroughsGeojson)
    .addTo(map, { style: nycBoroughsStyle })
    .bindPopup(layer => {
      const boroughName = layer.feature.properties.borough;
      const { oldStudentCount } = oldStudentData.find(
        borough => borough.name === boroughName
      );

      return `
      There are ${oldStudentCount} old students in ${boroughName}
      `;
    });
};

const addDhammaHouseTo = map => {
  const dhammaHouseMarker = L.marker(dhammaHouseCoordinates).addTo(map);
  dhammaHouseMarker.bindPopup(
    "NYC Dhamma House<br />247 W 38th St #1003, New York, NY 10018<br />https://www.ny.us.dhamma.org/"
  );
};

const initializeMap = () => {
  const map = L.map("mapid").setView(dhammaHouseCoordinates, 11);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoibmF0YW5pYmFyIiwiYSI6ImNqa2FnMTM5ajM1ajYzbG50dXptMDhjcDIifQ.Dae3BHZd9sexPOk_d76O1g"
    }
  ).addTo(map);

  addDhammaHouseTo(map);
  addNycBoroughsTo(map);
};

initializeMap();
