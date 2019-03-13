import axios from 'axios';
import $ from './bling';
import styles from './mapStyles';
import GMap from 'gmaps';

function makeMap(mapDiv) {
	if (!mapDiv) return;
	const mapOptions = {
		el: mapDiv,
		center: { lat: 43.2, lng: -79.8 },
		zoom: 8,
		styles,
	};
	// const map = new google.maps.Map(mapDiv, mapOptions);
	const map = new GMap(mapOptions);
	console.log(map);
}

export default makeMap;
