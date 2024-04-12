import * as Yup from 'yup';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';



import { useSnackbar } from '#/components/snackbar';
import FormProvider, {
  RHFTextField,
} from '#/components/hook-form';

import { CardHeader } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import { ITourProps } from '#/types/tour';
import { Upload } from '#/components/upload';

// ----------------------------------------------------------------------

type Props = {
  currentVideo?: ITourProps;
};

export default function HighlightNewEditForm({ currentVideo }: Props) {
  const router = useRouter();

  const [file, setFile] = useState<File | string | null>(currentVideo?.video || null);

  const mdUp = useResponsive('up', 'md');


  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (currentVideo?.video) {
      setFile(currentVideo.video);
    }
  }, [currentVideo?.video]);

  const NewPostSchema = Yup.object().shape({
    slug: Yup.string().required('slug is required'),
    video: Yup.mixed<any>().nullable().required('Video is required')
  });

  const defaultValues = useMemo(
    () => ({
      slug: currentVideo?.slug || '',
      video: currentVideo?.video || null,
    }),
    [currentVideo]
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

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);




  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentVideo ? 'Cập nhật thành công!' : 'Tạo thành công!');
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
            slug, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader slug="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField inputColor='#fff' name="slug" label="Post slug" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Video</Typography>
              <Upload file={file} onDrop={handleDrop} onDelete={() => setFile(null)} />
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
