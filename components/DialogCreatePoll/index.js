import { useForm, Controller, useFieldArray } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import DialogMain from 'components/DialogMain';
import SelectMain from 'components/SelectMain';
import TextFieldMain from 'components/TextFieldMain';
import styles from './styles.module.scss';

export default function DialogCreatePoll({
  open, handleClose, poll, answered, ...props
}) {
  const defaultValues = {
    question: '',
    description: '',
    type: '',
    options: [{ label: '' }, { label: '' }],
    optionsNumber: 0,
  };

  const {
    control, watch, reset, trigger, register, formState, setValue,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    question, description, type, options,
  } = watch();

  const handleCloseDialog = () => {
    handleClose();
    reset(defaultValues);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const submitForm = async () => {
    const canAdvance = await trigger();

    if (canAdvance) {
      // if (poll.type === 'checkbox') {
      //   const cleanedAnswer = answer.filter((item) => item);
      //   // Todo: submit values to blockchain
      //   console.log('cleaned answer', cleanedAnswer);
      // } else {
      //   // Todo: submit values to blockchain
      //   console.log('answer', watch());
      // }
      handleCloseDialog();
    } else {
      console.log('er', formState.errors);
    }
  };

  const pollTypes = [
    { id: 'yesOrNo', name: 'Yes or no' },
    { id: 'radio', name: 'Single selection' },
    { id: 'checkbox', name: 'Multiple selection' },
  ];

  return (
    <DialogMain open={open} handleClose={handleCloseDialog} paperClass={styles.paper} {...props}>
      <Typography variant="h6" color="primary">New poll</Typography>
      <Box mt={1}>
        <TextFieldMain
          label="Question"
          name="question"
          setValue={setValue}
          register={register}
          rules={{ required: true }}
          formState={formState}
          required
        />
      </Box>
      <Box mt={1}>
        <TextFieldMain
          label="Description"
          register={register}
          setValue={setValue}
          name="description"
          formState={formState}
          multiline
          rows={2}
        />
      </Box>
      <Box mt={1}>
        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
          render={({ field }) => (
            <SelectMain
              {...field}
              label="Question type"
              items={pollTypes}
              itemValue="id"
              itemText="name"
              formState={formState}
              required
            />
          )}
        />
      </Box>
      {(type === 'radio' || type === 'checkbox') && (
        <Box mt={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Options</Typography>
            <IconButton color="green" onClick={() => append({ label: '' })}>
              <AddCircleIcon />
            </IconButton>
            <IconButton color="green" disabled={options.length === 2} onClick={() => remove(options.length - 1)}>
              <RemoveCircleIcon />
            </IconButton>
          </Box>
          <Box>
            {fields.map((option, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box mt={1} key={index}>
                <TextFieldMain
                  label={`Option ${index + 1}`}
                  register={register}
                  name={`options.${index}.label`}
                  setValue={setValue}
                  rules={{ required: true }}
                  formState={formState}
                />
              </Box>
            ))}
            {/* // Todo: validation of options */}
          </Box>
        </Box>
      )}
      <Box sx={{ textAlign: 'right', pt: 2 }}>
        <Button variant="contained" onClick={() => submitForm()}>Create</Button>
      </Box>
    </DialogMain>
  );
}
