angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.product',
  'ngBoilerplate.about',
  'ui.state',
  'ui.route'
])

.constant('MONGOLAB_CONFIG', {
  baseUrl: 'https://api.mongolab.com/api/1/',
  dbName: 'haituanus',
  apiKey: '<APIKEY>'
})

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | haituan.us' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

