'use strict';

var angular = require('angular');
var template = require('./admin.html');
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

module.exports = angular.module('myApp.views.admin', [
	eventService.name,
	headerComponent.name,
	footerComponent.name,
	eventSummaryComponent.name
])
.directive('myViewAdmin', function (
	$state,
	MyEventService,
	STATE_NAME_EVENT_ADMIN
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewAdminCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {

			controller.getEvents();

			scope._onCreateClicked = function (event) {
				controller.createEvent(event);
			};

			scope._onUpdateClicked = function (event) {
				controller.updateEvent(event.id, event);
			};

			scope._onDeleteClicked = function (event) {
				controller.deleteEvent(event.id);
			};

			scope._onRowClicked = function (event) {
				$state.go(STATE_NAME_EVENT_ADMIN, {
					eventKey: event.id
				});
			};
		}
	};
})
.controller('MyViewAdminCtrl', function (
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

	this.createEvent = function (eventData) {
		return MyEventService.create(eventData)
			.then(function () {
				self.getEvents();
			})
			.catch(function (err) {
				console.warn('createEvent error', eventData, err);
			});
	};

	this.updateEvent = function (id, eventData) {
		return MyEventService.update(id, eventData)
			.then(function (eventData) {
				console.log('updated', eventData);
				self.getEvents();
			})
			.catch(function (err) {
				console.warn('updateEvent error', eventData, err);
			});
	};

	this.deleteEvent = function (id) {
		return MyEventService.delete(id)
			.then(function () {
				console.log('deleted', id);
				self.getEvents();
			})
			.catch(function (err) {
				console.warn('deleteEvent error', id, err);
			});
	};

});