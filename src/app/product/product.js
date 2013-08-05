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
angular.module( 'boilerplate.product', [
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
.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', function( $stateProvider, $urlRouterProvider, RestangularProvider) {
  $urlRouterProvider.otherwise("/product");

  $stateProvider
    .state( 'product', {
      url: '/product',
      abstract: true,
      views: {
        "main": {
          controller: 'ProductListCtrl',
          templateUrl: 'product/list.tpl.html'
        }
      }
    })
    .state('product.list', {
      // parent: 'product',
      url: '',
      views: {
        "main": {
          controller: 'ProductListCtrl',
          templateUrl: 'product/list.tpl.html'
        }
      }
    })
    .state('product.create', {
      // parent: 'product'
      url: '/create',
      views: {
        "main@": {
          controller: 'ProductCreateCtrl',
          templateUrl: 'product/create.tpl.html'
        }
      }
    })
    .state('product.edit', {
      // parent: 'product'
      url: '/edit/:productId',
      resolve: {
        product: ['Restangular', '$stateParams', function(Restangular, $stateParams) {
          return Restangular.one('products', $stateParams.productId).get();
        }]
      },
      views: {
        "main@": {
          controller: 'ProductEditCtrl',
          templateUrl: 'product/create.tpl.html'
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
.controller( 'ProductCtrl', ['$scope', '$location', 'titleService', 'Restangular', function( $scope, $location, titleService, Restangular ) {
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
    Restangular.all('products').post($scope.product).then(function(product) {
      $location.path('/');
    });
  };
}])

.controller( 'ProductListCtrl', ['$scope', '$state', 'Restangular', function( $scope, $state, Restangular ) {
  $scope.products = Restangular.all("products").getList();

  $scope.edit = function(id) {
    $state.transitionTo('product.edit', {productId: id});
  };

  $scope.create = function() {
    $state.transitionTo('product.create');
  };
}])

.controller( 'ProductCreateCtrl', ['$scope', '$state', 'Restangular', function( $scope, $state, Restangular ) {
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
    Restangular.all('products').post($scope.product).then(function(product) {
      $state.transitionTo('product.list');
    });
  };
}])

.controller( 'ProductEditCtrl', ['$scope', '$state', 'Restangular', 'product', function( $scope, $state, Restangular, product) {
  var original = product;
  $scope.product = Restangular.copy(original);

  $scope.isClean = function() {
    return angular.equals(original, $scope.product);
  };

  $scope.destroy = function() {
    original.remove().then(function() {
      //$location.path('/list');
      $state.transitionTo('product.list');
    });
  };

  $scope.urlValue = undefined;
  $scope.addUrl = function() {
    if ($scope.urlValue) {
      $scope.product.images.push({url: $scope.urlValue});
      $scope.urlValue = undefined;
    }
  };

  $scope.save = function() {
    $scope.product.put().then(function(){
      //$location.path('/list');
      $state.transitionTo('product.list');
    });
  };
}])

;

//ProductController.$inject = ['$scope', '$location', 'titleService', 'Restangular'];
//ProductListController.$inject = ['$scope', '$state', 'Restangular'];
//ProductCreateContoller.$inject = ['$scope', '$state', 'Restangular'];
//ProductEditController.$inject = ['$scope', '$state', 'Restangular', 'product'];
