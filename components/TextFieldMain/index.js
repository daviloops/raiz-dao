import React, { forwardRef } from 'react';

import TextField from '@mui/material/TextField';

import validate from 'utils/validation';

const TextFieldMain = forwardRef(({
  register, rules, name, formState, setValue, ...props
}, ref) => (
  <>
    {register && name && formState && setValue ? (
      <TextField
        margin="dense"
        fullWidth
        ref={ref}
        key={name}
        {...register(name, rules)}
        onChange={({ target: { value } }) => setValue(name, value)}
        error={validate(formState?.errors, name)}
        {...props}
      />
    ) : (
      <TextField
        ref={ref}
        fullWidth
        margin="dense"
        {...props}
      />
    )}
  </>
));

TextFieldMain.displayName = 'TextFieldMain';

export default TextFieldMain;
