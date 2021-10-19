import PropTypes from 'prop-types';

import React, { useState } from 'react';
import shortid from 'shortid';
import s from '../ContactForm/ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      name: name,
      number: number,
      id: shortid.generate(),
    };

    onSubmit(newContact);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={s.contactForm}>
      <label className={s.label}>
        Name:
        <input
          className={s.input}
          type="text"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleChange}
          placeholder="Tom Smit"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>

      <label className={s.label}>
        Number:
        <input
          className={s.input}
          type="tel"
          name="number"
          autoComplete="off"
          value={number}
          onChange={handleChange}
          placeholder="050-50-50"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>

      <input className={s.submitButton} type="submit" value="Add contact" />
    </form>
  );
  // }
}

ContactForm.prototypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
