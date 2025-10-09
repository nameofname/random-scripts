const { useState, createContext, useContext } = React;

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

const FormContext = createContext(null);

const InputHoc = (Component) => {
  return (formFieldDefinition) => {
    const res = useContext(FormContext);
    const { formData, updateFormData } = res;
    console.log('what do i have', res) // this is null, why? 

    const updateFunction = ({ fieldName, fieldValue }) => {
      formData[fieldName] = fieldValue;
      updateFormData(formData);
    };

    const currentValue = formData[formFieldDefinition.field];
    console.log('adsf', formFieldDefinition)

    return Component({ updateFunction, formFieldDefinition, currentValue });
  }
}

const StringInput = InputHoc(({ formFieldDefinition, updateFunction, currentValue }) => {
  return (
    <>
      <label>
        {formFieldDefinition.display_name}
      </label>
      <input type='text' name={formFieldDefinition.name} value={currentValue} onChange={(e) => updateFunction({ fieldName: formFieldDefinition.field, fieldValue: e.target.value })} />
    </>
  );
})


const componentMap = {
  // string: StringInput,
  // text: StringInput,
  // number: StringInput,
  // select: StringInput,
  // multiselect: StringInput,
  text: MultiLineInput,
  number: NumericInput,
  select: SelectInput,
  multiselect: MultiSelectInput,
};

const MyForm = ({ formDefinition }) => {
  formDefinition.sort((a, b) => a.order - b.order);
  const [formData, updateFormData] = useState({ something: 'asdf' });

  console.log('what am i passing', formData, updateFormData)
  return (
    // <FormContext.Provider value={{something: 'adsfadsfads'}}>
    <form onSubmit={() => { }}>
      {formDefinition.map(o => {
        return componentMap[o.type]({ formData, updateFormData, ...o });
      })}
      <button type='submit' onClick={(e) => {
        console.log(formData)
        return e.preventDefault();
      }}>Submit</button>
    </form>
    // </FormContext.Provider>
  );
}




/// My code above here... 


const App = () => {

  return (
    <div className="App">
      <MyForm formDefinition={formDefinition} />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
