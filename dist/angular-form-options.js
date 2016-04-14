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
      var firstInvalid = elem[0].querySelector('.ng-invalid');
      if (firstInvalid) {
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
            
            var resolveConfigSettings = function(){
              var customOptions = attrs.formOptions || '';
              // Allows options to be set on the controller or on $scope
              // Essentially allows for angular-form-options value to be set to "ctrl.options" or "options"
              var scopeOptions = customOptions.split('.').reduce(function(obj, key){
                return obj ? obj[key] : undefined;
              }, scope);

              if(scopeOptions){
                config = angular.extend(angularFormOptions.config, scopeOptions);
              }
            };

            scope.$on(angularFormOptions.config.FORM_VALIDATION_EVENT, function (){
              resolveConfigSettings();
              scrollTo(el, formCtrl, config);
            });

            el.bind('submit', function (){
              resolveConfigSettings();
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
      scrollToAndFocusFirstErrorOnSubmit: true,
      FORM_VALIDATION_EVENT: "FormValidated"
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
