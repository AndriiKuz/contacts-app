import { useState } from 'react';

export const usePagination = (filteredContacts) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 12;
  const totalContacts = filteredContacts.length;
  const quantityPages = Math.ceil(totalContacts / contactsPerPage);
  const lastContactsIndex = currentPage * contactsPerPage;
  const firstContactsIndex = lastContactsIndex - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    firstContactsIndex,
    lastContactsIndex
  );
  return { quantityPages, currentContacts, currentPage, setCurrentPage };
};
