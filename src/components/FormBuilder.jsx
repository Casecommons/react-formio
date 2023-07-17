import React, {useEffect, useRef, useState, useCallback, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {FormBuilder as FormioFormBuilder} from 'formiojs';

const FormBuilder = (props) => {
  const builderRef = useRef();
  let element;
  const [pdfSrc, setPdfSrc] = useState(undefined);

  const emit = (funcName) => (...args) => {
    // eslint-disable-next-line no-prototype-builtins
    if (props.hasOwnProperty(funcName) && typeof (props[funcName]) === 'function') {
      props[funcName](...args);
    }
  };

  const onChange = () => {
    const {onChange: onFormChange} = props;
    if (onFormChange && typeof onFormChange === 'function') {
      onFormChange(builderRef.current.instance.form, builderRef.current.instance.schema);
    }
  };

  const builderEvents = [
    {name: 'saveComponent', action: emit('onSaveComponent')},
    {name: 'updateComponent', action: emit('onUpdateComponent')},
    {name: 'removeComponent', action: emit('onDeleteComponent')},
    {name: 'cancelComponent', action: emit('onUpdateComponent')},
    {name: 'editComponent', action: emit('onEditComponent')},
    {name: 'addComponent', action: onChange},
    {name: 'saveComponent', action: onChange},
    {name: 'updateComponent', action: onChange},
    {name: 'removeComponent', action: onChange},
    {name: 'deleteComponent', action: onChange},
    {name: 'pdfUploaded', action: onChange},
  ];

  const getPdfSrc = (providedForm) => {
    return providedForm && providedForm.display === 'pdf' && providedForm.settings && providedForm.settings.pdf ? providedForm.settings.pdf.src : undefined
  }

  const initializeBuilder = (builderProps) => {
    let {options, form} = builderProps;
    const {Builder} = builderProps;
    options = Object.assign({}, options);
    form = Object.assign({}, form);

    setPdfSrc(getPdfSrc(form));

    if (builderRef.current && builderRef.current.instance) {
      builderRef.current.instance.destroy(true);
    }

    builderRef.current = new Builder(element, form, options);

    builderRef.current.ready.then(() => {
      onChange();
      builderEvents.forEach(({name, action}) => builderRef.current.instance.on(name, action));
    });
  };

  useEffect(() => {
    initializeBuilder(props);
    return () => (builderRef.current ? builderRef.current.instance.destroy(true) : null);
  }, [builderRef]);

  const elementDidMount = useCallback((el) => element = el);

  useLayoutEffect(() => {
    if (builderRef.current && props.form && props.form.display) {
      builderRef.current.setDisplay(props.form.display);
    }
  }, [props.form.display]);

  useLayoutEffect(() => {
    if (builderRef.current && props.form && props.form.components) {
      builderRef.current.setForm(props.form);
    }
    const providedPdfSrc = getPdfSrc(props.form)
    if (props.form && (!builderRef.current || providedPdfSrc !== pdfSrc)) {
      initializeBuilder(props);
    }
  }, [props.form]);

  return (
    <div>
      <div ref={elementDidMount}></div>
    </div>
  );
};

FormBuilder.defaultProps = {
  options: {},
  Builder: FormioFormBuilder
};

FormBuilder.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onSaveComponent: PropTypes.func,
  onUpdateComponent: PropTypes.func,
  onDeleteComponent: PropTypes.func,
  onCancelComponent: PropTypes.func,
  onEditComponent: PropTypes.func,
  Builder: PropTypes.any
};

export default FormBuilder;
