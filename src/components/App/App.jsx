import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import css from './App.module.css'
export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  }
  componentDidMount() {

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({contacts});
    }
  }

  addContact = (obj) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === obj.name)) {
      alert(obj.name + ' is already in contacts.');
      return;
    }
    this.setState(pS => {
      return { contacts: [...pS.contacts, { id: nanoid(), ...obj }] };
    });
  };

  inputFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  }
  
  filterContacts = () => {
    const { contacts } = this.state;
    const value = this.state.filter;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  };

  render() {
    return (
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter inputFilter={this.inputFilter} value={this.state.filter} />
        <ContactList
          filtered={this.filterContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
