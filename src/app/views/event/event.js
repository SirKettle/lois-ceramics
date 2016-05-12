'use strict';

var angular = require('angular');
var template = require('./event.html');
// services
var eventService = require('../../services/eventService');
// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-event></dino:view-event> )

module.exports = angular.module('myApp.views.event', [
	eventService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewEvent', function (
	MyEventService
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewEventCtrl as Event',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewEventCtrl', function (
	$sce,
	$scope,
	$stateParams,
	MyEventService,
	GOOGLE_MAPS_API_KEY
) {
	var Event = this;

	$scope.getGoogleMapsSrc = function () {
		if ( !Event.details || !Event.details.googleMaps ) {
			return;
		}
		const { zoom, query } = Event.details.googleMaps;
		const baseUrl = 'https://www.google.com/maps/embed/v1/place';
		const zoomQuery = zoom ? `&zoom=${ zoom }` : '';
		const url = `${ baseUrl }?q=${ query }${ zoomQuery }&key=${ GOOGLE_MAPS_API_KEY }`;
		// debugger;
		return $sce.getTrustedResourceUrl(url);
	};

	Event.getTestimonialQuoteHtml = function () {
		var testimonial = Event.details && Event.details.testimonial;

		if (!testimonial) {
			return null;
		}

		return $sce.trustAsHtml(testimonial.html);
	};

	Event.getTestimonialAuthor = function () {
		var testimonial = Event.details && Event.details.testimonial;

		if (!testimonial) {
			return null;
		}

		return testimonial.author;
	};

	Event.getDetails = function (id) {
		Event.message = null;
		return MyEventService.get(id)
			.then(function (details) {
				Event.details = details;
				// console.log('retrieved', $scope.details);
			})
			.catch(function (err) {
				Event.error = 'Sorry, the event cannot be found';
				console.warn('getDetails error', id, err);
			});
	};

	Event.key = $stateParams.eventKey;
	Event.getDetails(Event.key);
});