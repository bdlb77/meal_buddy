import axios from 'axios';
import $ from './bling';
import styles from './mapStyles';

function makeMap(mapDiv) {
	if (!mapDiv) return;
	const [lng, lat] = JSON.parse(mapDiv.dataset.coords);
	console.log(JSON.parse(mapDiv.dataset.event));
	const position = { lat, lng };
	const mapOptions = {
		center: { lat, lng },
		zoom: 8,
		styles,
	};
	const infoWindow = new google.maps.InfoWindow();
	const map = new google.maps.Map(mapDiv, mapOptions);
	const marker = new google.maps.Marker({ map, position });

	console.log(map);
}

export default makeMap;
