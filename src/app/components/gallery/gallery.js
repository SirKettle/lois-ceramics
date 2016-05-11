'use strict';

var angular = require('angular');
var Flickity = require('flickity');
var angularFlickity = require('angular-flickity');
var $ = require('jquery');
var template = require('./gallery.html');

module.exports = angular.module('myApp.components.gallery', [
	'bc.Flickity'
])
.directive('myGallery', function (

) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyGalleryCtrl',
		replace: true,
		scope: {
			model: '=?'
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyGalleryCtrl', function (
	$scope,
	$document,
	$timeout,
	FlickityService
) {
	// FlickityService
	$scope.flickityOptions = {
		cellSelector: '.gallery-cell',
		lazyLoad: 1,
		imagesLoaded: true,
		wrapAround: true
	};

});