import { useRecordContext, useGetList } from "react-admin";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export const InternsByManager = () => {
  const employee = useRecordContext();

  const { data, isPending } = useGetList("interns", {
    filter: { managerId: employee?.id },
    pagination: { page: 1, perPage: 100 },
  });

  if (isPending || !employee) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Stagiaires encadrés ({data?.length ?? 0})
      </Typography>
      {!data || data.length === 0 ? (
        <Typography color="text.secondary">Aucun stagiaire.</Typography>
      ) : (
        <List dense>
          {data.map((intern) => (
            <ListItem key={intern.id}>
              <ListItemText
                primary={
                  <Link to={`/interns/${intern.id}/show`}>
                    {intern.firstname} {intern.lastname}
                  </Link>
                }
                secondary={`${intern.department} — ${intern.isRemunerate ? `${intern.remuneration} €` : "Non rémunéré"}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};