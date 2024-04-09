import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';



import { useSnackbar } from '#/components/snackbar';
import FormProvider, {
  RHFTextField,
} from '#/components/hook-form';
import { AuthUserType } from '#/auth/types';
import { useUpdateUser } from '#/api/user';


// ----------------------------------------------------------------------

type Props = {
  currentUser?: AuthUserType;
};

export default function AccountEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    id: Yup.string().required('Hãy điền id'),
    userName: Yup.string().required('Hãy điền username'),
    fullName: Yup.string().required('Hãy điền tên'),
    phone: Yup.string().required('Hãy điền số điện thoại'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      fullName: currentUser?.fullName || '',
      userName: currentUser?.userName || '',
      phone: currentUser?.phone || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const updateUser = useUpdateUser()
  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateUser(data);
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.account.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField inputColor='#fff' name="userName" label="Username" />
            <RHFTextField inputColor='#fff' name="fullName" label="Họ và tên" />
            <RHFTextField inputColor='#fff' name="phone" label="Số điện thoại" />

          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" sx={{ background: "#01B243", color: "#fff" }} loading={isSubmitting}>
              Lưu Thay đổi
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}
