import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  SelectInput,
} from "react-admin";

export const EmployeeCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname" validate={required()} />
      <TextInput source="lastname" validate={required()} />
      <TextInput source="email" validate={required()} />

      <SelectInput
        source="department"
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
          { id: "Finance", name: "Finance" },
        ]}
        validate={required()}
      />

      <NumberInput source="salary" validate={[required(), minValue(1500)]} />

      <BooleanInput source="active" defaultValue={true} />
    </SimpleForm>
  </Create>
);