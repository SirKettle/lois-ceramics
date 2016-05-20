'use strict';

var angular = require('angular');
var template = require('./event.html');
// services
var eventService = require('../../services/eventService');
var googleMapsService = require('../../services/googleMapsService');
// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-event></dino:view-event> )

module.exports = angular.module('myApp.views.eventAdmin', [
	eventService.name,
	googleMapsService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewEventAdmin', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewEventAdminCtrl as Event',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {

			scope._onUpdateClicked = function () {
				controller.updateDetails(scope.key, scope.details);
			};
		}
	};
})
.controller('MyViewEventAdminCtrl', function (
	$sce,
	$scope,
	$stateParams,
	MyEventService,
	GoogleMapsService
) {
	var Event = this;

	$scope.getGoogleMapsSrc = function () {
		if ( !Event.details || !Event.details.googleMaps ) { return; }
		const { zoom, query } = Event.details.googleMaps;
		return GoogleMapsService.getMapSrc( query, zoom );
	};

	Event.getDetails = function (id) {
		Event.error = null;
		Event.details = null;
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

	

	// this.getDetails = function (id) {
	// 	return MyMonsterService.get(id)
	// 		.then(function (details) {
	// 			$scope.details = details;
	// 			// console.log('retrieved', $scope.details);
	// 		})
	// 		.catch(function (err) {
	// 			console.warn('getDetails error', id, err);
	// 		});
	// };

	// this.updateDetails = function (id, details) {
	// 	return MyMonsterService.update(id, details)
	// 		.then(function (details) {
	// 			$scope.details = details;
	// 			// console.log('updated', $scope.details);
	// 		})
	// 		.catch(function (err) {
	// 			console.warn('updateDetails error', id, err);
	// 		});

	// $scope.$watch('key', function () {
	// 	Event.key = $scope.key;
	// 	Event.getDetails(Event.key);
	// });

	Event.key = $stateParams.eventKey;
	Event.getDetails(Event.key);

});