'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var mockery = require('mockery');
var sinon = require('sinon');

describe('input sanitizer -test', function () {
    var fileWriter;
    var error = {
        message: 'bam'
    }
    var fsMock = {
        writeFile: sinon.stub().returns(error)
    }

    before(' seting up mockery and testbed', function () {
        mockery.enable({useCleanCache: true});
    });
    beforeEach(function () {
        mockery.registerMock('fs', fsMock)
        mockery.registerAllowable('../../lib/filewriter.js');

        fileWriter = require('../../lib/filewriter.js');
    });
    afterEach(function () {
        mockery.deregisterMock('fs');
        mockery.resetCache();
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should make a call to fs mock', function () {
        var finalArray = ['R001 J1,J2', 'R002 K1,K2', 'R003 A1,A2'];
        fileWriter(finalArray)
        expect(fsMock.writeFile.callCount).to.equal(1);
        fsMock.writeFile.reset();
    });

    it('should make a call to fs mock with correct parameters', function () {
        var finalArray = ['R001 J1,J2', 'R002 K1,K2', 'R003 A1,A2'];
        fileWriter(finalArray)
        expect(fsMock.writeFile.callCount).to.equal(1);
        fsMock.writeFile.reset();
    });

});