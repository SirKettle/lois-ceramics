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

			scope._onCreateClicked = function () {
				controller.createEvent(scope.newEvent);
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



	// var self = this;

	// this.getMonsters = function (params) {
	// 	return MyMonsterService.getAll(params)
	// 		.then(function (monsters) {
	// 			$scope.monsters = monsters;
	// 		})
	// 		.catch(function (err) {
	// 			console.warn('getMonsters error', params, err);
	// 		});
	// };

	// this.getMonster = function (id) {
	// 	return MyMonsterService.get(id)
	// 		.catch(function (err) {
	// 			console.warn('getMonster error', id, err);
	// 		});
	// };

	// this.updateMonster = function (id, params) {
	// 	return MyMonsterService.update(id, params)
	// 		.catch(function (err) {
	// 			console.warn('updateMonster error', id, err);
	// 		});
	// };

	// this.createMonster = function (params) {
	// 	return MyMonsterService.create(params)
	// 		.then(function (details) {
	// 			self.getMonsters();
	// 		})
	// 		.catch(function (err) {
	// 			console.warn('createMonster error', params, err);
	// 		});
	// };

});