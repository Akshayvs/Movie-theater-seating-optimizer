'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var mockery = require('mockery');
var sinon = require('sinon');

describe('outputSanitizer - Unit test', function () {

    var outputSanitizer;
    var fileWriterMock=sinon.spy();

    before(' seting up mockery and testbed', function () {
        mockery.enable({useCleanCache: true});

    });

    beforeEach(function () {
        mockery.registerMock('./fileWriter.js', fileWriterMock)
        mockery.registerAllowable('../../lib/outputSanitizer.js');

        outputSanitizer = require('../../lib/outputSanitizer.js');
    });

    afterEach(function () {
        mockery.deregisterMock('./fileWriter.js');
        mockery.resetCache();
    });

    after(function () {

        mockery.deregisterAll();
        mockery.disable();

    });


    it('should make a call to `fileWriter,js`  function', function () {
        var outputArray= ['J0, J2', 'K12', 'B1, B2'];
        outputSanitizer(outputArray);
        expect(fileWriterMock.callCount).to.equal(1);
    });

    it('should make a call to `fileWriter,js`  function with correct arguments', function () {
        var outputArray= ['J0, J2', 'K12', 'B1, B2'];
        var expectedOutput= ["R001 J0, J2", "R002 K12", "R003 B1, B2"];
        outputSanitizer(outputArray);

        expect(fileWriterMock.calledWith(expectedOutput)).to.equal(true);
    });
});