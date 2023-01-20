import { useContacts } from './useContacts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DATA_VIEW_MODES } from './constants/constants';
import { ContactsTable } from './ContactsTable';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { useViewMode } from './useViewMode';

export const Contacts = () => {
  const contacts = useContacts();
  const [viewMode, setViewMode] = useViewMode();

  const render = () => {
    if (contacts.isLoading) {
      return <CircularProgress data-testid="contacts-loader" />;
    }

    if (contacts.isError) {
      return <div data-testid="contacts-error">Error</div>;
    }

    if (viewMode === DATA_VIEW_MODES.TABLE) {
      return <ContactsTable data={contacts.data} />;
    }

    if (viewMode === DATA_VIEW_MODES.GRID) {
      return <div data-testid="contacts-grid-container">grid</div>;
    }
    return null;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container>
        <Grid item sx={{ marginBottom: 3 }} xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography component={'h1'} variant="h3">
              Contacts
            </Typography>
            <ToggleDataViewMode viewMode={viewMode} setViewMode={setViewMode} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          {render()}
        </Grid>
      </Grid>
    </Container>
  );
};
