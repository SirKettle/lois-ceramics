'use strict';

var angular = require('angular');
var template = require('./orders.html');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.orders', [
	headerComponent.name,
	footerComponent.name
])
.directive('myViewOrders', function (
) {

	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewOrdersCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {

		}
	};
})
.controller('MyViewOrdersCtrl', function (
	$scope,
	STATE_NAME_GALLERY,
	STATE_NAME_CONTACT
) {
	$scope.states = {
		contact: STATE_NAME_CONTACT,
		gallery: STATE_NAME_GALLERY
	};
});