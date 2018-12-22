import Leaflet from "leaflet";

import oldStudentDataJson from "./oldStudentData.json";
import groupSittingsJSON from "./groupSittings.json";

import cssClasses from "./css/main.css";
import dhammaHouseIconUrl from "./dhammaHouseIcon.svg";
import groupSittingIconUrl from "./groupSittingIcon.svg";

import {
  Borough,
  IGroupSitting,
  IOldStudentDataItem,
  IRegionalContact,
  IRegionFeature,
  IRegionFeaturesGeojson
} from "./types";

const oldStudentData: IOldStudentDataItem[] = oldStudentDataJson;
const groupSittings: IGroupSitting[] = groupSittingsJSON;
const dhammaHouseCoordinates = { lat: 40.7544, lng: -73.9905 };

enum populationCounts {
  level1 = 0,
  level2 = 200,
  level3 = 500,
  level4 = 1000,
  level5 = 1500,
  level6 = 2000,
  level7 = 2500
}

const populationColors = {
  [populationCounts.level1]: "#FED976",
  [populationCounts.level2]: "#FEB24C",
  [populationCounts.level3]: "#FD8D3C",
  [populationCounts.level4]: "#FC4E2A",
  [populationCounts.level5]: "#E31A1C",
  [populationCounts.level6]: "#BD0026",
  [populationCounts.level7]: "#800026"
};

function getColor(count: IOldStudentDataItem["oldStudentCount"]) {
  const biggestKeySmallerThanCount: populationCounts = Object.keys(
    populationColors
  )
    .map(key => parseInt(key))
    .reduce((prev, curr) => (curr > prev && curr <= count ? curr : prev), 0);

  return populationColors[biggestKeySmallerThanCount];
}

const getBoroughDataByName = (name: IOldStudentDataItem["name"]) => {
  const boroughDataItem = oldStudentData.find(borough => borough.name === name);
  if (!boroughDataItem)
    console.error("Could not find old student data for borough");

  return boroughDataItem;
};

const getFeatureColor = (feature: IRegionFeature) => {
  const boroughData = getBoroughDataByName(feature.properties.borough);

  return getColor(
    boroughData ? boroughData.oldStudentCount : populationCounts.level1
  );
};

const nycBoroughsStyle = (feature?: IRegionFeature) => {
  return {
    fillColor: feature ? getFeatureColor(feature) : populationCounts.level1,
    weight: 2,
    opacity: 1,
    color: "#ac8686",
    fillOpacity: 0.7
  };
};

const mapRegionNameToClassName = (
  name: IRegionFeature["properties"]["borough"]
) =>
  `region-${name
    .toLowerCase()
    .split(" ")
    .join("-")}`;

const addNycBoroughsTo = async (map: Leaflet.Map, info) => {
  let geojsonBoroughsLayer;
  let nycBoroughsResponse;
  try {
    nycBoroughsResponse = await fetch(
      "http://data.beta.nyc//dataset/68c0332f-c3bb-4a78-a0c1-32af515892d6/resource/7c164faa-4458-4ff2-9ef0-09db00b509ef/download/42c737fd496f4d6683bba25fb0e86e1dnycboroughboundaries.geojson"
    );
  } catch (e) {
    console.error("error loading nyc boroughs");
    return;
  }

  const nycBoroughsGeojson: IRegionFeaturesGeojson = await nycBoroughsResponse.json();

  function resetHighlight(e) {
    geojsonBoroughsLayer.resetStyle(e.target);
    info.update();
  }

  const highlightFeature = e => {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });

    if (
      !Leaflet.Browser.ie &&
      !Leaflet.Browser.opera &&
      !Leaflet.Browser.edge
    ) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
    });
  };

  const renderRegionalContactInfo = (regionalContact?: IRegionalContact) => {
    if (regionalContact) {
      return `
        <p>Interested in connecting with the local Brooklyn old-student community? Reach out to our Brooklyn Community Organizer, ${
          regionalContact.name
        }, at ${regionalContact.emailAddress} or ${
        regionalContact.phoneNumber
      }.</p>
      `;
    } else {
      return `
      <p>If you are interested in joining your local community planning team, please reach out to our Dhamma Service Committee at dhammaservice.nyva@gmail.com or (413) 438-7821.</p>
      `;
    }
  };
  const mapRegionLayerToName = (layer: Leaflet.Layer) =>
    layer.feature.properties.borough;

  const renderTooltip = (layer: Leaflet.Layer) => {
    const boroughName = mapRegionLayerToName(layer);
    const boroughData = getBoroughDataByName(boroughName);

    return `
      <p>There are ${
        boroughData ? boroughData.oldStudentCount : populationCounts.level1
      } old students in ${boroughName}.</p>
      ${renderRegionalContactInfo(boroughData && boroughData.regionalContact)}
      <p><a href="https://docs.google.com/document/d/1Q3S9qwr1akRhVcNKRcnCA7wWCQiMayVLTcoVwzCGBo4/edit" target="_blank">Apply to host a group sitting</a></p>
    `;
  };

  geojsonBoroughsLayer = Leaflet.geoJSON(nycBoroughsGeojson, {
    style: nycBoroughsStyle,
    onEachFeature
  })
    .addTo(map)
    .bindPopup(renderTooltip);

  geojsonBoroughsLayer.eachLayer((layer: Leaflet.Layer) => {
    layer._path.setAttribute(
      "data-test",
      mapRegionNameToClassName(mapRegionLayerToName(layer))
    );
  });
};

const addGroupSittingsTo = (map: Leaflet.Map) => {
  const groupSittingIcon = Leaflet.icon({
    iconUrl: groupSittingIconUrl,
    iconSize: [30, 30]
  });
  groupSittings.forEach(groupSitting => {
    Leaflet.marker([groupSitting.lat, groupSitting.lon], {
      icon: groupSittingIcon
    })
      .addTo(map)
      .bindPopup(
        `<h3>Group Sitting</h3>Host: ${groupSitting.name}<br /><br />${
          groupSitting.address
        } (contact host for full address)<br /><br />${
          groupSitting.time
        }<br />${
          groupSitting.email ? `<br />${groupSitting.email}` : ""
        }<br />${groupSitting.phoneNumber}`
      );
  });
};

const addDhammaHouseTo = map => {
  const dhammaHouseIcon = Leaflet.icon({
    iconUrl: dhammaHouseIconUrl,
    iconSize: [30]
  });

  const dhammaHouseMarker = Leaflet.marker(dhammaHouseCoordinates, {
    icon: dhammaHouseIcon
  }).addTo(map);
  dhammaHouseMarker.bindPopup(
    "<a target='_blank' href='https://www.ny.us.dhamma.org/'>NYC Dhamma House</a><br /><br />247 W 38th St #1003<br />New York, NY 10018"
  );
};

const createInfoBox = () => {
  const info = Leaflet.control();

  info.onAdd = function() {
    this._div = Leaflet.DomUtil.create("div", cssClasses.info); // create a div with a class "info"
    this._div.setAttribute("data-test", "hover-info-box");
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function(borough?: Borough) {
    const boroughData = borough
      ? getBoroughDataByName(borough.borough)
      : undefined;
    const infoBoxContent =
      borough && boroughData
        ? "<b>" +
          borough.borough +
          "</b><br />" +
          boroughData.oldStudentCount +
          " old students"
        : "Hover over a region";
    this._div.innerHTML = "<h4>Vipassana Grassroots Map</h4>" + infoBoxContent;
  };

  return info;
};

const createLegend = () => {
  const legend = Leaflet.control({ position: "bottomright" });

  legend.onAdd = function() {
    const div = Leaflet.DomUtil.create(
      "div",
      `${cssClasses.info} ${cssClasses.legend}`
    );
    div.setAttribute("data-test", "legend-box");
    const colorKeys = Object.keys(populationColors).map(divider =>
      parseInt(divider)
    );

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let index = 0; index < colorKeys.length; index++) {
      const colorKey = colorKeys[index];
      const nextColorKey = colorKeys[index + 1];
      div.innerHTML +=
        '<i style="background:' +
        getColor(colorKey) +
        '"></i> ' +
        colorKey +
        (nextColorKey ? "&ndash;" + nextColorKey + "<br>" : "+");
    }

    return div;
  };

  return legend;
};

const initializeMap = (element: HTMLElement) => {
  const map = Leaflet.map(element).setView(dhammaHouseCoordinates, 11);

  const accessToken =
    "pk.eyJ1IjoibmF0YW5pYmFyIiwiYSI6ImNqa2FnMTM5ajM1ajYzbG50dXptMDhjcDIifQ.Dae3BHZd9sexPOk_d76O1g";

  Leaflet.tileLayer(
    `https://api.mapbox.com/styles/v1/natanibar/cjkbf9gr8019f2rqllw7uz3ep/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18
    }
  ).addTo(map);

  const info = createInfoBox();
  info.addTo(map);
  addDhammaHouseTo(map);
  addGroupSittingsTo(map);
  addNycBoroughsTo(map, info);
  createLegend().addTo(map);
};

export default initializeMap;
