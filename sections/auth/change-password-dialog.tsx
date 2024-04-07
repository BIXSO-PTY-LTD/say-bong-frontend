'use client';

import { useBoolean } from '#/hooks/use-boolean';
import { RouterLink } from '#/routes/components';
import { paths } from '#/routes/paths';
import { Box, Dialog, IconButton, InputAdornment, Link, Paper, PaperProps, Stack, Typography, useTheme } from '@mui/material';
import { m, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '#/components/hook-form/form-provider';
import { RHFTextField } from '#/components/hook-form';
import Iconify from '#/components/iconify';
import { LoadingButton } from '@mui/lab';
import { varSlide } from '#/components/animate/variants';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------
type ChangePasswordDialogProps = {
  open: boolean;
  onClose: VoidFunction;
};

export default function ChangePasswordDialog({ open, onClose }: ChangePasswordDialogProps) {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Hãy điền mật khẩu cũ'),
    newPassword: Yup.string()
      .required('Hãy điền mật khẩu mới')
      .test(
        'no-match',
        'Mật khẩu mới phải khác mật khẩu cũ',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Mật khẩu phải trùng khớp'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
          name="newPassword"
          label="Mật khẩu mới"
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

        <RHFTextField
          name="confirmNewPassword"
          type={password.value ? 'text' : 'password'}
          label="Xác nhận mật khẩu"
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