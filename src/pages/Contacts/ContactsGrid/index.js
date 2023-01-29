import { CopyToClipboardText } from '../../../components/CopyToClipboardText';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const ContactsGrid = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2 }}>
        {data.map((contact) => (
          <Grid item xs={12} sm={6} md={4} key={contact.login.uuid}>
            <Card>
              <Box>
                <CardMedia
                  component="img"
                  height="180"
                  image={contact.picture.large}
                  alt={`${contact.name.first} ${contact.name.last}`}
                  sx={{
                    borderRadius: '50%',
                    width: '180px',
                    ml: 'auto',
                    mr: 'auto',
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {contact.name.title} {contact.name.first}{' '}
                    {contact.name.last}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    {contact.dob.age} years
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>Phone:</Typography>
                  <CopyToClipboardText text={contact.phone} />
                  <Typography sx={{ fontWeight: 500 }}>Email:</Typography>
                  <CopyToClipboardText text={contact.email} />
                  <Typography>
                    <b style={{ fontWeight: 500 }}>Nationality:</b>{' '}
                    {NATIONALITIES_HUMAN_NAME[contact.nat]}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
