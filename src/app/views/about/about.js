'use strict';

var angular = require('angular');
var template = require('./about.html');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');
var blogComponent = require('../../components/blog/blog');

module.exports = angular.module('myApp.views.about', [
	headerComponent.name,
	footerComponent.name,
	blogComponent.name
])
.directive('myViewAbout', function (
) {

	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewAboutCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewAboutCtrl', function (
	$scope,
	STATE_NAME_EVENTS,
	STATE_NAME_CONTACT
) {
	$scope.states = {
		events: STATE_NAME_EVENTS,
		contact: STATE_NAME_CONTACT
	};
});