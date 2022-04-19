import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import * as nearAPI from 'near-api-js';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from '../utils/theme';
import getConfig from '../config';
import '../styles/globals.css';

// Initializing contract
async function initContract() {
  // get network configuration values from config.js
  // based on the network ID we pass to getConfig()
  const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');

  // create a keyStore for signing transactions using the user's key
  // which is located in the browser local storage after user logs in
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();

  // Initializing connection to the NEAR testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Gets the accountId as a string
      accountId: walletConnection.getAccountId(),
      // Gets the user's token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    // User's accountId as a string
    walletConnection.account(),
    // accountId of the contract we will be loading
    // NOTE: All contracts on NEAR are deployed to an account and
    // accounts can only have one contract deployed to them.
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: [],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: [],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      sender: walletConnection.getAccountId(),
    },
  );

  return {
    contract, currentUser, nearConfig, walletConnection,
  };
}

function MyApp({ Component, pageProps }) {
  const [contract2, setContract2] = useState(undefined);
  const [currentUser2, setCurrentUser2] = useState(undefined);
  const [nearConfig2, setNearConfig2] = useState(undefined);
  const [walletConnection2, setWalletConnection2] = useState(undefined);

  useEffect(() => {
    window.nearInitPromise = initContract().then(
      ({
        contract, currentUser, nearConfig, walletConnection,
      }) => {
        setContract2(contract);
        setCurrentUser2(currentUser);
        setNearConfig2(nearConfig);
        setWalletConnection2(walletConnection);
      },
    );
  }, []);

  return (
    <React.StrictMode>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>Raiz</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component
          contract={contract2}
          currentUser={currentUser2}
          nearConfig={nearConfig2}
          wallet={walletConnection2}
          {...pageProps}
        />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
