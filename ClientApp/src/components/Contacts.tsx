import React, { useState, useEffect } from 'react';
import { getTheme, IconButton, Stack, Text, IIconProps, DefaultButton } from '@fluentui/react';
import { PanelFooterExample } from './Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useParams, useNavigate } from 'react-router-dom';
import EditContactForm from './EditContactForm';

const theme = getTheme();

interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  type: string;
}

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editIcon: IIconProps = { iconName: 'EditContact' };
  const deleteIcon: IIconProps = { iconName: 'Delete' };

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

  const handleUpdate = (updatedContact: Contact) => {
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setSelectedContact(updatedContact);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setIsEditing(false);
    dismissPanel();
  };

  const navigateContact = useNavigate();

  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <div>
        <PanelFooterExample />
        <Text variant='xLarge'>Moji kontakti: </Text>
        {contacts.sort((a, b) => a.name.localeCompare(b.name)).map((contact, index) => (
          <div key={index} style={{ marginBottom: theme.spacing.s1 }}>
            <DefaultButton onClick={() => { setSelectedContact(contact); setIsEditing(false); openPanel(); navigateContact(`/${contact.id}`)}} styles={{ root: { width: 300 } }} >{contact.name} {contact.surname}</DefaultButton>
            {selectedContact &&
              <Panel
                isOpen={isOpen}
                headerText={isEditing ? "Uredi kontakt" : "Podaci o kontaktu"}
                closeButtonAriaLabel="Zatvori"
                isFooterAtBottom={true}
                type={PanelType.smallFluid}
                onRenderFooterContent={() => (
                  <div>
                    <DefaultButton onClick={handleClose}>Zatvori</DefaultButton>
                  </div>
                )}
              >
                {isEditing ? (
                  <EditContactForm contact={selectedContact} onUpdate={handleUpdate} onClose={handleClose}/>
                ) : (
                  <div>
                    <p style={{ fontSize: '20px' }}>Ime: {selectedContact.name} {selectedContact.surname}</p>
                    <p style={{ fontSize: '20px' }}>Email: {selectedContact.email}</p>
                    <p style={{ fontSize: '20px' }}>Telefon: {selectedContact.phone}</p>
                    <p style={{ fontSize: '20px' }}>Adresa: {selectedContact.address}</p>
                    <p style={{ fontSize: '20px' }}>Grupa: {selectedContact.type}</p>
                  </div>
                )}
              </Panel>
            }
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
                onClick={() => {
                  fetch(`https://localhost:7037/api/Contacts/Delete?id=${contact.id}`, {
                    method: "DELETE",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    }
                  })
                  .then(response => response.json())
                  .then(data => {
                    // Ako je uspješno obrisan kontakt, ažuriraj stanje
                    setContacts(contacts.filter(c => c.id !== contact.id));
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
                }}
              />
            </TooltipHost>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default Contacts;
