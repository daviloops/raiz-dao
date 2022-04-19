import { useEffect } from 'react';
import Router from 'next/router';

import ROUTES from './routes';

export default function useAuth(currentUser) {
  // const { data: user } = useSWR("api/session");
  const user = !!currentUser;

  useEffect(() => {
    if (!user) Router.push(ROUTES.LOGIN);
  }, [user]);

  return user;
}
