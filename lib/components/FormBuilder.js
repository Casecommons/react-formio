'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lib = require('formiojs/lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormBuilder = function FormBuilder(props) {
  var builderRef = (0, _react.useRef)();
  var element = void 0;

  var emit = function emit(funcName) {
    return function () {
      // eslint-disable-next-line no-prototype-builtins
      if (props.hasOwnProperty(funcName) && typeof props[funcName] === 'function') {
        props[funcName].apply(props, arguments);
      }
    };
  };

  var onChange = function onChange() {
    var onFormChange = props.onChange;

    if (onFormChange && typeof onFormChange === 'function') {
      onFormChange(builderRef.current.instance.form, builderRef.current.instance.schema);
    }
  };

  var builderEvents = [{ name: 'saveComponent', action: emit('onSaveComponent') }, { name: 'updateComponent', action: emit('onUpdateComponent') }, { name: 'removeComponent', action: emit('onDeleteComponent') }, { name: 'cancelComponent', action: emit('onUpdateComponent') }, { name: 'editComponent', action: emit('onEditComponent') }, { name: 'addComponent', action: onChange }, { name: 'saveComponent', action: onChange }, { name: 'updateComponent', action: onChange }, { name: 'removeComponent', action: onChange }, { name: 'deleteComponent', action: onChange }, { name: 'pdfUploaded', action: onChange }];

  var initializeBuilder = function initializeBuilder(builderProps) {
    var options = builderProps.options,
        form = builderProps.form;
    var Builder = builderProps.Builder;

    options = Object.assign({}, options);
    form = Object.assign({}, form);

    builderRef.current = new Builder(element, form, options);

    builderRef.current.ready.then(function () {
      onChange();
      builderEvents.forEach(function (_ref) {
        var name = _ref.name,
            action = _ref.action;
        return builderRef.current.instance.on(name, action);
      });
    });
  };

  (0, _react.useEffect)(function () {
    initializeBuilder(props);
    return function () {
      return builderRef.current ? builderRef.current.instance.destroy(true) : null;
    };
  }, [builderRef]);

  var elementDidMount = (0, _react.useCallback)(function (el) {
    return element = el;
  });

  (0, _react.useLayoutEffect)(function () {
    if (builderRef.current && props.form && props.form.display) {
      builderRef.current.setDisplay(props.form.display);
    }
  }, [props.form.display]);

  (0, _react.useLayoutEffect)(function () {
    if (builderRef.current && props.form && props.form.components) {
      builderRef.current.setForm(props.form);
    }
    if (!builderRef.current && props.form) {
      initializeBuilder(props);
    }
  }, [props.form]);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('div', { ref: elementDidMount })
  );
};

FormBuilder.defaultProps = {
  options: {},
  Builder: _lib.FormBuilder
};

FormBuilder.propTypes = {
  form: _propTypes2.default.object,
  options: _propTypes2.default.object,
  onSaveComponent: _propTypes2.default.func,
  onUpdateComponent: _propTypes2.default.func,
  onDeleteComponent: _propTypes2.default.func,
  onCancelComponent: _propTypes2.default.func,
  onEditComponent: _propTypes2.default.func,
  Builder: _propTypes2.default.any
};

exports.default = FormBuilder;