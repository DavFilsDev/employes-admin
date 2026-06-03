import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  NumberField,
  EmailField,
  ReferenceField,
  TopToolbar,
  EditButton,
  ListButton,
} from "react-admin";
import { ManagerCard } from "./ManagerCard";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const InternShowContent = () => {
  return (
    <>
      <SimpleShowLayout>
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <EmailField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <BooleanField source="isRemunerate" label="Rémunéré" />
        <NumberField
          source="remuneration"
          label="Rémunération"
          options={{ style: "currency", currency: "EUR" }}
        />
        <ReferenceField source="managerId" reference="employees" label="Manager">
          <TextField source="firstname" /> <TextField source="lastname" />
        </ReferenceField>
      </SimpleShowLayout>
      <ManagerCard />
    </>
  );
};

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <InternShowContent />
  </Show>
);