
'use strict';

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var Flickity = require('flickity');
var angularFlickity = require('angular-flickity');

var filters = require('./filters');
var localisationService = require('./services/localisationService');
var analyticsService = require('./services/analyticsService');

var viewAbout = require('./views/about/about');
var viewEvents = require('./views/events/events');
var viewEvent = require('./views/event/event');
var viewOrders = require('./views/orders/orders');
var viewGallery = require('./views/gallery/gallery');
var viewContact = require('./views/contact/contact');
var viewAdmin = require('./views/admin/admin');
var viewEventAdmin = require('./views/eventAdmin/eventAdmin');

angular.module('myApp', [
	filters.name,
	localisationService.name,
	analyticsService.name,
	viewAbout.name,
	viewEvents.name,
	viewEvent.name,
	viewOrders.name,
	viewGallery.name,
	viewContact.name,
	viewAdmin.name,
	viewEventAdmin.name,
	'ui.router',
	'bc.Flickity'
])
.constant('STATE_URL_HOME_REDIRECT', '/')
.constant('STATE_URL_ABOUT', '/about')
.constant('STATE_URL_EVENTS', '/events')
.constant('STATE_URL_EVENT', '/event/:eventKey')
.constant('STATE_URL_ORDERS', '/orders')
.constant('STATE_URL_GALLERY', '/gallery')
.constant('STATE_URL_CONTACT', '/contact')
.constant('STATE_URL_ADMIN', '/admin')
.constant('STATE_URL_EVENT_ADMIN', '/event_admin')
.constant('STATE_NAME_HOME_REDIRECT', 'home')
.constant('STATE_NAME_ABOUT', 'about')
.constant('STATE_NAME_EVENTS', 'events')
.constant('STATE_NAME_EVENT', 'event')
.constant('STATE_NAME_ORDERS', 'orders')
.constant('STATE_NAME_GALLERY', 'gallery')
.constant('STATE_NAME_CONTACT', 'contact')
.constant('STATE_NAME_ADMIN', 'admin')
.constant('STATE_NAME_EVENT_ADMIN', 'event_admin')
.constant('DEFAULT_EVENT_KEY', null)
.config(function (
	$sceDelegateProvider,
	$stateProvider,
	$urlRouterProvider,
	$provide,
	STATE_URL_HOME_REDIRECT,
	STATE_URL_ABOUT,
	STATE_URL_EVENTS,
	STATE_URL_EVENT,
	STATE_URL_ORDERS,
	STATE_URL_GALLERY,
	STATE_URL_CONTACT,
	STATE_URL_ADMIN,
	STATE_URL_EVENT_ADMIN,
	STATE_NAME_HOME_REDIRECT,
	STATE_NAME_ABOUT,
	STATE_NAME_EVENTS,
	STATE_NAME_EVENT,
	STATE_NAME_ORDERS,
	STATE_NAME_GALLERY,
	STATE_NAME_CONTACT,
	STATE_NAME_ADMIN,
	STATE_NAME_EVENT_ADMIN,
	DEFAULT_EVENT_KEY
) {
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'https://www.google.com/maps/**'
	]);
	// If 404 - go home...
	$urlRouterProvider.otherwise(STATE_URL_HOME_REDIRECT);

	// Define the states used in the app
	$stateProvider
		.state(STATE_NAME_HOME_REDIRECT, {
			url: STATE_URL_HOME_REDIRECT,
			controller: function($state, STATE_NAME_ABOUT) {
				$state.go(STATE_NAME_ABOUT);
			}
		})
		.state(STATE_NAME_ABOUT, {
			url: STATE_URL_ABOUT,
			template: '<my:view-about></my:view-about>'
		})
		.state(STATE_NAME_EVENTS, {
			url: STATE_URL_EVENTS,
			template: '<my:view-events></my:view-events>'
		})
		.state(STATE_NAME_EVENT, {
			url: STATE_URL_EVENT,
			template: '<my:view-event></my:view-event>',
			params: {
				eventKey: DEFAULT_EVENT_KEY
			}
		})
		.state(STATE_NAME_ORDERS, {
			url: STATE_URL_ORDERS,
			template: '<my:view-orders></my:view-orders>'
		})
		.state(STATE_NAME_GALLERY, {
			url: STATE_URL_GALLERY,
			template: '<my:view-gallery></my:view-gallery>'
		})
		.state(STATE_NAME_CONTACT, {
			url: STATE_URL_CONTACT,
			template: '<my:view-contact></my:view-contact>'
		})
		.state(STATE_NAME_ADMIN, {
			url: STATE_URL_ADMIN,
			template: '<my:view-admin></my:view-admin>'
		})
		.state(STATE_NAME_EVENT_ADMIN, {
			url: STATE_URL_EVENT_ADMIN,
			template: '<my:view-event-admin></my:view-event-admin>',
			params: {
				eventKey: DEFAULT_EVENT_KEY
			}
		});

	// decorate the $q service with 'allSettled' which unlike 'all' resolves if a promise fails
	$provide.decorator('$q', function($delegate) {
		var $q = $delegate;
		$q.allSettled = function(promises) {
			return $q.all(promises.map(function(promise) {
				return promise.then(function(value) {
					return { state: 'fulfilled', value: value };
				}, function(reason) {
					return { state: 'rejected', reason: reason };
				});
			}));
		};
		return $q;
	});
})
.run(function (
	$filter,
	LocalisationService,
	AnalyticsService
) {
	LocalisationService.init('en-GB')
		.then(function () {
			var successMsg = $filter('localise')('myApp_localisationInitSuccess');
		})
		.catch(function (err) {
			console.error(err);
		});

	AnalyticsService.init();
});