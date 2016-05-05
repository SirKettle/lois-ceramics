'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.navigationService', [
])
.service('NavigationService', function (
	STATE_NAME_ABOUT,
	STATE_NAME_EVENTS,
	STATE_NAME_ORDERS/*,
	STATE_NAME_CONTACT*/
) {
	return {
		getMainNavItems: function () {
			return [
				{
					title: 'About',
					state: STATE_NAME_ABOUT
				},
				{
					title: 'Events',
					state: STATE_NAME_EVENTS
				},
				{
					title: 'Orders',
					state: STATE_NAME_ORDERS
				}/*,
				{
					title: 'Contact',
					state: STATE_NAME_CONTACT
				}*/
			];
		}
	};
});
