'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.contactService', [
])
.service('ContactService', function (
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
					url: 'https://twitter.com/thirkettle_lois'
				}
			];
			
			deferred.resolve(networks);

			return deferred.promise;
		},

		getContactDetails: function () {
			var deferred = $q.defer();
			var details = {
				businessName: 'Lois Thirkettle Ceramics',
				name: 'Lois',
				email: 'loisthirkettleceramics@hotmail.com',
				telephone: '01379 423635',
				mobile: '07790 443 260',
				address: '33 Roydon Road, Diss, Norfolk. IP22 4LN'
			};
			
			deferred.resolve(details);

			return deferred.promise;

		}
	};
});