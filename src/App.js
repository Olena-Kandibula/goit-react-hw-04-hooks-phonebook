import './App.css';
import React, { useState, useEffect } from 'react';

import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import contactsJson from './contacts.json';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLocal = localStorage.getItem('contacts');

    contactsLocal
      ? setContacts(JSON.parse(contactsLocal))
      : setContacts(contactsJson);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    return setContacts([data, ...contacts]);
  };

  const removeCoontactFromList = idRemoveContact => {
    return setContacts([
      ...contacts.filter(({ id }) => id !== idRemoveContact),
    ]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>

      <Container>
        <ContactForm onSubmit={formSubmitHandler}></ContactForm>
      </Container>

      <Container title="Contacts">
        <Filter filter={filter} onChangeFilter={changeFilter}>
          {' '}
        </Filter>

        {filter === '' ? (
          <ContactList
            contacts={contacts}
            onDeleteContact={removeCoontactFromList}
          ></ContactList>
        ) : (
          <ContactList
            contacts={visibleContacts()}
            onDeleteContact={removeCoontactFromList}
          ></ContactList>
        )}
      </Container>
    </div>
  );
}

export default App;
