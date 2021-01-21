angular.module('app', ['ui.router', 'LocalForageModule'])
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');

    $stateProvider
        .state('default', {
          url: '/',
          templateUrl: 'inicio.html',
          controller: 'InicioController'
        })
        .state('criarturma', {
          url: '/criarturma',
          templateUrl: 'criarturma.html',
          controller: 'ImportController'
        })
        .state('turmas', {
          url: '/turmas',
          templateUrl: 'telachamada.html',
          controller: 'TurmasController'
        })
        .state('chamada', {
          url: '/chamada',
          templateUrl: 'chamada.html',
          controller: 'ChamadaController',
          params: {
            turma: null
          }
      });
    }).config(function($localForageProvider) {
      // configure provider localForage
      $localForageProvider.config({
        name: 'app', // name of the database and prefix for your data
        description: ''
      });
      /**
       * create below an example of data structure for future consulting
       */
      var localData = {};
    });
