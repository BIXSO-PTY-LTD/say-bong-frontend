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

// ----------------------------------------------------------------------
type LoginDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  openRegister: VoidFunction;
};

export default function LoginDialog({ open, openRegister, onClose }: LoginDialogProps) {
  const passwordShow = useBoolean();

  const theme = useTheme();

  const handleRegister = useCallback(() => {
    onClose();
    openRegister();
  }, [onClose, openRegister])

  const LoginSchema = Yup.object().shape({
    phone_or_account: Yup.string().required('Hãy điền số điện thoại hoặc tên tài khoản'),
    password: Yup.string()
      .required('Hãy điền mật khẩu')
  });

  const defaultValues = {
    phone_or_account: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <Box >
      <Typography variant="h3" sx={{ color: "black" }} paragraph>
        Đăng nhập
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Bạn có tài khoản chưa?`}
        <Typography
          component="span"
          sx={{ cursor: 'pointer' }}
          onClick={handleRegister}
          variant="subtitle2"
          color="#01B243"
        >
          Đăng kí
        </Typography>
      </Typography>
    </Box>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        <RHFTextField inputColor="black" name="phone_or_account" label="Số điện thoại / Tài khoản" />

        <RHFTextField
          inputColor="black"
          name="password"
          label="Mật khẩu"
          type={passwordShow.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={passwordShow.onToggle} edge="end">
                  <Iconify icon={passwordShow.value ? 'carbon:view' : 'carbon:view-off'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          sx={{ background: "#272463", color: theme.palette.common.white }}
          variant="contained"
          loading={isSubmitting}
        >
          Đăng nhập
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