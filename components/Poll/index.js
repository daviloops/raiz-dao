import { useState } from 'react';

import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import DialogPoll from 'components/DialogPoll';

export default function Poll({ poll, answered, ...props }) {
  const [elevation, setElevation] = useState(1);
  const [open, setOpen] = useState(false);

  const onMouseOver = () => setElevation(3);
  const onMouseOut = () => setElevation(1);

  const handleClose = () => {
    onMouseOut();
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);

  return (
    <Paper
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={elevation}
      sx={{ mx: 1 }}
      {...props}
    >
      <ButtonBase onClick={() => handleOpen()} sx={{ py: 1, px: 2, borderRadius: '4px' }}>
        {answered ? (<CheckBoxIcon color="green" />) : (<CheckBoxOutlineBlankIcon color="warning" />)}
        <Typography ml={1}>{poll.question}</Typography>
      </ButtonBase>
      <DialogPoll open={open} handleClose={() => handleClose()} poll={poll} answered={answered} />
    </Paper>
  );
}
