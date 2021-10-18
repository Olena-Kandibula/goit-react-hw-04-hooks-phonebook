import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import s from '../ContactForm/ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });

    // this.setState({[e.currentTarget.name]: e.currentTarget.value, });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: shortid.generate(),
    };

    // this.props.onSubmit(this.state);
    this.props.onSubmit(newContact);
    this.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.contactForm}>
        <label className={s.label}>
          Name:
          <input
            className={s.input}
            type="text"
            name="name"
            autoComplete="off"
            value={this.state.name}
            onChange={this.handleChange}
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
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="050-50-50"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>

        <input className={s.submitButton} type="submit" value="Add contact" />
      </form>
    );
  }
}

ContactForm.prototypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
