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
