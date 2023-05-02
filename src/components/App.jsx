import React, { Component } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { initialValues } from './initialValues';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    } else {
      this.setState({ contacts: initialValues });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    if (
      this.state.contacts.some(
        value => value.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  searchContact = contactName => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact =>
        contact.name.includes(contactName)
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <Phonebook addContact={this.addContact} />

        <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />

        <Contacts
          data={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
