import * as Yup from 'yup';
import { useMemo, useCallback, useEffect } from 'react';
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
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);

  return (
    <FormProvider methods={methods}>
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
            <RHFTextField contentEditable={false} inputColor='#fff' name="userName" label="Username" />
            <RHFTextField inputColor='#fff' name="fullName" label="Họ và tên" />
            <RHFTextField inputColor='#fff' name="phone" label="Số điện thoại" />

          </Box>


        </Card>
      </Grid>
    </FormProvider>
  );
}
