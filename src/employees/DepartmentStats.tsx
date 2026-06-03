import { useRecordContext, useGetList } from "react-admin";
import { Typography, Box } from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { data } = useGetList("employees", {
    filter: { department: employee?.department, active: true },
    pagination: { page: 1, perPage: 1 },
  });

  if (!employee) return null;

  const count = data ? data.length : 0;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">
        Collègues actifs dans <strong>{employee.department}</strong> : {count}
      </Typography>
    </Box>
  );
};