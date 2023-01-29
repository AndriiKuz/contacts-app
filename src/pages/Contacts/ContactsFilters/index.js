import { memo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

const FullnameField = memo(({ value, onChange }) => (
  <Grid item xs={12} sm={4}>
    <TextField
      sx={{ width: '100%' }}
      name="fullname"
      label="Full name"
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      inputProps={{ 'data-testid': 'field-fullname' }}
    />
  </Grid>
));

const GenderField = memo(({ value, onChange }) => (
  <Grid item xs sm={2}>
    <FormControl sx={{ minWidth: 100, width: '100%' }} size="small">
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        name="gender"
        labelId="gender"
        value={value}
        label="Gender"
        onChange={onChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </FormControl>
  </Grid>
));

const NationalityField = memo(({ value, onChange }) => (
  <Grid item xs sm={2}>
    <FormControl sx={{ minWidth: 130, width: '100%' }} size="small">
      <InputLabel id="nationality">Nationality</InputLabel>
      <Select
        name="nationality"
        labelId="nationality"
        value={value}
        label="Nationality"
        onChange={onChange}
      >
        <MenuItem value="all">All</MenuItem>

        {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => (
          <MenuItem key={key} value={key}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
));

export const ContactsFilters = memo(
  ({ updateFilter, filters, clearFilters, currentPage, setCurrentPage }) => {
    const handleChangeFilter = useCallback(
      (e) => {
        if (currentPage !== 1) {
          setCurrentPage(1);
        }
        updateFilter(e.target.name, e.target.value);
      },
      // eslint-disable-next-line
      [currentPage]
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1 }}>
          <FullnameField
            value={filters.fullname}
            onChange={handleChangeFilter}
          />
          <GenderField value={filters.gender} onChange={handleChangeFilter} />
          <NationalityField
            value={filters.nationality}
            onChange={handleChangeFilter}
          />

          <Grid item xs>
            <Box display="flex" justifyContent="flex-end">
              <Button
                data-testid="clear-btn"
                color="inherit"
                display="inline-block"
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                sx={{ border: 'none' }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
);
