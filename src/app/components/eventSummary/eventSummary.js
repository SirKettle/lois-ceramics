'use strict';

var angular = require('angular');
var template = require('./eventSummary.html');

module.exports = angular.module('myApp.components.eventSummary', [
])
.directive('myEventSummary', function (
	$state,
	STATE_NAME_EVENT
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyEventSummaryCtrl as Event',
		replace: true,
		scope: {
			model: '=?'
		},
		link: function (scope, elem, attrs, controller) {

			scope._onLinkClicked = function () {
				$state.go(STATE_NAME_EVENT, {
					eventKey: scope.model.id
				});
			};
		}
	};
})
.controller('MyEventSummaryCtrl', function (
	$scope
) {
	var Event = this;
	Event.model = $scope.model;
});