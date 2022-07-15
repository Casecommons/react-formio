'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _formiojs = require('formiojs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormioForm = _formiojs.Formio.Form;

var Form = function Form(props) {
  var instance = void 0;
  var createPromise = void 0;
  var element = void 0;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      formio = _useState2[0],
      setFormio = _useState2[1];

  (0, _react.useEffect)(function () {
    return function () {
      return formio ? formio.destroy(true) : null;
    };
  }, [formio]);

  var createWebformInstance = function createWebformInstance(srcOrForm) {
    var _props$options = props.options,
        options = _props$options === undefined ? {} : _props$options,
        formioform = props.formioform,
        formReady = props.formReady;

    instance = new (formioform || FormioForm)(element, srcOrForm, options);
    createPromise = instance.ready.then(function (formioInstance) {
      setFormio(formioInstance);
      if (formReady) {
        formReady(formioInstance);
      }
    });
  };

  var onAnyEvent = function onAnyEvent(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (event.startsWith('formio.')) {
      var funcName = 'on' + event.charAt(7).toUpperCase() + event.slice(8);
      // eslint-disable-next-line no-prototype-builtins
      if (props.hasOwnProperty(funcName) && typeof props[funcName] === 'function') {
        props[funcName].apply(props, args);
      }
    }
  };

  var initializeFormio = function initializeFormio() {
    var submission = props.submission;

    if (createPromise) {
      instance.onAny(onAnyEvent);
      createPromise.then(function () {
        if (formio && submission) {
          formio.submission = submission;
        }

        return undefined.formio;
      });
    }

    undefined.initializeFormio();
  };

  (0, _react.useEffect)(function () {
    var src = props.src;

    if (src) {
      createWebformInstance(src).then(function () {
        if (formio) {
          formio.src = src;
        }
      });
      initializeFormio();
    }
  }, [props.src]);

  (0, _react.useEffect)(function () {
    var form = props.form,
        url = props.url;

    if (form) {
      createWebformInstance(form).then(function () {
        if (formio) {
          formio.form = form;
          if (url) {
            formio.url = url;
          }
          return formio;
        }
      });
    }
  }, [props.form, props.url]);

  (0, _react.useEffect)(function () {
    var submission = props.submission;

    if (formio && submission && !(0, _isEqual3.default)(formio.submission.data, submission.data)) {
      formio.submission = submission;
    }
  }, [props.submission, formio]);

  return _react2.default.createElement('div', { ref: function ref(el) {
      return element = el;
    } });
};

exports.default = Form;