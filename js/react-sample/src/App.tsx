import { useState } from 'react';

const formDefinition = [
  {
    order: 1,
    field: 'first_name',
    display_name: 'First Name',
    type: 'string',
    required: true
  },
  {
    order: 2,
    field: 'last_name',
    display_name: 'Last Name',
    type: 'string',
    required: true
  },
  {
    order: 3,
    field: 'age',
    display_name: 'Age',
    type: 'number',
    required: false
  },
  {
    order: 3,
    field: 'user_type',
    display_name: 'User Type',
    type: 'select',
    required: false,
    options: [
      'shareholder',
      'investor',
      'other'
    ]
  },
  {
    order: 4,
    field: 'investing_experience',
    display_name: 'Investing Experience',
    type: 'multiselect',
    required: false,
    options: [
      'public_markets',
      'early_stage_private',
      'late_stage_private'
    ]
  },
  {
    order: 5,
    field: 'notes',
    display_name: 'Notes',
    type: 'text',
    required: false,
  },
];

const InputElement = ({ field, fieldValue, setFieldValue }) => {
  return (<input type='text' name={field} value={fieldValue} />);
}

const DynamicFormElement = ({ formElementDefinition }) => {
  const [ fieldValue, setFieldValue ] = useState(null);
  return (
    <>
      <label htmlFor={formElementDefinition.field}>{formElementDefinition.display_name}</label>
      <InputElement {...formElementDefinition} fieldValue={fieldValue} setFieldValue={setFieldValue} />
      <br />
    </>
  );
}

const DynamicForm = ({ formDefinition }) => { 
  formDefinition.sort((a, b) => a.order - b.order);
  const [ formState, updateFormState ] = useState({});
  return (
    <form>
      {formDefinition.map(formElementDefinition => (<DynamicFormElement formElementDefinition={formElementDefinition} />))}
      <button type='submit' onClick={(e) => { e.preventDefault(); console.log('form state???') }}>Submit</button>
    </form>
  );
}

function App() {
  return (
    <h1 className="center">
      Here's ur form! 👋
      <DynamicForm formDefinition={formDefinition} />
    </h1>
  );
}

export default App;
