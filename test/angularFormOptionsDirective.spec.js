describe('a form', function() {
    'use strict';

    var scope,
        $rootScope,
        $compile;

    beforeEach(module('angularFormOptions'));

    beforeEach(inject(function(_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        scope = $rootScope.$new();
    }));

    describe('with autofocus errors', function() {
        var element, form, input;
        beforeEach(function() {
            var html = '<form name="myTest" form-options="customFormOptions">' +
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

            scope.customFormOptions = {
                scrollToAndFocusFirstErrorOnSubmit: true
            };
        });

        it('should focus the first error-element(0) on submit', function() {
            element.triggerHandler('submit');
            input[0].focus.calledOnce.should.equal(true);
            input[1].focus.calledOnce.should.equal(false);
            input[2].focus.calledOnce.should.equal(false);
        });

        it('should focus the first error-element(1) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            element.triggerHandler('submit');
            input[0].focus.calledOnce.should.equal(false);
            input[1].focus.calledOnce.should.equal(true);
            input[2].focus.calledOnce.should.equal(false);
        });

        it('should focus the first error-element(2) on submit', function() {
            form.testModel0.$setViewValue('input 1');
            form.testModel1.$setViewValue('input 2');

            element.triggerHandler('submit');
            input[0].focus.calledOnce.should.equal(false);
            input[1].focus.calledOnce.should.equal(false);
            input[2].focus.calledOnce.should.equal(true);
        });

        it('should not focus any error element, if OPTION is deactivated', function() {
            scope.customFormOptions.scrollToAndFocusFirstErrorOnSubmit = false;
            element.triggerHandler('submit');
            input[0].focus.calledOnce.should.equal(false);
            input[1].focus.calledOnce.should.equal(false);
            input[2].focus.calledOnce.should.equal(false);
        });
    });
});
