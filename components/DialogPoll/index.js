import { useForm, Controller } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import DialogMain from 'components/DialogMain';

export default function DialogPoll({
  open, handleClose, poll, answered, ...props
}) {
  const defaultValues = {
    answer: poll.type === 'checkbox' ? [] : '',
  };

  const {
    control, watch, reset, trigger,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  });

  const { answer } = watch();

  const handleClosePoll = () => {
    handleClose();
    reset(defaultValues);
  };

  const submitForm = async () => {
    const canAdvance = await trigger();

    if (canAdvance) {
      if (poll.type === 'checkbox') {
        const cleanedAnswer = answer.filter((item) => item);
        // Todo: submit values to blockchain
        console.log('cleaned answer', cleanedAnswer);
      } else {
        // Todo: submit values to blockchain
        console.log('answer', watch());
      }
      handleClosePoll();
    }
  };

  // Todo: validation
  const getForm = () => {
    switch (poll.type) {
      case 'yesOrNo':
        return (
          <Controller
            control={control}
            name="answer"
            key="answer"
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel key="1" value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel key="2" value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            )}
          />
        );
      case 'radio':
        return (
          <Controller
            control={control}
            name="answer"
            key="answer"
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  aria-labelledby="controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  {poll.options.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        );
      case 'checkbox':
        return (
          <FormControl>
            <FormGroup>
              {poll.options.map((option, index) => (
                <Controller
                  control={control}
                  name={`answer.${index}`}
                  key={option.id}
                  // Todo: implement validation maxLength and minLength
                  render={({ field: { onChange }, field }) => (
                    <FormControlLabel
                      control={(
                        <Checkbox
                          {...field}
                          onChange={(e, v) => onChange(
                            v ? { id: option.id, label: option.label } : undefined,
                          )}
                          label={option.label}
                        />
                      )}
                      label={option.label}
                    />
                  )}
                />
              ))}
            </FormGroup>
          </FormControl>
        );
      default:
        return 'Type of question not found';
    }
  };

  return (
    <DialogMain open={open} handleClose={handleClosePoll} {...props}>
      <Typography variant="h6">{poll.question}</Typography>
      <Typography>{poll.description}</Typography>
      <Box>{getForm()}</Box>
      <Box sx={{ textAlign: 'right', pt: 1 }}>
        <Button variant="contained" disabled={answered} onClick={() => submitForm()}>Confirm</Button>
      </Box>
    </DialogMain>
  );
}
