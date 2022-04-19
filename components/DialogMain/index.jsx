import clsx from 'clsx';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.scss';

export default function DialogMain({
  children,
  className,
  paperClass,
  open,
  handleClose,
  contentClass,
  buttonContainerClass,
  ...props
}) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ className: clsx(styles.dialog, paperClass) }}
      {...props}
    >
      <Box>
        <Box className={clsx(styles.closeButtonContainer, buttonContainerClass)}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon className={styles.closeIcon} />
          </IconButton>
        </Box>
        <Box className={clsx(styles.content, contentClass)}>{children}</Box>
      </Box>
    </Dialog>
  );
}
