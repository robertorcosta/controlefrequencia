angular.module('app').controller('ChamadaController', function($scope, $stateParams, $location, $localForage) {

    $scope.data = moment().format('DD/MM/YYYY');

    if ($stateParams.turma) {
        $scope.turma = $stateParams.turma;
    } else {
        alert('Turma não encontrada', function(){
            $location.path('turmas');
        })
    }

    $localForage.getItem('presencas').then(function(presencas){
        if (presencas){
            $scope.presencas = presencas;
        } else {
            $scope.presencas = []
        }
    })

    $scope.changeHorario = function(){
        var filter = $scope.presencas.filter(function(presenca){
            if ($scope.horario == "5"){
                if (presenca.turma == $scope.turma.nome && presenca.data == $scope.data && (presenca.horario == 1 || presenca.horario == 2)){
                    return true;
                }
            } else if ($scope.horario == "6"){
                if (presenca.turma == $scope.turma.nome && presenca.data == $scope.data && (presenca.horario == 3 || presenca.horario == 4)){
                    return true;
                }
            } else {
                if (presenca.turma == $scope.turma.nome && presenca.data == $scope.data && presenca.horario == $scope.horario){
                    return true;
                }
            }
        })
        if (filter.length){
            alert('Já existe prensença salva pra esse horário')
            $scope.horario = "";
        }
    }

    $scope.salvar = function(){
        if (!$scope.horario){
            alert('Informe o horário')
        } else {
            var alunos = $scope.turma.turma.filter(function(item){
                return item.check;
            })
            if (alunos.length){
                var presenca = {};
                presenca.data = $scope.data;
                if ($scope.horario == "5") {
                    presenca.turma = $scope.turma.nome;
                    presenca.horario = 1;
                    $scope.presencas.push(presenca)
                    var presenca2 = {}
                    presenca2.data = $scope.data;
                    presenca2.turma = $scope.turma.nome;
                    presenca2.horario = 2;
                    $scope.presencas.push(presenca2)
                    $localForage.setItem('presencas', $scope.presencas).then(function(){
                        alert('Presença salva com sucesso!')
                        $location.path('turmas')
                    })
                } else if ($scope.horario == "6") {
                    presenca.turma = $scope.turma.nome;
                    presenca.horario = 3;
                    $scope.presencas.push(presenca)
                    var presenca2 = {}
                    presenca2.data = $scope.data;
                    presenca2.turma = $scope.turma.nome;
                    presenca2.horario = 4;
                    $scope.presencas.push(presenca2)
                    $localForage.setItem('presencas', $scope.presencas).then(function(){
                        alert('Presença salva com sucesso!')
                        $location.path('turmas');
                    })
                } else {
                    presenca.turma = $scope.turma.nome;
                    presenca.horario = parseInt($scope.horario);
                    $scope.presencas.push(presenca)
                    $localForage.setItem('presencas', $scope.presencas).then(function(){
                        alert('Presença salva com sucesso!')
                        $location.path('turmas');
                    })
                }
            } else {
                var r = confirm("Nenhum aluno marcado como presente. Deseja continuar?");
                if (r == true) {
                    //caso clique para substituir a turma, rodar o código abaixo
                    turmas.forEach(function(item){
                        if (item.nome == $scope.nome_turma){
                            item = turma;
                        }
                    });
                    $localForage.setItem('turmas', turmas).then(function(ret){
                        alert('Importado com sucesso');
                    });
                }
            }
        }
    }

});
