import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';

import { useResponsive } from '#/hooks/use-responsive';



import { useSnackbar } from '#/components/snackbar';
import FormProvider, {
  RHFTextField,
} from '#/components/hook-form';
import { Box, Stack } from '@mui/material';


// ----------------------------------------------------------------------

type Props = {
  linkAPI?: string;
};

export default function APINewEditForm({ linkAPI }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const NewProductSchema = Yup.object().shape({
    linkAPI: Yup.string().required('Link API is required'),
  });

  const defaultValues = useMemo(
    () => ({
      linkAPI: linkAPI ? linkAPI : ''
    }),
    [linkAPI]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (linkAPI) {
      reset(defaultValues);
    }
  }, [linkAPI, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(linkAPI ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.api);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Chi tiết
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Link...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        {!mdUp && <CardHeader title="Details" />}
        <Box sx={{ p: 3 }}>
          <RHFTextField variant='outlined' inputColor='#fff' name="linkAPI" label="Link API" />
        </Box>
      </Grid>
    </>
  );


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

      </Grid>
    </FormProvider>
  );
}
