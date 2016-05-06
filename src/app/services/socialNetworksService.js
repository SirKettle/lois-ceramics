'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.socialNetworksService', [
])
.service('SocialNetworksService', function (
	$q
) {
	return {

		getSocialNetworks: function () {
			var deferred = $q.defer();
			var networks = [
				{
					id: 'facebook',
					name: 'Facebook',
					url: 'https://www.facebook.com/lois.thirkettle'
				},
				{
					id: 'twitter',
					name: 'Twitter',
					url: 'https://twitter.com/lois_thirkettle'
				}
			];
			
			deferred.resolve(networks);

			return deferred.promise;
		}
	};
});