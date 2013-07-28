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
angular.module( 'ngBoilerplate.product', [
  'ui.state',
  'directives.crud',
  'titleService',
  'restangular'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider, RestangularProvider ) {
  $stateProvider.state( 'product', {
    url: '/product',
    views: {
      "main": {
        controller: 'ProductCtrl',
        templateUrl: 'product/product.tpl.html'
      }
    }
  });

  RestangularProvider.setBaseUrl("https://api.mongolab.com/api/1/databases/haituanus/collections");
  RestangularProvider.setDefaultRequestParams({apiKey: "<APIKEY>"});
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
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ProductCtrl', function ProductController( $scope, $location, titleService, Restangular ) {
  titleService.setTitle( 'Product' );

  $scope.product = {
    title: "hello world!",
    images: [],
    colors: ['Red', 'White'],
    sizes: [],
    categories: [],
    tags: []
  };

  $scope.urlValue = undefined;
  $scope.addUrl = function() {
    if ($scope.urlValue) {
      $scope.product.images.push({url: $scope.urlValue});
      $scope.urlValue = undefined;
    }
  };

  $scope.save = function() {
    //$log.info(product);
    Restangular.all('products').post($scope.product).then(function(product) {
      $location.path('/');
    });
  };
})

;