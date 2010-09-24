/**
 * @depend ../sinon.js
 * @depend test.js
 */
/*jslint indent: 2, eqeqeq: false, onevar: false*/
/*global module, require, sinon*/
/**
 * Test case, sandboxes all test functions
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @license BSD
 *
 * Copyright (c) 2010 Christian Johansen
 */
(function (sinon) {
  var commonJSModule = typeof module == "object" && typeof require == "function";

  if (!sinon && commonJSModule) {
    sinon = require("sinon");
  }

  if (!sinon || !Object.prototype.hasOwnProperty) {
    return;
  }

  function createTest(property, setUp, tearDown) {
    return function () {
      if (setUp) {
        setUp.apply(this, arguments);
      }

      var exception;

      try {
        property.apply(this, arguments);
      } catch (e) {
        exception = e;
      }

      if (tearDown) {
        tearDown.apply(this, arguments);
      }

      if (exception) {
        throw exception;
      }
    };
  }

  function testCase(tests, prefix) {
    if (tests == null || typeof tests != "object") {
      throw new TypeError("sinon.testCase needs an object with test functions");
    }

    prefix = prefix || "test";
    var rPrefix = new RegExp("^" + prefix);
    var methods = {}, testName, property, method;
    var setUp = tests.setUp;
    var tearDown = tests.tearDown;

    for (testName in tests) {
      if (tests.hasOwnProperty(testName)) {
        property = tests[testName];

        if (/^(setUp|tearDown)$/.test(testName)) {
          continue;
        }

        if (typeof property == "function" && rPrefix.test(testName)) {
          method = property;

          if (setUp || tearDown) {
            method = createTest(property, setUp, tearDown);
          }

          methods[testName] = sinon.test(method);
        }
      }
    }

    return methods;
  }

  if (commonJSModule) {
    module.exports = testCase;
  } else {
    sinon.testCase = testCase;
  }
}(typeof sinon == "object" && sinon || null));
