import format from 'date-fns/format';
import parseISO from 'date-fns/fp/parseISO';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { CopyToClipboardText } from '../../../components/CopyToClipboardText';

export const ContactsTable = ({ data }) => {
  return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
      <Table sx={{ minWidth: 650 }} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => (
            <TableRow
              dsta-testid="contacts-table-row"
              key={contact.login.uuid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                <Avatar
                  src={contact.picture.thumbnail}
                  alt={`${contact.name.first} ${contact.name.last}`}
                />
              </TableCell>
              <TableCell data-testid="contacts-table-cell-fullname">
                {contact.name.title} {contact.name.first} {contact.name.last}
              </TableCell>
              <TableCell>
                <Typography>
                  {format(parseISO(contact.dob.date), 'MM/dd/yyyy')}
                </Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.email} />
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.phone} />
              </TableCell>
              <TableCell>
                {contact.location.city}, <br />
                {contact.location.street.name} {contact.location.street.number}
              </TableCell>
              <TableCell align="right">
                {NATIONALITIES_HUMAN_NAME[contact.nat]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
