angular.module('app').controller('ImportController', function($scope, $location, $http, $localForage) {
    $scope.import = function() {
        if ($scope.nome_turma){
            window.plugins.mfilechooser.open(['.csv'], function(uri) {
                console.log(uri);
                $http({
                    method: 'GET',
                    url: uri,
                }).then(function(returnApi){
                    console.log(returnApi);
                    var turma = {
                        nome: $scope.nome_turma,
                        turma: csvJSON(returnApi.data)
                    }
                    $localForage.getItem('turmas').then(function(turmas){
                        if(turmas){
                            $scope.umaTurmaSo = turmas.filter(function(item){
                                if (item.nome == $scope.nome_turma){
                                    return item;
                                }
                            });
                            //verifica se já existe, criar modal pra perguntar se vai substituir
                            if ($scope.umaTurmaSo.length > 0){
                                var r = confirm("Turma já importada. Deseja substituir?");
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
                            } else {
                                turmas.push(turma);
                                $localForage.setItem('turmas', turmas).then(function(ret){
                                    alert('Importado com sucesso');
                                });
                            }
                        } else {
                            var listturmas = [];
                            listturmas.push(turma);
                            $localForage.setItem('turmas', listturmas).then(function(ret){
                                alert('Importado com sucesso');
                            });
                        }
                    });

                    ///código acima é de uma tela

                    //código abaixo em outra tela
                    //Pegar todas as turmas
                    // $localForage.getItem('turmas').then(function(turmasRet){
                    //     $scope.listTurmas = turmasRet;
                    //     $scope.umaTurmaSo = turmasRet.filter(function(item){
                    //         if (item.nome == 'nome que eu quero'){
                    //             return item;
                    //         }
                    //     });
                    // });
                }, function(error){
                    alert(error);
                });

            }, function(error) {

                alert(error);

            });
        } else {
            alert('Informe o nome da turma');
        }
    }
});
