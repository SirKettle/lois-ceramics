'use strict';

var angular = require('angular');
var template = require('./footer.html');
// services
var contactService = require('../../services/contactService');
// sub components
var socialNetworksComponent = require('../../components/socialNetworks/socialNetworks');

module.exports = angular.module('myApp.components.footer', [
	contactService.name,
	socialNetworksComponent.name
])
.directive('myFooter', function (
	$location
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyFooterCtrl as Footer',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyFooterCtrl', function (
	ContactService
) {
	var Footer = this;

	ContactService.getContactDetails()
		.then(function (details) {
			Footer.details = details;
		});
});