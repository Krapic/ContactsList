import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextFieldBasicExample } from './TextField';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

const buttonStyles = { root: { marginRight: 8 } };
initializeIcons();

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
        <TextFieldBasicExample value={firstName} onChange={setFirstName} />
        <p>Prezime</p>
        <TextFieldBasicExample value={lastName} onChange={setLastName} />
        <p>Email</p>
        <TextFieldBasicExample value={email} onChange={setEmail} />
        <p>Telefon</p>
        <TextFieldBasicExample value={phone} onChange={setPhone} />
      </Panel>
    </div>
  );
};
