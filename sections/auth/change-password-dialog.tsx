'use client';

import { useBoolean } from '#/hooks/use-boolean';
import { Alert, Dialog, IconButton, InputAdornment, Link, Paper, PaperProps, Stack, Typography, useTheme } from '@mui/material';
import { m, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '#/components/hook-form/form-provider';
import { RHFTextField } from '#/components/hook-form';
import Iconify from '#/components/iconify';
import { LoadingButton } from '@mui/lab';
import { varSlide } from '#/components/animate/variants';
import { useSnackbar } from 'notistack';
import { useAuthContext } from '#/auth/hooks';
import { useRouter } from '#/routes/hooks';
import { useEffect, useState } from 'react';
import { paths } from '#/routes/paths';
import { useChangePassword } from '#/api/user';
import zIndex from '@mui/material/styles/zIndex';

// ----------------------------------------------------------------------
type ChangePasswordDialogProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const theme = useTheme();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!user) {
      router.push(paths.home)
      enqueueSnackbar('Phải đăng nhập', { variant: 'error' });
    }
  }, [user, router, enqueueSnackbar])

  const ChangePassWordSchema = Yup.object().shape({

    password: Yup.string().required('Hãy điền mật khẩu mới'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu phải khớp'),
    oldPassword: Yup.string().required('Hãy điền mật khẩu mới'),

  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
    oldPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const changePassword = useChangePassword();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await changePassword(user?.userName || user?.phone, data.password, data.confirmPassword, data.oldPassword as string);
      reset();
      onClose();
      enqueueSnackbar('Cập nhật thành công');
      console.info('DATA', data);

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });
  const renderHead = (
    <Typography variant="h3" sx={{ color: "black" }} paragraph>
      Đổi mật khẩu
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField
          name="oldPassword"
          type={password.value ? 'text' : 'password'}
          label="Mật khẩu cũ"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="password"
          type={password.value ? 'text' : 'password'}
          label="Mật khẩu mới"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}

        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto', background: "#272463", color: "#fff" }}>
          Lưu thay đổi
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (

    <AnimatePresence>
      <Dialog open={open} onClose={onClose} PaperComponent={(props: PaperProps) => (
        <m.div {...varSlide().inUp}>
          <Paper sx={{ background: theme => theme.palette.common.white }} {...props}>{props.children}</Paper>
        </m.div>
      )}>
        <Stack
          spacing={4}
          sx={{
            p: 4,
            width: 1,
            mx: 'auto',
            flexShrink: 0,
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: theme.customShadows.z24,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {renderHead}

          {renderForm}
        </Stack>
      </Dialog>
    </AnimatePresence>

  );
}