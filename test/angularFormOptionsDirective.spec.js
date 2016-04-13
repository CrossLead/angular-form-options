describe('a form', function() {
    'use strict';

    var scope,
        $rootScope,
        $compile,
        angularFormOptions;

    var checkSpecifiedInputFocusWasSet = function(inputs, inputIndex){
        angular.forEach(inputs, function(inputItem, i){
          if(i === inputIndex){
            inputItem.focus.calledOnce.should.equal(true);
          }
          else{
            inputItem.focus.calledOnce.should.equal(false);
          }
        });
    };

    beforeEach(module('angularFormOptions'));

    beforeEach(inject(function(_$rootScope_, _$compile_, _angularFormOptions_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        scope = $rootScope.$new();
        angularFormOptions = _angularFormOptions_;
    }));

    describe('with autofocus errors and custom options specified on the scope', function() {
        var element, form, input;
        beforeEach(function() {
            var html = '<form name="myTest" form-options="customFormOptions">' +
                '<input type="text" name="testModel0" ng-model="testModel0" required>' +
                '<input type="text" name="testModel1" ng-model="testModel1" required>' +
                '<input type="text" name="testModel2" ng-model="testModel2" required>' +
                '<textarea name="testModel3" ng-model="testModel3" required></textarea>' +
                '<select name="testModel4" ng-model="testModel4" required>' +
                '<option value="test1">Test Value 1</option><option value="test2">Test Value 2</option>' +
                '</select>' +
                '</form>';
            element = $compile(html)(scope);
            scope.$digest();

            form = element.controller('form');
            input = element.find('input');
            input.push.apply(input, element.find('textarea'));
            input.push.apply(input, element.find('select'));

            sinon.spy(input[0], 'focus');
            sinon.spy(input[1], 'focus');
            sinon.spy(input[2], 'focus');
            sinon.spy(input[3], 'focus');
            sinon.spy(input[4], 'focus');

            scope.customFormOptions = {
                scrollToAndFocusFirstErrorOnSubmit: true
            };
        });

        it('should focus the first error-element(0) on submit', function() {
            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 0);
        });

        it('should focus the first error-element(1) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 1);
        });

        it('should focus the first error-element(2) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');

            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 2);
        });

        it('should focus the first textarea-element(3) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');
            form.testModel2.$setViewValue('input 3');

            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 3);
        });

        it('should focus the first select-element(4) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');
            form.testModel2.$setViewValue('input 3');
            form.testModel3.$setViewValue('input 4');

            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 4);
        });

        it('should not focus any error element, if OPTION is deactivated via scope', function() {
            scope.customFormOptions.scrollToAndFocusFirstErrorOnSubmit = false;
            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, -1);
        });

        it('should focus the first error-element(2) on broadcast of FORM_VALIDATION_EVENT', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');

            scope.$broadcast(angularFormOptions.config.FORM_VALIDATION_EVENT);
            checkSpecifiedInputFocusWasSet(input, 2);
        });

        it('should allow FORM_VALIDATION_EVENT to be customized', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');

            scope.customFormOptions.FORM_VALIDATION_EVENT = "myEvent";
            scope.$broadcast(angularFormOptions.config.FORM_VALIDATION_EVENT);
            checkSpecifiedInputFocusWasSet(input, 2);
        });

    });

    describe('with autofocus errors and custom options specified on the controller', function() {

        var element, form, input;
        beforeEach(function() {
            var html = '<form name="myTest" form-options="myTest.customOptions">' +
                '<input type="text" name="testModel0" ng-model="testModel0" required>' +
                '<input type="text" name="testModel1" ng-model="testModel1" required>' +
                '<input type="text" name="testModel2" ng-model="testModel2" required>' +
                '</form>';
            element = $compile(html)(scope);
            scope.$digest();

            form = element.controller('form');
            input = element.find('input');

            sinon.spy(input[0], 'focus');
            sinon.spy(input[1], 'focus');
            sinon.spy(input[2], 'focus');
        });

        it('should not focus any error element, if OPTION is deactivated via controller', function() {
          form.customOptions= { scrollToAndFocusFirstErrorOnSubmit: false};
          element.triggerHandler('submit');
          checkSpecifiedInputFocusWasSet(input, -1);
        });

    });

    describe('with autofocus errors and no custom options specified', function() {
        var element, form, input;
        beforeEach(function() {
            var html = '<form name="myTest" form-options>' +
                '<input type="text" name="testModel0" ng-model="testModel0" required>' +
                '<input type="text" name="testModel1" ng-model="testModel1" required>' +
                '<input type="text" name="testModel2" ng-model="testModel2" required>' +
                '</form>';
            element = $compile(html)(scope);
            scope.$digest();

            form = element.controller('form');
            input = element.find('input');

            sinon.spy(input[0], 'focus');
            sinon.spy(input[1], 'focus');
            sinon.spy(input[2], 'focus');
        });

        it('should focus the first error-element(0) on submit', function() {
            element.triggerHandler('submit');
            checkSpecifiedInputFocusWasSet(input, 0);
        });

    });
});
