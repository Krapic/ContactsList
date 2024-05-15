import React, { useState, useEffect } from 'react';
import { getTheme, Stack, Text } from '@fluentui/react';
import { PanelFooterExample } from './Panel';

const theme = getTheme();

// Definiraj tip Contact koji odgovara tipu podataka koji se očekuju od API-ja
interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
// Definiraj funkciju Contacts koja dohvaća podatke iz API-ja i prikazuje ih na ekranu
function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  // useEffect hook se koristi za dohvaćanje podataka iz API-ja kada se komponenta učita
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); 

  // Prikazuje listu kontakata na ekranu koristeći Stack i Text komponente iz Fluent UI biblioteke
  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <div>
        <PanelFooterExample/>
        <Text variant='xLarge'>Moji kontakti: </Text>
        {contacts.map((contact, index) => (
          <p key={index}>
            {contact.name} {contact.surname} - {contact.email} - {contact.phone}
          </p>
        ))}
      </div>
    </Stack>
  );
}

export default Contacts;