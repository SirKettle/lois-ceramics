'use strict';

var angular = require('angular');

var twitterService = require('./twitterService.js');

module.exports = angular.module('myApp.services.blogService', [
	twitterService.name
]).service('BlogService', function (
	$q,
	$http,
	$filter,

	TwitterService
) {

	return {
		getPosts: function () {
			var deferred = $q.defer();
			var posts = [];
			var useCache = true;
			var tweetsPromise = TwitterService.getTweets(useCache).then(function (tweets) {
				posts = posts.concat(tweets);
			});

			// the blog posts are a mixture of tumblr posts and tweets
			$q.allSettled([ tweetsPromise ]).finally(function () {
				// initially sort the posts chronologically- most recent first 
				posts = posts.sort(function (a, b) {
					return b.__props.timeStamp - a.__props.timeStamp;
				});

				deferred.resolve(posts);
			});

			return deferred.promise;
		}
	};
});
