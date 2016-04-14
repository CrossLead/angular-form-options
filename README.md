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
  scrollToAndFocusFirstErrorOnSubmit: true,
  FORM_VALIDATION_EVENT: "FormValidated"
}
```

##Event Handling
The ```scrollToAndFocusFirstErrorOnSubmit``` behavior is triggered when the form's submit event is fired, however, you may also trigger it by emitting the supplied ```FORM_VALIDATION_EVENT``` event.  
>**Note:** You may also change this option via the configuration object.
