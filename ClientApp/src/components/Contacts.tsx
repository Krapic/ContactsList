import React, { useState, useEffect } from 'react';
import { getTheme, IconButton, Stack, Text, IIconProps } from '@fluentui/react';
import { PanelFooterExample } from './Panel';
import { useId } from '@fluentui/react-hooks';
import { TooltipHost, ITooltipHostStyles } from '@fluentui/react/lib/Tooltip';

const theme = getTheme();

interface Contact {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  
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

  const tooltipId = useId('tooltip');
  const calloutProps = { gapSpace: 0 };
  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
  const emojiIcon: IIconProps = { iconName: 'Delete' };
  
  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <div>
        <PanelFooterExample/>
        <Text variant='xLarge'>Moji kontakti: </Text>
        {contacts.map((contact, index) => (
          <div key={index} style={{ marginBottom: theme.spacing.s1 }}>
            <Text>{contact.name} {contact.surname} - {contact.email} - {contact.phone}</Text>
            {/* Ikona za brisanje kontakta */
            /* Ovdje se koristi TooltipHost komponenta za prikazivanje tooltipa */
            /* Kada korisnik klikne na ikonu, poziva se API za brisanje kontakta */}
            <TooltipHost
              content="Obriši kontakt"
              id={tooltipId}
              calloutProps={calloutProps}
              styles={hostStyles}
              aria-describedby={tooltipId}>
                {/* IconButton komponenta se koristi za prikaz ikone */
                /* Klikom na ikonu poziva se funkcija za brisanje kontakta */}
              <IconButton iconProps={emojiIcon} aria-label="Obriši kontakt" onClick={() => {
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
              }}>
                Delete
              </IconButton>
            </TooltipHost>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export default Contacts;
