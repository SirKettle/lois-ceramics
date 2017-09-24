'use strict';

var angular = require('angular');
var template = require('./contact.html');
// services
var contactService = require('../../services/contactService');
var googleMapsService = require('../../services/googleMapsService');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.contact', [
	googleMapsService.name,
	contactService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewContact', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewContactCtrl as Contact',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewContactCtrl', function (
	$scope,
	ContactService,
	GoogleMapsService
) {
	var Contact = this;

	$scope.getGoogleMapsSrc = function () {
		const roydonRoadPlaceQuery = 'place_id:Eh8zMyBSb3lkb24gUmQsIERpc3MgSVAyMiA0TE4sIFVL';
		const zoom = 15;
		return GoogleMapsService.getMapSrc( roydonRoadPlaceQuery, zoom );
	};

	ContactService.getContactDetails()
		.then(function (details) {
			Contact.details = details;
		});
});