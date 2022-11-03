import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const inputFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const addContact = obj => {
    if (contacts.find(contact => contact.name === obj.name)) {
      alert(obj.name + ' is already in contacts.');
      return;
    }
    setContacts(pS => [...pS, { id: nanoid(), ...obj }]);
  };
  useEffect(() => {
    const contactsFromLocalStorage = JSON.parse(
      localStorage.getItem('contacts')
    );
    if (contactsFromLocalStorage) {
      setContacts(contactsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter inputFilter={inputFilter} value={filter} />
      <ContactList filtered={filterContacts()} deleteContact={deleteContact} />
    </div>
  );
};