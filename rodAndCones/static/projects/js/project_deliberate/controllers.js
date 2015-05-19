var App = angular.module('App');

App.controller('TopicListCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('../static/projects/js/project_deliberate/topic_data/all_data.json').success(function(data) {
		$scope.topics = data;
	});
}]);