import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

export const ContactsFilters = ({ filters, updateFilter, clearFilters }) => {
  const handleChangeFilter = (e) => {
    updateFilter(e.target.name, e.target.value);
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex">
        <TextField
          sx={{ mr: 1 }}
          name="fullname"
          label="Full name"
          variant="outlined"
          size="small"
          value={filters.fullname}
          onInput={handleChangeFilter}
        />

        <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            name="gender"
            labelId="gender"
            value={filters.gender}
            label="Gender"
            onChange={handleChangeFilter}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="nationality">Nationality</InputLabel>
          <Select
            name="nationality"
            labelId="nationality"
            value={filters.nationality}
            label="Nationality"
            onChange={handleChangeFilter}
          >
            <MenuItem value="all">All</MenuItem>

            {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
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
  );
};

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
