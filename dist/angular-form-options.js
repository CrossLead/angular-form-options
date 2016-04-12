(function(){
  angular.module('angularFormOptions', []);
})();

(function(){
  'use strict';

  var angularFormOptionsDirective = function(angularFormOptions){

    var scrollTo = function(elem, formCtrl, config){
      if(!config.scrollToAndFocusFirstErrorOnSubmit){
        return;
      }

      // Find first input field with the .ng-invalid class and scrolls to and focuses on it
      var firstInvalid = elem[0].querySelector('input.ng-invalid');
      if (firstInvalid && formCtrl.$invalid) {
        firstInvalid.focus();
      }
    };

    return {
      restrict: 'A',
      scope: false,
      require: '?^form',
      compile: function(el, attrs){
        var config = angular.copy(angularFormOptions.config);

        return {
          pre: function (scope, el, attrs, formCtrl){
            el.bind('submit', function (){

              // Allows options to be set on the controller or on $scope
              // Essentially allows for angular-form-options value to be set to "ctrl.options" or "options"
              var scopeOptions = attrs.formOptions.split('.').reduce(function(obj, key){
                return obj[key];
              }, scope);

              if(attrs.formOptions && scopeOptions){
                config = angular.extend(angularFormOptions.config, scopeOptions);
              }

              scrollTo(el, formCtrl, config);
            });
          }
        };
      }
    };
  };

  angular.module('angularFormOptions')
    .directive('formOptions', ['angularFormOptions', angularFormOptionsDirective]);
})();

(function(){
  'use strict';

  var angularFormOptionsProvider = function(){

    /* Default Config Options */
    var config = {
      scrollToAndFocusFirstErrorOnSubmit: true
    };

    return {
      extendConfig: function(newConfig){
        angular.extend(config, newConfig);
      },
      $get: function(){
        return {
          config: config
        };
      }
    };
  };

  angular.module('angularFormOptions')
    .provider('angularFormOptions', angularFormOptionsProvider);
})();
