import { useState, useEffect, useCallback } from 'react';

import { paths } from '#/routes/paths';
import { usePathname, useRouter } from '#/routes/hooks';

import { SplashScreen } from '#/components/loading-screen';

import { useAuthContext } from '../hooks';
import { useSnackbar } from 'notistack';
import { error } from 'console';
import { useDialogControls } from '#/hooks/use-dialog-controls';
import LoginDialog from '#/sections/auth/login-dialog';
import RegisterDialog from '#/sections/auth/register-dialog';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  const check = useCallback(() => {
    if (!authenticated) {
      router.replace("/");
      enqueueSnackbar("Bạn phải đăng nhập và phải có quyền admin", { variant: "error" })
    } else {
      setChecked(true);

    }
  }, [authenticated, router, enqueueSnackbar]);

  useEffect(() => {
    check();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
