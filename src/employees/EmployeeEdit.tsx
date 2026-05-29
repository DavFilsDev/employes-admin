import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  useRecordContext,
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();
  return <span>Modifier : {record ? `${record.firstname} ${record.lastname}` : ""}</span>;
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <TextInput source="firstname" validate={required()} />
      <TextInput source="lastname" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="department" validate={required()} />
      <NumberInput source="salary" validate={[required(), minValue(1500)]} />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);