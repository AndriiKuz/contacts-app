export const useFilters = (data) => {
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

  return {
    filtersDefaultValue,
    filterByFullname,
    filterByGender,
    filterByNationality,
  };
};
