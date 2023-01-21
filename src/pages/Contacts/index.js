import { useState } from 'react';
import { useContacts } from './useContacts';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DATA_VIEW_MODES } from './constants/constants';
import { ContactsTable } from './ContactsTable';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { ContactsFilters } from './ContactsFilters';
import { useViewMode } from './useViewMode';

const filtersDefaultValue = {
  fullname: '',
  gender: 'all',
  nationality: 'all',
};

const filterByFullname = ({ first, last }, fullname) =>
  first?.toLowerCase().includes(fullname.toLowerCase()) ||
  last?.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (value, gender) =>
  gender === 'all' ? true : value === gender;

const filterByNationality = (value, nationality) =>
  nationality === 'all' ? true : value === nationality;

export const Contacts = () => {
  const contacts = useContacts();
  const [viewMode, setViewMode] = useViewMode();
  const [filters, setFilters] = useState(filtersDefaultValue);

  const filteredContacts = contacts.data
    .filter((contact) => filterByFullname(contact.name, filters.fullname))
    .filter((contact) => filterByGender(contact.gender, filters.gender))
    .filter((contact) => filterByNationality(contact.nat, filters.nationality));

  const updateFilter = (name, value) => {
    setFilters((filters) => ({
      ...filters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters(filtersDefaultValue);
  };

  const render = () => {
    if (contacts.isLoading) {
      return <CircularProgress data-testid="contacts-loader" />;
    }

    if (contacts.isError) {
      return <div data-testid="contacts-error">Error</div>;
    }

    if (viewMode === DATA_VIEW_MODES.TABLE) {
      return <ContactsTable data={filteredContacts} />;
    }

    if (viewMode === DATA_VIEW_MODES.GRID) {
      return <div data-testid="contacts-grid-container">grid</div>;
    }
    return null;
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container>
        <Grid item sx={{ mb: 4 }} xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography component={'h1'} variant="h3">
              Contacts
            </Typography>
            <ToggleDataViewMode viewMode={viewMode} setViewMode={setViewMode} />
          </Box>
        </Grid>

        <Grid item sx={{ mb: 2 }} xs={12}>
          <ContactsFilters
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
          />
        </Grid>
        <Grid item xs={12}>
          {render()}
        </Grid>
      </Grid>
    </Container>
  );
};
