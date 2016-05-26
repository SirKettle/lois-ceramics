'use strict';

var angular = require('angular');
var dataService = require('./dataService');

module.exports = angular.module('myApp.services.eventService', [
	dataService.name
])
.service('MyEventService', function (
	$q,
	$rootScope,
	DataService
) {

	var mURL = DataService.apiRoot() + 'events';

	var getEvent = function ( event ) {

		var dateNow, dateStartTime, dateEndTime;

		event.isPast = false;
		event.isPresent = false;
		event.isTBC = true;

		if (event.date && event.dateEnd) {
			event.isTBC = false;

			event.date = new Date( event.date );
			event.dateEnd = new Date( event.dateEnd );

			dateNow = new Date(new Date().toDateString()).getTime();
			dateStartTime = new Date(new Date(event.date).toDateString()).getTime();
			dateEndTime = new Date(new Date(event.dateEnd).toDateString()).getTime();

			if (!isNaN(dateStartTime) && !isNaN(dateEndTime)) {
				if ( dateStartTime <= dateNow ) {

					if ( dateEndTime >= dateNow ) {
						event.isPresent = true;
					}
					else {
						event.isPast = true;
					}
				}
			}
		}

		return event;
	};

	var _validateResponse = function (deferred, response, method) {
		// validation

		var data = response && response.data || response;

		if (angular.isObject(data)) {

			if (angular.isArray(data)) {
				DataService.resolve(deferred, data.map(getEvent));
				return;
			}

			DataService.resolve(deferred, getEvent(data));
			return;
		}

		DataService.reject(deferred, {
			message: 'invalid data',
			data: data
		});
	};

	return {
		get: function (key) {
			var deferred = $q.defer();

			DataService.get(mURL + '/' + key)
				.then(function (data) {
					_validateResponse(deferred, data, 'get');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		getAll: function (params) {
			var deferred = $q.defer();

			DataService.get(mURL, params)
				.then(function (data) {
					_validateResponse(deferred, data, 'getAll');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;

		},
		create: function (data) {
			var deferred = $q.defer();

			// TODO: validate data before publishing

			DataService.create(mURL, data)
				.then(function (data) {
					_validateResponse(deferred, data, 'create');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		update: function (key, data) {
			var deferred = $q.defer();

			// TODO: validate data before publishing

			DataService.update(mURL + '/' + key, data)
				.then(function (data) {
					_validateResponse(deferred, data, 'update');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		delete: function (key) {
			var deferred = $q.defer();

			DataService.delete(mURL + '/' + key)
				.then(function (data) {
					_validateResponse(deferred, data, 'delete');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		}
	};
});
