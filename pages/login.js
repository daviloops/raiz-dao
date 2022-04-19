import { useEffect } from 'react';
import Router from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ROUTES from '../utils/routes';
import useAuth from '../utils/useAuth';

function Login({
  contract, currentUser, nearConfig, wallet,
}) {
  const user = useAuth(currentUser);

  useEffect(() => {
    if (user) Router.push(ROUTES.HOME);
  }, [user]);

  const signIn = () => {
    wallet.requestSignIn(
      // Todo: fill in the methods of contract
      {
        contractId: nearConfig.contractName,
        methodNames: [contract.hi],
      }, // contract requesting access
      'NEAR Raiz DAO', // optional name
      null, // optional URL to redirect to if the sign in was successful
      null, // optional URL to redirect to if the sign in was NOT successful
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="images/background-login.png" alt="logo" style={{ width: '280px' }} />
      <Button variant="outlined" onClick={() => signIn()} sx={{ mt: 4 }}>Login</Button>
    </Box>
  );
}

export default Login;
