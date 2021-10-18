import './App.css';
import React, { Component } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import contacts from './contacts.json';

class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  componentDidMount() {
    const contactsLocal = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsLocal);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  formSubmitHandler = data => {
    this.setState(({ contacts }) => {
      if (contacts.some(contact => contact.name.includes(data.name))) {
        return alert(`${data.name} is already in contacts!`);
      }

      return { contacts: [data, ...contacts] };
    });
  };

  removeCoontactFromList = idRemoveContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idRemoveContact),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = this.visibleContacts();

    return (
      <div className="App">
        <h1>Phonebook</h1>

        <Container>
          <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
        </Container>

        <Container title="Contacts">
          <Filter filter={filter} onChangeFilter={this.changeFilter}>
            {' '}
          </Filter>

          {this.state.filter === '' ? (
            <ContactList
              contacts={contacts}
              onDeleteContact={this.removeCoontactFromList}
            ></ContactList>
          ) : (
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.removeCoontactFromList}
            ></ContactList>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
