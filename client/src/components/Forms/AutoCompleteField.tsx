import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Col, FormLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import {ErrorMessage, Field, FieldProps} from 'formik';

export interface TypeaheadOptions {
  id: string;
  value: string;
}

interface AutoCompleteFieldProps {
  name: string;
  label: string;
  data: TypeaheadOptions[];
  placeholder?: string;
  onChange: (value: string) => void;
}

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  name,
  label,
  placeholder,
  data,
  onChange,
}) => {
  // componentDidMount() {
  //     let api = this.props.api;
  //     if (this.props.api_id) api = this.props.api_id(this.props.id);
  //     this.props.getOptionsList(api, this.props.resource)
  // }
  //
  // render() {

  return (
    <Field placeholder={label} name={name}>
      {({
        field, // { name, value, onChange, onBlur }
      }: // form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      // meta,
      FieldProps) => (
        <Typeahead
          id={name}
          options={data}
          labelKey={'value'}
          multiple={false}
          onChange={selected => {
            const value = selected.length > 0 ? selected[0].id : '';
            console.log(value);
            onChange(value);
          }}
          onBlur={e => {
            console.log('BLUR', e);
            field.onBlur(name);
          }}
          placeholder={placeholder || label}

          // defaultSelected={data.filter(item => item.id === defaultItem)}
        />
      )}
    </Field>
  );
};

export default AutoCompleteField;
