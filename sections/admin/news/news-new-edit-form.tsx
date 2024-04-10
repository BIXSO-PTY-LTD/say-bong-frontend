import * as Yup from 'yup';
import { useMemo } from 'react';
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

import { IBlogPostProps } from '#/types/blog';
import { CardHeader } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import RHFEditor from '#/components/hook-form/rhf-editor';
import { useBoolean } from '#/hooks/use-boolean';
import { mutate } from 'swr';
import { endpoints } from '#/utils/axios';
import { useCreateNews } from '#/api/news';
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

type Props = {
  currentNews?: INewsItem;
};

export default function NewsNewEditForm({ currentNews }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const preview = useBoolean();

  const { enqueueSnackbar } = useSnackbar();


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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const createNews = useCreateNews();
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentNews) {
        // console.log('Editing News with ID:', currentNews.id);

        // if (avatarFile) {
        //   const uploadResult = await uploadAvatar( currentNews?.id,avatarFile);
        //   console.log('Upload Result:', uploadResult);
        // }
      } else {
        await createNews(data);
      }
      reset();
      mutate(endpoints.news.list);
      enqueueSnackbar(currentNews ? 'Update success!' : 'Create success!');
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
