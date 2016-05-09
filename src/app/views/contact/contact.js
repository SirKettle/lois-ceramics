'use strict';

var angular = require('angular');
var template = require('./contact.html');
// services
var contactService = require('../../services/contactService');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.contact', [
	headerComponent.name,
	footerComponent.name,
	contactService.name
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
	ContactService
) {
	var Contact = this;

	ContactService.getContactDetails()
		.then(function (details) {
			Contact.details = details;
		});
});