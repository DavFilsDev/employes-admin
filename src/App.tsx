import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";

import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternEdit } from "./interns/InternEdit";
import { InternShow } from "./interns/InternShow";

import { Dashboard } from "./Dashboard";

const dataProvider = jsonServerProvider("http://localhost:3002");

export default function App() {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
      <Resource
        name="employees"
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
        show={EmployeeShow}
      />
      <Resource
        name="interns"
        list={InternList}
        create={InternCreate}
        edit={InternEdit}
        show={InternShow}
      />
    </Admin>
  );
}