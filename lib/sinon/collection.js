/**
 * @depend ../sinon.js
 * @depend stub.js
 * @depend mock.js
 */
/*jslint indent: 2, eqeqeq: false, onevar: false, forin: true*/
/*global module, require, sinon*/
/**
 * Collections of stubs, spies and mocks.
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

  if (!sinon) {
    return;
  }

  function getFakes(collection) {
    if (!collection.fakes) {
      collection.fakes = [];
    }

    return collection.fakes;
  }

  function each(collection, method) {
    var fakes = getFakes(collection);

    for (var i = 0, l = fakes.length; i < l; i += 1) {
      if (typeof fakes[i][method] == "function") {
        fakes[i][method]();
      }
    }
  }

  var collection = {
    verify: function resolve() {
      each(this, "verify");
    },

    restore: function restore() {
      each(this, "restore");
    },

    verifyAndRestore: function verifyAndRestore() {
      var exception;

      try {
        this.verify();
      } catch (e) {
        exception = e;
      }

      this.restore();

      if (exception) {
        throw exception;
      }
    },

    add: function add(fake) {
      getFakes(this).push(fake);

      return fake;
    },

    spy: function spy() {
      return this.add(sinon.spy.apply(sinon, arguments));
    },

    stub: function stub() {
      return this.add(sinon.stub.apply(sinon, arguments));
    },

    mock: function mock() {
      return this.add(sinon.mock.apply(sinon, arguments));
    },

    inject: function inject(obj) {
      var col = this;

      obj.spy = function () {
        return col.spy.apply(col, arguments);
      };

      obj.stub = function () {
        return col.stub.apply(col, arguments);
      };

      obj.mock = function () {
        return col.mock.apply(col, arguments);
      };

      return obj;
    }
  };

  if (commonJSModule) {
    module.exports = collection;
  } else {
    sinon.collection = collection;
  }
}(typeof sinon == "object" && sinon || null));
