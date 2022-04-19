import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';

import PageTitle from '../components/PageTitle';
import Poll from '../components/Poll';
import DialogCreatePoll from '../components/DialogCreatePoll';
import withLayout from '../hoc/withLayout';
import styles from '../styles/Polls.module.scss';

function Polls() {
  const [tabValue, setTabValue] = useState('open');
  const [open, setOpen] = useState(false);

  const handleChangeTab = (_, newValue) => setTabValue(newValue);

  const plantOptions = [{ id: 1, label: 'Spinach' }, { id: 2, label: 'Lettuce' }, { id: 3, label: 'Mint' }, { id: 4, label: 'Basil' }, { id: 5, label: 'Kale' }, { id: 6, label: 'Rosemary' }, { id: 7, label: 'Celery' }];

  const pollsTest = [
    {
      id: 1, question: 'What plants are we going to farm?', description: 'We need to plant 3 seeds to start our farm', status: 'open', type: 'checkbox', options: plantOptions, arguments: { maxLength: 3 },
    },
    {
      id: 2, question: 'Should we hire Carol Smith?', description: 'Carol Smith applied as a biologist', status: 'open', type: 'yesOrNo',
    },
    {
      id: 3, question: 'Which farm should we buy?', description: 'We need a farm to start farming', status: 'open', type: 'radio', options: [{ id: 1, label: 'Farm 1' }, { id: 2, label: 'Farm 2' }, { id: 3, label: 'Farm 3' }],
    },
    {
      id: 4, question: 'What seeds should we buy?', description: 'We need to select between 2 or 3 different types of seeds', status: 'completed', type: 'checkbox', options: plantOptions, arguments: { minLength: 2, maxLength: 5 },
    },
  ];

  const userAnsweredPolls = [1, 3, 4];

  return (
    <Box className={styles.container}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PageTitle>Polls</PageTitle>
        </Grid>
        <Grid item xs={12} align="right">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Create new poll</Button>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            aria-label="tabs"
          >
            <Tab value="open" label="Open" />
            <Tab value="completed" label="Completed" />
          </Tabs>
        </Grid>
        <Grid container item xs={12} mt={2}>
          {pollsTest.filter((item) => item.status === tabValue).map((poll) => (
            <Poll
              key={poll.id}
              poll={poll}
              className={styles.poll}
              answered={Boolean(userAnsweredPolls.find((id) => id === poll.id))}
            />
          ))}
        </Grid>
        <DialogCreatePoll open={open} handleClose={() => setOpen(false)} />
      </Grid>
    </Box>
  );
}

export default withLayout(Polls);
