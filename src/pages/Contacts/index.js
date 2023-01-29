import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DATA_VIEW_MODES } from './constants/constants';
import { ContactsTable } from './ContactsTable';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { ContactsFilters } from './ContactsFilters';
import { ContactsPagination } from './ContactsPagination';
import { ContactsGrid } from './ContactsGrid';
import { Message } from './Message';
import { useViewMode } from './useViewMode';
import { useContacts } from './useContacts';
import { useFilters } from './useFilters';
import { usePagination } from './usePagination';

export const Contacts = () => {
  const [viewMode, setViewMode] = useViewMode();
  const contacts = useContacts();

  const {
    filtersDefaultValue,
    filterByFullname,
    filterByGender,
    filterByNationality,
  } = useFilters();

  const [filters, setFilters] = useState(filtersDefaultValue);

  const filteredContacts = contacts.data
    .filter((contact) => filterByFullname(contact.name, filters.fullname))
    .filter((contact) => filterByGender(contact.gender, filters.gender))
    .filter((contact) => filterByNationality(contact.nat, filters.nationality));

  const updateFilter = useCallback((name, value) => {
    setFilters((filters) => ({
      ...filters,
      [name]: value,
    }));
  }, []);

  const clearFilters = useCallback(
    () => {
      setFilters(filtersDefaultValue);
    }, // eslint-disable-next-line
    []
  );

  const { quantityPages, currentContacts, currentPage, setCurrentPage } =
    usePagination(filteredContacts);

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
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            filters={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          {contacts.isLoading ? (
            <Box display="flex" justifyContent="center" sx={{ mb: 5, mt: 5 }}>
              <CircularProgress data-testid="contacts-loader" />
            </Box>
          ) : contacts.isError ? (
            <Box data-testid="contacts-error">
              <Message
                severity="error"
                text={'ERROR! Something went wrong...'}
              />
            </Box>
          ) : !currentContacts.length ? (
            <Box>
              <Message severity="info" text={'Contacts not found.'} />
            </Box>
          ) : viewMode === DATA_VIEW_MODES.TABLE ? (
            <ContactsTable data={currentContacts} />
          ) : viewMode === DATA_VIEW_MODES.GRID ? (
            <div data-testid="contacts-grid-container">
              <ContactsGrid data={currentContacts} />
            </div>
          ) : null}
        </Grid>

        {currentContacts.length && !contacts.isError && !contacts.isLoading ? (
          <ContactsPagination
            quantityPages={quantityPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </Grid>
    </Container>
  );
};
