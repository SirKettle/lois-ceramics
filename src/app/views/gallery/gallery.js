'use strict';

var angular = require('angular');
var template = require('./gallery.html');

// sub components
var galleryComponent = require('../../components/gallery/gallery');
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.gallery', [
	galleryComponent.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewGallery', function (
) {

	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewGalleryCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {

		}
	};
})
.controller('MyViewGalleryCtrl', function (
	$scope
) {
	$scope.galleryData = [];

	$scope.galleryData.push({
		src: '/images/lois.jpg',
		alt: 'This is a lovely pic'
	});

	$scope.galleryData.push({
		src: '/images/bowls.jpg',
		alt: 'This is a lovely pic'
	});

	$scope.galleryData.push({
		src: '/images/Ickworth-wood-fair-Oct-2105.jpg',
		alt: 'This is a lovely pic'
	});

	$scope.galleryData.push({
		src: '/images/coffee.jpg',
		alt: 'This is a lovely pic'
	});

	$scope.galleryData.push({
		src: '/images/jugs.jpg',
		alt: 'This is a lovely pic'
	});

	$scope.galleryData.push({
		src: '/images/mugs1.jpg',
		alt: 'This is a lovely pic'
	});
});