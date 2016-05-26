'use strict';

var angular = require('angular');
var $ = require('jquery');

module.exports = angular.module('myApp.services.dataService', [
])
.constant('API_ROOT', 'http://server.willthirkettle.co.uk/api/json.php/')
.constant('DEV_API_ROOT', 'http://localhost:80/api/json.php/')
.service('DataService', function (
	$q,
	$http,
	$rootScope,
	DEV_API_ROOT,
	API_ROOT
) {
	const isDev = true;

	return {
		apiRoot: function () {
			if (isDev) {
				return DEV_API_ROOT;
			}
			return API_ROOT;
		},
		resolve: function (deferred, data) {
			deferred.resolve(data);
		},
		reject: function (deferred, err) {
			deferred.reject(angular.extend({
				_type: '404',
				message: 'unspecified error'
			}, err));
		},
		create: function (url, params) {
			return $http.post(url, params);
		},
		get: function (url, params) {
			return $http.get(url);
		},
		update: function (url, params) {
			return $http.put(url, params);
		},
		delete: function (url) {
			return $http.delete(url);
		}
	};
});

/////////////// CLIENT /////////////////

// SomeController       : MonsterController - MonsterService.getMonster(key)

// SomeService          : MonsterService - DataService.get('server/api/monster/someMonsterKey')

// DataService          : DataService - DataHander.get('server/api/monster/someMonsterKey')

// DataHandler          : MockDataHandler or LiveDataHandler - $.ajax({ method: 'GET', url: 'server/api/monster/someMonsterKey' })

//////////// API / SERVER //////////////

// Server               : MyServer - app.get('/server/api/monster/:id', monsterHandler.findById);

// someHandler          : monsterHandler - dataStoreService.findOne('monsters', id, ....);

// DataStoreService     : db.collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) { ...});

// Database             : { someMonsterKey: { name: 'Some Monster', .... } }