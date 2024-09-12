import React, { useState, useEffect } from 'react';
import { getTheme, IconButton, Stack, Text, IIconProps, DefaultButton, TextField } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useParams, useNavigate } from 'react-router-dom';

const theme = getTheme();

interface Email {
  id: number;
  emailAddress: string;
}

interface PhoneNumber {
  id: number;
  number: string;
}

interface Contact {
  id: number;
  name: string;
  surname: string;
  emails: Email[];
  phoneNumbers: PhoneNumber[];
  address: string;
  type: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editIcon: IIconProps = { iconName: 'EditContact' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emails, setEmails] = useState<Email[]>([{ id: 0, emailAddress: '' }]);
  const [phones, setPhones] = useState<PhoneNumber[]>([{ id: 0, number: '' }]);
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    fetch("https://localhost:7037/api/Contacts/GetAll", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setContacts(data.value);
      const contact = data.value.find((contact: Contact) => contact.id === Number(id));
      if (contact) {
        setSelectedContact(contact);
        openPanel();
      } else {
        setSelectedContact(null);
        navigate('/');
        dismissPanel();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [dismissPanel, id, navigate, openPanel]);

  useEffect(() => {
    if (selectedContact) {
      setFirstName(selectedContact.name);
      setLastName(selectedContact.surname);
      setEmails(selectedContact.emails);
      setPhones(selectedContact.phoneNumbers);
      setAddress(selectedContact.address);
      setType(selectedContact.type);
    } else {
      setFirstName('');
      setLastName('');
      setEmails([{ id: 0, emailAddress: '' }]);
      setPhones([{ id: 0, number: '' }]);
      setAddress('');
      setType('');
    }
  }, [selectedContact]);

  const handleUpdate = (updatedContact: Contact) => {
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setSelectedContact(updatedContact);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setIsEditing(false);
    dismissPanel();
  };

  const handleAddNewContact = () => {
    setSelectedContact(null);
    setIsEditing(true);
    openPanel();
  };

  const handleDeleteContact = (contactId: number) => {
    fetch(`https://localhost:7037/api/Contacts/Delete?id=${contactId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== contactId));
      } else {
        console.error('Failed to delete contact');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index].emailAddress = value;
    setEmails(newEmails);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index].number = value;
    setPhones(newPhones);
  };

  const addEmailField = () => setEmails([...emails, { id: 0, emailAddress: '' }]);
  const addPhoneField = () => setPhones([...phones, { id: 0, number: '' }]);

  const handleSubmit = () => {
    const contactId = selectedContact ? selectedContact.id : 0;
    const contactObject = { id: contactId, name: firstName, surname: lastName, address, type };
  
    const newContact = {
      id: contactId,
      name: firstName,
      surname: lastName,
      emails: emails.map(email => ({
        ...email,
        contactId,
        contact: contactObject
      })),
      phoneNumbers: phones.map(phone => ({
        ...phone,
        contactId,
        contact: contactObject
      })),
      address,
      type,
    };
  
    console.log('Submitting contact:', newContact); // Log the contact data being submitted
  
    const url = selectedContact
      ? `https://localhost:7037/api/Contacts/UpdateContact/${contactId}`
      : "https://localhost:7037/api/Contacts/CreateEdit";
  
    fetch(url, {
      method: selectedContact ? "PUT" : "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newContact)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          console.error('Error updating contact:', error);
          // Log detailed validation errors
          if (error.errors) {
            Object.keys(error.errors).forEach(key => {
              console.error(`${key}: ${error.errors[key].join(', ')}`);
            });
          }
          throw new Error(`Error updating contact: ${response.status} ${response.statusText}`);
        });
      }
      return response.json();
    }).then((data) => {
      console.log('Contact updated successfully:', data); // Log the response data
      handleUpdate(data);
      handleClose();
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <div>
        <Text variant='xLarge'>Moji kontakti: </Text>
        <DefaultButton onClick={handleAddNewContact} styles={{ root: { marginBottom: theme.spacing.m } }}>
          Dodaj novi kontakt
        </DefaultButton>
        {contacts.sort((a, b) => a.name.localeCompare(b.name)).map((contact, index) => (
          <div key={index} style={{ marginBottom: theme.spacing.s1 }}>
            <DefaultButton onClick={() => { setSelectedContact(contact); setIsEditing(false); openPanel(); navigate(`/${contact.id}`)}} styles={{ root: { width: 300 } }} >{contact.name} {contact.surname}</DefaultButton>
            <TooltipHost content="Uredi kontakt">
              <IconButton
                iconProps={editIcon}
                title="Edit"
                ariaLabel="Edit"
                onClick={() => { setSelectedContact(contact); setIsEditing(true); openPanel(); }}
              />
            </TooltipHost>
            <TooltipHost content="Obriši kontakt">
              <IconButton
                iconProps={deleteIcon}
                onClick={() => handleDeleteContact(contact.id)}
              />
            </TooltipHost>
          </div>
        ))}
      </div>
      <Panel
        isOpen={isOpen}
        onDismiss={handleClose}
        type={PanelType.smallFixedFar}
        headerText={isEditing ? "Uredi kontakt" : "Dodaj novi kontakt"}
        closeButtonAriaLabel="Zatvori"
      >
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField label="First Name" value={firstName} onChange={(e, newValue) => setFirstName(newValue || '')} />
          <TextField label="Last Name" value={lastName} onChange={(e, newValue) => setLastName(newValue || '')} />
          {emails.map((email, index) => (
            <Stack horizontal key={index} tokens={{ childrenGap: 10 }}>
              <TextField
                label={`Email ${index + 1}`}
                value={email.emailAddress}
                onChange={(e, newValue) => handleEmailChange(index, newValue || '')}
              />
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                title="Remove Email"
                ariaLabel="Remove Email"
                onClick={() => setEmails(emails.filter((_, i) => i !== index))}
              />
            </Stack>
          ))}
          <DefaultButton onClick={addEmailField}>Add Email</DefaultButton>
          {phones.map((phone, index) => (
            <Stack horizontal key={index} tokens={{ childrenGap: 10 }}>
              <TextField
                label={`Phone ${index + 1}`}
                value={phone.number}
                onChange={(e, newValue) => handlePhoneChange(index, newValue || '')}
              />
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                title="Remove Phone"
                ariaLabel="Remove Phone"
                onClick={() => setPhones(phones.filter((_, i) => i !== index))}
              />
            </Stack>
          ))}
          <DefaultButton onClick={addPhoneField}>Add Phone</DefaultButton>
          <TextField label="Address" value={address} onChange={(e, newValue) => setAddress(newValue || '')} />
          <TextField label="Type" value={type} onChange={(e, newValue) => setType(newValue || '')} />
          <DefaultButton onClick={handleSubmit}>Save</DefaultButton>
        </Stack>
      </Panel>
    </Stack>
  );
};

export default Contacts;