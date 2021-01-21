angular.module('app').controller('InicioController', function($scope, $location) {
    $scope.criarturma = function() {
        $location.path('criarturma');
    }
    $scope.telaChamada = function() {
        $location.path('turmas');
    }
});
