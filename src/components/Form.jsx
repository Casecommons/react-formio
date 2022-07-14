import React, {useEffect, useState} from 'react';
import _isEqual from 'lodash/isEqual';
import {Formio} from 'formiojs';
const FormioForm = Formio.Form;

 const Form = (props) => {
  let instance;
  let createPromise;
  let element;
  const [formio, setFormio] = useState(undefined);

  useEffect(() => () => formio ? formio.destroy(true) : null, [formio]);

  const createWebformInstance = (srcOrForm) => {
    const {options = {}, formioform, formReady} = props;
    instance = new (formioform || FormioForm)(element, srcOrForm, options);
    createPromise = instance.ready.then(formioInstance => {
      setFormio(formioInstance);
      if (formReady) {
        formReady(formioInstance);
      }
    });
  }

  const onAnyEvent = (event, ...args) => {
     if (event.startsWith('formio.')) {
      const funcName = `on${event.charAt(7).toUpperCase()}${event.slice(8)}`;
       // eslint-disable-next-line no-prototype-builtins
      if (props.hasOwnProperty(funcName) && typeof (props[funcName]) === 'function') {
        props[funcName](...args);
      }
    }
  }

  const initializeFormio = () => {
    const {submission} = props;
    if (createPromise) {
      instance.onAny(onAnyEvent);
      createPromise.then(() => {
        if (formio && submission) {
          formio.submission = submission;
        }

        return this.formio;
      });
    }

    this.initializeFormio();
  };

  useEffect(() => {
    const {src} = props;
    if (src) {
      createWebformInstance(src).then(() => {
        if (formio) {
          formio.src = src;
        }
      });
      initializeFormio();
    }
  }, [props.src]);

  useEffect(() => {
    const {form, url} = props;
    if (form) {
      createWebformInstance(form).then(() => {
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

  useEffect(() => {
    const {submission} = props;
    if (formio && submission && !_isEqual(formio.submission.data, submission.data)) {
      formio.submission = submission;
    }
  }, [props.submission, formio]);

  return <div ref={el => element = el} />;
};

export default Form;