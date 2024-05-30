import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react';
import { Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';

const buttonStyles = { root: { marginRight: 8 } };

export const PanelFooterExample: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  // State variables to hold the values of the text fields
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [type, setType] = React.useState('');

  const saveDataAndDismiss = () => {
    // Log the values of the state variables
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Address:', address);
    console.log('Type:', type);

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
        phone: phone,
        address: address,
        type: type
      })
    })

    // Clear the text fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setType('');

    // Dismiss the panel
    dismissPanel();
    console.log('Data saved successfully');
    setTimeout(() => {
      console.log("Timeout za spremanje kontakta...");
    }, 500)
    window.location.reload();
  };

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 595 },
  };
  
  const options: IDropdownOption[] = [
    { key: 'Kuća', text: 'Kuća' },
    { key: 'Posao', text: 'Posao' },
    { key: 'Ostalo', text: 'Ostalo' },
  ];

  return (
    <div>
      <PrimaryButton text="Dodaj kontakt" onClick={openPanel} allowDisabledFocus/>
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
        <TextField label="Ime" value={firstName} onChange={(event, newValue) => setFirstName(newValue || '')} />
        <TextField label="Prezime" value={lastName} onChange={(event, newValue) => setLastName(newValue || '')} />
        <TextField label="Email" value={email} onChange={(event, newValue) => setEmail(newValue || '')} />
        <TextField label="Telefon" value={phone} onChange={(event, newValue) => setPhone(newValue || '')} />
        <TextField label="Adresa" value={address} onChange={(event, newValue) => setAddress(newValue || '')} />
        <Dropdown
          label="Grupa"
          placeholder='Odaberi grupu'
          options={options}
          styles={dropdownStyles}
          onChange={(event, option) => setType(option ? String(option.key) : '')}
        />
      </Panel>
    </div>
  );
};
