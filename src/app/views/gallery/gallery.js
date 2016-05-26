'use strict';

var angular = require('angular');
var template = require('./gallery.html');

var blogService = require('../../services/blogService');
// sub components
var galleryComponent = require('../../components/gallery/gallery');
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.gallery', [
	blogService.name,
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
			controller.getBlogPosts().then(function (posts) {
				scope.galleryData = scope.staticGalleryData.concat(
					posts.filter(function (post) {
						return Boolean(post.__props.imageModel);
					})
					.map(function (post) {
						return {
							src: post.__props.imageModel.url,
							alt: 'twitter picture'
						}
					})
				);
			});
		}
	};
})
.controller('MyViewGalleryCtrl', function (
	$scope,
	BlogService
) {
	var self = this;

	this.getBlogPosts = function (params) {
		return BlogService.getPosts();
	};
	
	$scope.staticGalleryData = [{
		src: '/images/lois.jpg',
		alt: 'This is a lovely pic'
	},{
		src: '/images/bowls.jpg',
		alt: 'This is a lovely pic'
	},{
		src: '/images/Ickworth-wood-fair-Oct-2105.jpg',
		alt: 'This is a lovely pic'
	},{
		src: '/images/coffee.jpg',
		alt: 'This is a lovely pic'
	},{
		src: '/images/jugs.jpg',
		alt: 'This is a lovely pic'
	},{
		src: '/images/mugs1.jpg',
		alt: 'This is a lovely pic'
	}];
});