'use strict';


describe('input sanitizer -test', function () {
    var expect = require('chai').expect;
    var mockery = require('mockery');
    var sinon = require('sinon');
    var outputSanitizerMock= sinon.stub();
    var seatAllotment;

    before(' seting up mockery and testbed', function () {
        mockery.enable({useCleanCache: true});
    });

    beforeEach(function () {
        mockery.registerMock('./outputSanitizer.js', outputSanitizerMock)
        mockery.registerAllowable('../../lib/seatAllotment.js');
        seatAllotment= require('../../lib/seatAllotment.js');
    });

    afterEach(function () {
        mockery.deregisterMock('./outputSanitizer.js');
        mockery.resetCache();
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should make a call to `outputSanitizer()` when a valid input is recieved' , function (){
        var inputArr= [4,1,5,3];
        seatAllotment(inputArr);
        expect(outputSanitizerMock.callCount).to.equal(1);
        outputSanitizerMock.reset(); //because hooks are failing
    });

    it('should make a call to `outputSanitizer()` even if requested seats are more than available seats ' , function (){
        var inputArr= [4,1,5000000];
        seatAllotment(inputArr);
        expect(outputSanitizerMock.callCount).to.equal(1);
        outputSanitizerMock.reset();
    });

    it('should make a call to `outputSanitizer()` when `randomSeats()` function is invoked' , function (){
        var inputArr= [18,18,18,18,18,18,18,18,18,18,5];
        seatAllotment(inputArr);
        expect(outputSanitizerMock.callCount).to.equal(1);
    });
});