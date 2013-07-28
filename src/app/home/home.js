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
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, titleService ) {
  titleService.setTitle( 'Home' );

  // Load products on startup
  $scope.products = [{
    _id: 1,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 2,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/c1cda950-fbd4-4adf-b5c3-3d90f6ecb014/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 3,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 4,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 5,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 4,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  },{
    _id: 5,
    images: [{
      kind: "cover",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    },
    {
      kind: "thumbnail",
      url: "https://a1.lscdn.net/imgs/6c7da764-9b55-4087-8def-02aa023ef25f/1150_q75_.jpg"
    }]
  }
  ];
})

;

