import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react';

const buttonStyles = { root: { marginRight: 8 } };

export const PanelFooterExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  // State variables to hold the values of the text fields
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const saveDataAndDismiss = () => {
    // Log the values of the state variables
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);

    fetch("https://localhost:7037/api/Contacts/CreateEdit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        email: email,
        phone: phone
      })
    })

    // Clear the text fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');

    // Dismiss the panel
    dismissPanel();
    console.log('Data saved successfully');
    //window.location.reload();
  };

  return (
    <div>
      <PrimaryButton text="Dodaj kontakt" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Novi kontakt: "
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        type={PanelType.medium}
        onRenderFooterContent={() => (
          <div>
            <PrimaryButton onClick={saveDataAndDismiss} styles={buttonStyles}>Spremi</PrimaryButton>
            <DefaultButton onClick={dismissPanel}>Odustani</DefaultButton>
          </div>
        )}
      >
        <p>Ime</p>
        <TextField label="Required" value={firstName} onChange={(event, newValue) => setFirstName(newValue || '')} />
        <p>Prezime</p>
        <TextField label="Required" value={lastName} onChange={(event, newValue) => setLastName(newValue || '')} />
        <p>Email</p>
        <TextField label="Required" value={email} onChange={(event, newValue) => setEmail(newValue || '')} />
        <p>Telefon</p>
        <TextField label="Required" value={phone} onChange={(event, newValue) => setPhone(newValue || '')} />
      </Panel>
    </div>
  );
};
