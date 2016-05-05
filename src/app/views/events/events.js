'use strict';

var angular = require('angular');
var template = require('./events.html');
// services
var eventService = require('../../services/eventService');
// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');
var eventSummaryComponent = require('../../components/eventSummary/eventSummary');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.events', [
	eventService.name,
	headerComponent.name,
	footerComponent.name,
	eventSummaryComponent.name
])
.directive('myViewEvents', function (
	MyEventService
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewEventsCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {

			controller.getEvents();
		}
	};
})
.controller('MyViewEventsCtrl', function (
	$scope,
	MyEventService
) {
	var self = this;

	this.getEvents = function (params) {
		return MyEventService.getAll(params)
			.then(function (events) {
				$scope.events = events;
			})
			.catch(function (err) {
				console.warn('getEvents error', params, err);
			});
	};
});