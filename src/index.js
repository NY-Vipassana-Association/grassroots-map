import Leaflet from "leaflet";
import oldStudentData from "./oldStudentData.json";
import cssClasses from "./css/main.css";

const dhammaHouseCoordinates = [40.7544, -73.9905];

const populationColors = {
  0: "#FED976",
  200: "#FEB24C",
  500: "#FD8D3C",
  1000: "#FC4E2A",
  1500: "#E31A1C",
  2000: "#BD0026",
  2500: "#800026"
};

function getColor(count) {
  const biggestKeySmallerThanCount = Object.keys(populationColors)
    .map(key => parseInt(key))
    .reduce((prev, curr) => (curr > prev && curr <= count ? curr : prev), 0);
  return populationColors[biggestKeySmallerThanCount];
}

const getBoroughDataByName = name =>
  oldStudentData.find(borough => borough.name === name);

const nycBoroughsStyle = feature => {
  return {
    fillColor: getColor(
      getBoroughDataByName(feature.properties.borough).oldStudentCount
    ),
    weight: 2,
    opacity: 1,
    color: "#ac8686",
    fillOpacity: 0.7
  };
};

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

  Leaflet.geoJson(nycBoroughsGeojson, { style: nycBoroughsStyle })
    .addTo(map)
    .bindPopup(layer => {
      const boroughName = layer.feature.properties.borough;
      const { oldStudentCount } = getBoroughDataByName(boroughName);

      return `
      There are ${oldStudentCount} old students in ${boroughName}
      `;
    });
};

const addDhammaHouseTo = map => {
  const dhammaHouseMarker = Leaflet.marker(dhammaHouseCoordinates).addTo(map);
  dhammaHouseMarker.bindPopup(
    "NYC Dhamma House<br />247 W 38th St #1003, New York, NY 10018<br />https://www.ny.us.dhamma.org/"
  );
};

const initializeMap = () => {
  const map = Leaflet.map("mapid").setView(dhammaHouseCoordinates, 11);

  Leaflet.tileLayer(
    "https://api.mapbox.com/styles/v1/natanibar/cjkbf9gr8019f2rqllw7uz3ep/tiles/{z}/{x}/{y}?access_token={accessToken}",
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
  const info = L.control();

  info.onAdd = function(map) {
    this._div = L.DomUtil.create("div", cssClasses.info); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function(props) {
    this._div.innerHTML =
      "<h4>Vipassana Grassroots Map</h4>" +
      (props
        ? "<b>" +
          props.name +
          "</b><br />" +
          props.density +
          " people / mi<sup>2</sup>"
        : "Hover over a region");
  };

  info.addTo(map);
};

initializeMap();
