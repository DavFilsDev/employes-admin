import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="employees" />
    </Admin>
  );
}