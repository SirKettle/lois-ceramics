'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.googleMapsService', [])
.constant('GOOGLE_MAPS_API_KEY', 'AIzaSyAGYcXR6ZSkrKvR2szmyjvRkcLs1G9Plck')
.constant('GOOGLE_MAPS_BASE_URL', 'https://www.google.com/maps/embed/v1/place')
.service('GoogleMapsService', function (
	$sce,
	GOOGLE_MAPS_API_KEY,
	GOOGLE_MAPS_BASE_URL
) {
	return {
		getMapSrc: function ( query, zoom ) {
			if ( !query ) {
				return;
			}
			const zoomQuery = zoom ? `&zoom=${ zoom }` : '';
			const url = `${ GOOGLE_MAPS_BASE_URL }?q=${ query }${ zoomQuery }&key=${ GOOGLE_MAPS_API_KEY }`;
			return $sce.getTrustedResourceUrl(url);
		}
	};
});
