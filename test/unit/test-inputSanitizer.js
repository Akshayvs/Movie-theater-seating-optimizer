'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var mockery = require('mockery');
var sinon = require('sinon');

describe('input sanitizer -test', function () {

    var seatAllotmentMock = sinon.spy();
    var inputSanitizer;

    before(' seting up mockery and testbed', function () {
        mockery.enable({useCleanCache: true});

    });

    beforeEach(function () {
        mockery.registerMock('./seatAllotment.js', seatAllotmentMock)
        mockery.registerAllowable('../../lib/inputSanitizer.js');

        inputSanitizer = require('../../lib/inputSanitizer.js');
    });

    afterEach(function () {
        mockery.deregisterMock('./seatAllotment.js');
        mockery.resetCache();
    });

    after(function () {

        mockery.deregisterAll();
        mockery.disable();

    });

    it('should make a call to `seatAllotment,js`  function', function () {
        var file = ['ROO1 5\n', 'ROO2 4\n', 'ROO3 17\n'];
        inputSanitizer(file);

        expect(seatAllotmentMock.callCount).to.equal(1);
    });

    it('should make a call to `seatAllotment,js`  function with correct parameters when a valid input is passed', function () {
        var file = ['ROO1 5\n', 'ROO2 4\n', 'ROO3 17\n'];
        var arr = [5, 4, 17];
        inputSanitizer(file);

        expect(seatAllotmentMock.calledWith(arr)).to.equal(true);
    });

    /* it ('should not make a call to seatAssigner if an invalid input is passed', function (){
     var file=[];
     inputSanitizer(file);
     expect(seatAllotmentMock.callCount).to.equal(0);
     });*/
});