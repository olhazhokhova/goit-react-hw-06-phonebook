import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import s from './AddContacts.module.css';
import { addContact } from 'redux/contactSlice';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: Yup.string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const AddContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.items.items);

  const handleSubmit = (values, { resetForm }) => {
    const isContactExist = contacts.some(contact => {
      return contact.name.toLowerCase().includes(values.name.toLowerCase());
    });
    if (isContactExist) {
      alert(`${values.name} is already in contacts`);
      resetForm();
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <div className={s.formWrap}>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name">
            {msg => <div style={{ color: 'red', fontSize: '13px' }}>{msg}</div>}
          </ErrorMessage>
          <label htmlFor="name">Number</label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number">
            {msg => <div style={{ color: 'red', fontSize: '13px' }}>{msg}</div>}
          </ErrorMessage>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
};

AddContacts.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddContacts;
