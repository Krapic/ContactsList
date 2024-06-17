import React, { useState } from 'react';
import { DefaultButton, TextField, Stack } from '@fluentui/react';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  type: string;
}

interface Props {
  contact: Contact;
  onUpdate: (updatedContact: Contact) => void;
  onClose: () => void;
}

const EditContactForm: React.FC<Props> = ({ contact, onUpdate, onClose }) => {
  const [name, setName] = useState(contact.name);
  const [surname, setSurname] = useState(contact.surname);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [address, setAddress] = useState(contact.address);
  const [type, setType] = useState(contact.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedContact = { ...contact, name, surname, email, phone, address, type };

    try {
      const response = await axios.put(`https://localhost:7037/api/Contacts/UpdateContact/${contact.id}`, updatedContact);
      if (response.status === 200 || response.status === 204) {
        onUpdate(updatedContact);
        onClose(); // Close the panel here
      } else {
        console.error('Failed to update contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating contact', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField label="Ime" value={name || ''} onChange={(e, newValue) => setName(newValue || '')} />
        <TextField label="Prezime" value={surname || ''} onChange={(e, newValue) => setSurname(newValue || '')} />
        <TextField label="Email" value={email || ''} onChange={(e, newValue) => setEmail(newValue || '')} />
        <TextField label="Telefon" value={phone || ''} onChange={(e, newValue) => setPhone(newValue || '')} />
        <TextField label="Adresa" value={address || ''} onChange={(e, newValue) => setAddress(newValue || '')} />
        <TextField label="Grupa" value={type || ''} onChange={(e, newValue) => setType(newValue || '')} />
        <DefaultButton type="submit">Spremi</DefaultButton>
      </Stack>
    </form>
  );
};

export default EditContactForm;