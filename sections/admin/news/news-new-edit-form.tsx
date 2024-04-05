import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';

import { fData } from '#/utils/format-number';

import { countries } from '#/assets/data';

import Label from '#/components/label';
import Iconify from '#/components/iconify';
import { useSnackbar } from '#/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFUpload,
} from '#/components/hook-form';

import { IUserItem } from '#/types/user';
import { IBlogPostProps } from '#/types/blog';
import { CardHeader } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import RHFEditor from '#/components/hook-form/rhf-editor';
import { useBoolean } from '#/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = {
  currentNews?: IBlogPostProps;
};

export default function NewsNewEditForm({ currentNews }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const preview = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  console.log(currentNews?.content);

  const NewPostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentNews?.title || '',
      content: currentNews?.content || '',
    }),
    [currentNews]
  );

  const methods = useForm({
    resolver: yupResolver(NewPostSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentNews ? 'Cập nhật thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.news.root);
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
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField inputColor='#fff' name="title" label="Post Title" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <Box sx={{ mt: 3, width: "100%", textAlign: "end" }}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        Tạo mới
      </LoadingButton>
    </Box>
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>

    </FormProvider>
  );
}
