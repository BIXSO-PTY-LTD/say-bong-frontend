import { useCallback, useState } from 'react'; // Import useState hook
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert, Dialog, IconButton, InputAdornment, Link, Paper, PaperProps, Stack, Typography, useTheme } from '@mui/material';
import { m, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from '#/components/hook-form';
import Iconify from '#/components/iconify';
import FormProvider from '#/components/hook-form/form-provider';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { useBoolean } from '#/hooks/use-boolean';
import { varSlide } from '#/components/animate/variants';
import { useAuthContext } from '#/auth/hooks';
import { useSnackbar } from 'notistack';
import { axiosHost, endpoints } from '#/utils/axios';

// ----------------------------------------------------------------------
type RegisterDialogProps = {
  open: boolean;
  onClose: VoidFunction;
  openLogin: VoidFunction;
};

export default function RegisterDialog({ open, openLogin, onClose }: RegisterDialogProps) {
  const { register } = useAuthContext();
  const passwordShow = useBoolean();
  const theme = useTheme();
  const [errorMsg, setErrorMsg] = useState('');

  const { enqueueSnackbar } = useSnackbar();


  const handleLogin = useCallback(() => {
    onClose();
    openLogin();
  }, [onClose, openLogin])

  const RegisterSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Số điện thoại phải có đúng 10 chữ số')
      .required('Hãy điền số điện thoại'),
    fullName: Yup.string().required('Hãy điền tên của bạn'),
    userName: Yup.string().required('Hãy điền tên tài khoản'),
    password: Yup.string().required('Hãy điền mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu')
      .required('Hãy nhập mật khẩu xác nhận'),
  });

  const defaultValues = {
    phone: '',
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosHost.post(endpoints.auth.register, data);
      onClose()
      enqueueSnackbar("Đăng ký thành công")
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  });

  const renderHead = (
    <div>
      <Typography variant="h3" sx={{ color: "black" }} paragraph>
        Đăng Kí
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {`Bạn đã có tài khoản? `}
        <Typography
          component="span"
          sx={{ cursor: 'pointer' }}
          onClick={handleLogin}
          variant="subtitle2"
          color="#01B243"
        >
          Đăng nhập
        </Typography>
      </Typography>
    </div>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5} alignItems="flex-end">
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <RHFTextField name="phone" label="Số điện thoại" />
        <RHFTextField name="fullName" label="Họ Tên" />
        <RHFTextField name="userName" label="Tên tài khoản" />
        <RHFTextField
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
        <RHFTextField
          name="confirmPassword"
          label="Nhập lại mật khẩu"
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
          Đăng ký
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
