import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField'; // MUI ICON COMPONENT

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'; // CUSTOM DUMMY DATA SET

import { PREFERENCES } from './data';
export default function Preferences() {
  return <Card>
      <h6 style={{ fontSize: 14, padding: 3 }}>
        General Preferences
      </h6>

      <Divider />

      <Box padding={3}>
        <Grid container spacing={4}>
          <Grid size={{
          sm: 6,
          xs: 12
        }}>
            <TextField select fullWidth value="english" label="Language" variant="outlined" placeholder="Language" slotProps={{
            select: {
              native: true,
              IconComponent: KeyboardArrowDown
            }
          }}>
              <option value="english">English</option>
              <option value="bangla">Bangla</option>
              <option value="hindi">Hindi</option>
            </TextField>
          </Grid>

          <Grid size={{
          sm: 6,
          xs: 12
        }}>
            <TextField variant="outlined" label="Time Zone" fullWidth value="12:00 AM" />
          </Grid>

          <Grid size={{
          sm: 6,
          xs: 12
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 500 }}>Early release</p>
                <small style={{ color: 'text.secondary' }}>Get included on new features.</small>
              </div>

              <Switch defaultChecked />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <div>
                <p style={{ fontWeight: 500 }}>See info about people who view my profile</p>
                <small style={{ color: 'text.secondary' }}>More about viewer info.</small>
              </div>

              <Switch defaultChecked />
            </div>
          </Grid>
        </Grid>
      </Box>

      {
      /* EMAIL PREFERENCES SECTION */
    }
      <h6 style={{ fontSize: 14, padding: 3, paddingTop: 0 }}>
        Email Preferences
      </h6>

      <Divider />

      <Stack spacing={2} p={3} pl={2}>
        {PREFERENCES.map(({
        id,
        title,
        subtitle,
        checked
      }) => <Stack direction="row" alignItems="center" spacing={1} key={id}>
            <Checkbox checked={checked} />

            <div>
              <p style={{ fontWeight: 500, lineHeight: 1 }}>
                {title}
              </p>

              <small style={{ color: 'text.secondary' }}>{subtitle}</small>
            </div>
          </Stack>)}
      </Stack>

      <Stack direction="row" spacing={3} padding={3}>
        <Button variant="contained">Save Changes</Button>
        <Button variant="outlined">Cancel</Button>
      </Stack>
    </Card>;
}