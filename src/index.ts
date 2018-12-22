import initializeMap from "./initializeMap";

const mapSelector = "#mapid";
const mapElement = document.querySelector(mapSelector);

if (!mapElement) {
  console.error(`Could not find element with selector ${mapSelector}`);
} else {
  initializeMap(mapElement as HTMLElement);
}
