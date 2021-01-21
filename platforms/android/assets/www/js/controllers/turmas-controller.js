angular.module('app').controller('TurmasController', function($scope, $location, $localForage) {
    $localForage.getItem('turmas').then(function(turmas){
        $scope.turmas = turmas
    });
    $scope.openTurma = function(turma){
        $location.path('chamada', {'turma': turma});
    }
});
