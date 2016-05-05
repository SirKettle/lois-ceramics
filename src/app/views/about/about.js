'use strict';

var angular = require('angular');
var template = require('./about.html');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');
var socialNetworksComponent = require('../../components/socialNetworks/socialNetworks');
var blogComponent = require('../../components/blog/blog');

module.exports = angular.module('myApp.views.about', [
	headerComponent.name,
	footerComponent.name,
	socialNetworksComponent.name,
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
) {
});