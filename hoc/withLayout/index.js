import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BallotIcon from '@mui/icons-material/Ballot';
import PaidIcon from '@mui/icons-material/Paid';
import GroupsIcon from '@mui/icons-material/Groups';
import GavelIcon from '@mui/icons-material/Gavel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import useAuth from '../../utils/useAuth';
import ROUTES from '../../utils/routes';
import styles from './styles.module.scss';

const withLayout = (Component) => function WrappedComponent({ ...props }) {
  const user = useAuth();
  const router = useRouter();
  const isMd = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [open, setOpen] = useState(false);

  // if (!user) return null;

  // Todo: logout from near
  const handleLogout = () => {};

  const handleDrawerToggle = (prev) => setOpen(!prev);

  const drawerWidth = isMd ? 216 : 168;

  const drawerLinks = [
    { text: 'Home', icon: <HomeIcon />, route: ROUTES.HOME },
    { text: 'Market', icon: <StorefrontIcon />, route: ROUTES.MARKET },
    { text: 'Farms', icon: <AgricultureIcon />, route: ROUTES.FARMS },
    { text: 'Polls', icon: <HowToVoteIcon />, route: ROUTES.POLLS },
    { text: 'Tasks', icon: <BallotIcon />, route: ROUTES.TASKS },
    { text: 'Treasury', icon: <PaidIcon />, route: ROUTES.TREASURY },
    { text: 'Groups', icon: <GroupsIcon />, route: ROUTES.GROUPS },
    { text: 'Governance', icon: <GavelIcon />, route: ROUTES.GOVERNANCE },
  ];

  const drawer = (
    <Box sx={{
      backgroundColor: 'primary.main',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 1,
      py: 2,
    }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Avatar
          // alt={`${user.name}-profile-picture`}
          // src={userProfilePicture}
          className={styles.avatar}
        />
        {/* // Todo: integrate user name */}
        <Typography variant="subtitle2" className={styles.name}>
          user_name
        </Typography>
        <Button
          variant="text"
          onClick={handleLogout}
          sx={{
            px: 2,
            mt: 2,
            '&:hover': {
              color: 'primary.main',
            },
          }}
          className={styles.logout}
        >
          Logout
        </Button>
        <List className={styles.list}>
          {drawerLinks.map(({ text, icon, route }) => (
            <ListItem
              button
              key={text}
              onClick={() => router.push(route)}
              selected={router.pathname === route}
              sx={(theme) => ({
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  '& .MuiTypography-root': {
                    fontWeight: 600,
                  },
                  backgroundColor: '#fff',
                  borderRadius: '26px',
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                  },
                },
              })}
              className={styles.listItem}
            >
              <ListItemIcon sx={{ color: 'inherit' }} className={styles.listItemIcon}>{icon}</ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ className: styles.listItemTextTypography }}
                className={styles.listItemText}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* // Todo: integrate raiz logo */}
      {/* {isMd && (
        <Box sx={{ mt: '24px', mb: '48px' }}>
          <img
            src="/assets/hyatt-logo2.svg"
            alt="raiz-logo"
            style={{
              maxHeight: '270px',
              maxWidth: '180px',
            }}
          />
        </Box>
      )} */}
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', width: '100vw', backgroundColor: user && 'background.main' }}>
      <CssBaseline />
      {user ? (
        <>
          <Drawer
            variant={isMd ? 'permanent' : 'temporary'}
            open={!isMd && open}
            onClose={!isMd ? handleDrawerToggle : undefined}
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
          >
            {drawer}
          </Drawer>
          <Box
            component="main"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              height: '100%',
              ml: { md: `${drawerWidth}px` },
              py: 4,
              px: 6,
            }}
          >
            <Component {...props} />
          </Box>
        </>
      ) : (
        <Box
          component="main"
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Component {...props} />
        </Box>
      )}
    </Box>
  );
};

withLayout.propTypes = {
  Component: PropTypes.node.isRequired,
};

export default withLayout;
