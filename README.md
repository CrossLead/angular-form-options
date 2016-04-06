#form-options

##Usage:
```html
<form form-options="customFormOptions"></form>
```
```javascript
angular.module('app').controller('myController', function($scope){
  $scope.customFormOptions = {
    scrollToAndFocusFirstErrorOnSubmit: true
  };
});
```

###You can also configure the options globally:
```javascript
angular.module('app', ['angularFormOptions']).
  config(function (angularFormOptionsProvider) {

    angularFormOptionsProvider.extendConfig({
      scrollToAndFocusFirstErrorOnSubmit: false
    });
  )};
```

>**Note:** Controller level settings will take precedence over global settings.

#Default Configuration
```javascript
{
  scrollToAndFocusFirstErrorOnSubmit: true
}
```