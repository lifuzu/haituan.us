/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.state',
  'titleService',
  'plusOne',
  'restangular'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(['$stateProvider', 'RestangularProvider', function( $stateProvider, RestangularProvider ) {
  $stateProvider
    .state( 'home', {
      url: '/home',
      views: {
        "main": {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      }
    })
    .state( 'detail', {
      url: '/detail/:productId',
      resolve: {
        product: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('products', $stateParams.productId).get();
        }]
      },
      views: {
        "main": {
          controller: 'DetailCtrl',
          templateUrl: 'home/detail.tpl.html'
        }
      }
    });

  // TODO: declaration the sensitive information here now, later move to app.js, and then server side
  MONGOLAB_CONFIG = {
    baseUrl: 'https://api.mongolab.com/api/1/',
    dbName: 'haituanus',
    apiKey: '<APIKEY>'
  };

  RestangularProvider.setBaseUrl(MONGOLAB_CONFIG.baseUrl + "databases/" + MONGOLAB_CONFIG.dbName + "/collections");
  RestangularProvider.setDefaultRequestParams({apiKey: MONGOLAB_CONFIG.apiKey});
  RestangularProvider.setRestangularFields({
    id: '_id.$oid'
  });
  RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
    if (operation === 'put') {
      elem._id = undefined;
      return elem;
    }
    return elem;
  });
}]).run([
  '$rootScope', '$state', '$stateParams', function( $rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
])

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ['$scope', 'titleService', 'Restangular', function( $scope, titleService, Restangular ) {
  titleService.setTitle( 'Home' );

  // Load products on startup
  $scope.products = Restangular.all("products").getList();
}])

.controller( 'DetailCtrl', ['$scope', 'titleService', 'Restangular', 'product', function( $scope, titleService, Restangular, product ) {
  titleService.setTitle( 'Detail' );

  // Load the detail of the product
  $scope.product = product;
}])

;

//HomeController.$inject = ['$scope', 'titleService', 'Restangular'];
//DetailCtrl.$inject = ['$scope', 'titleService', 'Restangular', 'product'];
