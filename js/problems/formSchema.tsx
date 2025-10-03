import { useCallback, useState } from "react";

import "./App.css";

// -- WELCOME! --
// Rippling is working on a flexible “Form” component as 
// part of a larger component library that allows app developers
// to quickly stand up forms for their different needs. This 
// component should be flexible enough to handle different views
// from developers across our company. 
// Let’s build a quick prototype of that Form component today.
// -- END PROMPT! --

// Part 1: Form Schema Definition
// How would the interface for a form look? Be sure to cover use
// cases like different field types and validations.
type SchemaElement = {
  name: string;
  type: 'TEXT' | 'CHECKBOX' | 'SELECT';
  values?: string[];
  validation: (currValue: string | boolean) => boolean
};

type FormSchema = SchemaElement[];

const userTypes = ['ADMIN', 'CONSUMER'];

const formSchema: FormSchema = [
  {
    type: 'TEXT',
    name: 'name',
    validation: (currValue: string | boolean) => (currValue as unknown as string).length < 1
  },
  {
    type: 'TEXT',
    name: 'email',
    validation: (currValue: string | boolean) => (currValue as unknown as string).includes('@')
  },
  {
    type: 'SELECT',
    name: 'userType',
    values: userTypes,
    validation: (currValue: string | boolean) => Boolean(currValue)
  },
  {
    type: 'CHECKBOX',
    name: 'consent',
    validation: (currValue: string | boolean) => typeof currValue === 'boolean'
  },
];

type CustomFormProps = {
  formSchema: FormSchema;
  onSubmit: (obj: unknown) => void;
}

const TextInput = ({ name, onChange }: { name: string, onChange: (name: string, currValue: string | boolean) => void }) => {
  return (
    <input type='text' name={name} onChange={(e) => onChange(name, e.target.value)} />
  );
}

const CheckBoxInput = ({ name, onChange }: { name: string, onChange: (name: string, currValue: string | boolean) => void }) => {
  return (
    <input type="checkbox" name={name} onChange={(e) => onChange(name, e.target.value)} />
  );
}

const SelectInput = ({ name, values, onChange }: { name: string, values?: string[], onChange: (name: string, currValue: string | boolean) => void }) => {
  return (
    <select name={name} onChange={(e) => onChange(name, e.target.value)}>
      <option value=''>Choose a Value</option>
      {values?.map(val => (
        <option value={val}>{val}</option>
      ))}
    </select>
  );
}


const formFieldTypeMap = {
  'TEXT': TextInput,
  'CHECKBOX': CheckBoxInput,
  'SELECT': SelectInput,
};

// Part 2: Let's build our form component
// Let's try to hit a few of the use cases from above
const CustomForm = ({ formSchema, onSubmit }: CustomFormProps) => {
  const [validataionError, setValidataionError] = useState<string>();
  const [currentValues, setCurrentValues] = useState<Record<string, string | boolean>>({});

  const chageHandler = (name: string, value: string | boolean) => {
    const schemaObj: SchemaElement = formSchema.find(o => o.name === name)!;
    if (!schemaObj) throw new Error('invalid form update');
    const isValid = schemaObj.validation(value);
    if (!isValid) {
      setValidataionError(`Error in form field ${name}`);
    } else {
      const newValue = { ...currentValues, [name]: value };
      setCurrentValues(newValue);
    }
  };

  const handleSubmit = (e: any) => {
    onSubmit(currentValues);
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      {validataionError && <p>{validataionError}</p>}
      {formSchema.map(s => {
        return formFieldTypeMap[s.type]({ ...s, onChange: chageHandler });
      })}
      <input type='submit' onClick={handleSubmit} />
    </form>
  );
};

const App = () => {
  const onSubmit = useCallback((obj: unknown) => {
    console.log('submitted', obj);
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="form-container">
          <CustomForm formSchema={formSchema} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;