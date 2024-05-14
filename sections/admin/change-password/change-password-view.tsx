'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Container, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from '#/hooks/use-boolean';

import Iconify from '#/components/iconify';
import { useSnackbar } from '#/components/snackbar';
import { useSettingsContext } from '#/components/settings';
import FormProvider, { RHFTextField } from '#/components/hook-form';
import { useState } from 'react';
import { useChangePassword } from '#/api/user';
import { useAuthContext } from '#/auth/hooks';





// ----------------------------------------------------------------------


export default function ChangePasswordView() {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

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
      enqueueSnackbar('Cập nhật thành công');
      setErrorMsg('')
      console.info('DATA', data);

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
    }
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Đổi mật khẩu
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack component={Card} spacing={3} sx={{ p: 3 }}>
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
            label="Nhập lại mật khẩu mới"
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

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ ml: 'auto' }}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}
