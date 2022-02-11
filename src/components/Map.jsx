import { useState, useEffect, useRef } from "react";

function Map({ center, zoom }) {
	const ref = useRef(null);
	const [map, setMap] = useState();

	useEffect(() => {
		if (ref.current && !map) {
		}
		new window.google.maps.Map(ref.current, { center, zoom });
	});

	return (
		// <div ref={ref} id="map">
		<p>Map</p>
		// </div>
	);
}

export default Map;
