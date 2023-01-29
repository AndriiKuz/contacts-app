import { useCallback } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export const ContactsPagination = ({
  quantityPages,
  currentPage,
  setCurrentPage,
}) => {
  const onChangePage = useCallback(
    (event, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  return (
    <Box display="flex" justifyContent="center" sx={{ width: '100%', mb: 10 }}>
      <Stack spacing={2}>
        <Pagination
          count={quantityPages}
          page={currentPage}
          onChange={onChangePage}
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};
