import React, { useState, useEffect, forwardRef } from 'react';
import clsx from 'clsx';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import validate from 'utils/validation';
import styles from './styles.module.scss';

const SelectMain = forwardRef(
  ({
    itemValue, itemText, items, value, required, label, name, formState, ...props
  }, ref) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setHasError(validate(formState?.errors, name));
    }, [formState, name]);

    return (
      <FormControl
        margin="dense"
        fullWidth
        required={label ? required : undefined}
        error={hasError}
      >
        {label && (
          <InputLabel id={`select-label-${name}`}>
            {label}
          </InputLabel>
        )}
        <Select
          ref={ref}
          value={value}
          labelId={`select-label-${name}`}
          label={label}
          defaultValue=""
          name={name}
          key={name}
          renderValue={
            (selected) => items?.map((item) => item[itemValue] === selected && item[itemText])
          }
          className={clsx({ [styles.completeBorder]: !label })}
          sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: hasError && '#EA5433' } }}
          {...props}
        >
          <MenuItem value="" className={styles.hidden} />
          {items?.map((item) => (
            <MenuItem
              key={item[itemValue]}
              value={item[itemValue]}
              className="menuItem"
            >
              <ListItemText primary={item[itemText]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

SelectMain.displayName = 'SelectMain';

export default SelectMain;
