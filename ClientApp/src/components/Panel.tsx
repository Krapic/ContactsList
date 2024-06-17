import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';

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
  
  type Contact = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    type: string;
  };
  
  const [, setContacts] = React.useState<Contact[]>([]);

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
    }).then(response => response.json())
    .then(() => {
      // Fetch the updated list of contacts from the server
      fetch("https://localhost:7037/api/Contacts/GetAll")
        .then(response => response.json())
        .then(updatedContacts => {
          // Update the contacts state variable with the updated list
          setContacts(updatedContacts);
    
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
            window.location.reload();
          }, 1000);
        });
    });
  };

  const comboBoxRef = React.useRef<IComboBox>(null);

  const [options, setOptions] = React.useState<IComboBoxOption[]>([
    { key: 'Kuća', text: 'Kuća' },
    { key: 'Posao', text: 'Posao' },
    { key: 'Obitelj', text: 'Obitelj' },
    { key: 'Prijatelj', text: 'Prijatelj' },
    { key: 'Škola', text: 'Škola' },
    { key: 'Fakultet', text: 'Fakultet' },
    { key: 'Hitni kontakt', text: 'Hitni kontakt' },
    { key: 'Servis i usluga', text: 'Servis i usluga' },
    { key: 'Organizacija i udruženje', text: 'Organizacija i udruženje' }
  ]);

  const handleComboBoxChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
    setType(value || '');

    if (value && !options.find(option => option.text === value)) {
      setOptions(prevOptions => [...prevOptions, { key: value, text: value }]);
    }
  };

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
        <ComboBox
          label="Kategorija"
          placeholder='Odaberi kategoriju ili upiši novu...'
          options={options}
          allowFreeform
          autoComplete='on'
          componentRef={comboBoxRef}
          dropdownMaxWidth={595}
          useComboBoxAsMenuWidth
          onChange={handleComboBoxChange}
        />
      </Panel>
    </div>
  );
};
