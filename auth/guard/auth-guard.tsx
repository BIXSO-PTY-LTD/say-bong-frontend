import { useState, useEffect, useCallback } from 'react';

import { useRouter } from '#/routes/hooks';

import { SplashScreen } from '#/components/loading-screen';

import { useAuthContext } from '../hooks';
import { useSnackbar } from 'notistack';

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

  const { user } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  const check = useCallback(() => {

    if (!user?.roles.length) {
      router.replace("/");
      setTimeout(() => {
        enqueueSnackbar("Bạn chưa đăng nhập hoặc tài khoản phải có quyền admin", {
          variant: 'error', // Loại thông báo (ví dụ: success, error, warning)
          autoHideDuration: 3000 // Thời gian hiển thị thông báo (đơn vị: ms)
        });
      }, 2000);
    } else {
      setChecked(true);

    }
  }, [user, router, enqueueSnackbar]);

  useEffect(() => {
    check();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
