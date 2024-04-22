import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
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

import { CardHeader, FormHelperText } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import RHFEditor from '#/components/hook-form/rhf-editor';
import { mutate } from 'swr';
import { endpoints } from '#/utils/axios';
import { useCreateNews, useUpdateNew } from '#/api/news';
import { INewsItem } from '#/types/news';

// ----------------------------------------------------------------------

type Props = {
  currentNew?: INewsItem;
};

export default function NewsNewEditForm({ currentNew }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');


  const { enqueueSnackbar } = useSnackbar();


  const NewPostSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string().required('Title is required'),

    content: Yup.string().required('content is required'),

  });

  const defaultValues = useMemo(
    () => ({
      id: currentNew?.id || '',
      title: currentNew?.title || '',
      content: currentNew?.content || '',
    }),
    [currentNew]
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

  useEffect(() => {
    if (currentNew) {
      reset(defaultValues);
    }
  }, [currentNew, defaultValues, reset]);

  const extractBase64Src = (content: string) => {
    const imgSrcRegex = /data:image\/(?:png|jpeg|jpg|gif);base64,([^'"]+)/g;
    const base64SrcArray = [];
    let match;

    while ((match = imgSrcRegex.exec(content)) !== null) {
      base64SrcArray.push(match[0]); // Pushing the whole match
    }

    return base64SrcArray;
  };

  const base64ToBlob = (base64String: string, contentType = '') => {
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    const byteCharacters = atob(base64WithoutPrefix);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  };

  const base64ToFiles = (base64Array: string[], contentType = '') => {
    return base64Array.map((base64String) => {
      const blob = base64ToBlob(base64String, contentType);

      const fileName = `image_${Date.now()}`;
      return new File([blob], fileName, { type: contentType });
    });
  };


  const createNews = useCreateNews();
  const updateNew = useUpdateNew();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const base64Array = extractBase64Src(data.content);

      const filesArray = base64ToFiles(base64Array, 'image/jpeg');

      // Upload files to Cloudinary
      const uploadedUrls = await Promise.all(filesArray.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        const response = await fetch('https://api.cloudinary.com/v1_1/dxopjzpvw/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }

        const responseData = await response.json();
        return responseData.secure_url;
      }));

      let updatedContent = data.content;
      base64Array.forEach((base64String, index) => {
        updatedContent = updatedContent.replace(base64String, uploadedUrls[index]);
      });

      data.content = updatedContent;

      if (currentNew) {
        await updateNew(data);
      } else {
        await createNews(data);
      }
      mutate(endpoints.news.list);
      enqueueSnackbar(currentNew ? 'Cập nhật thành công!' : 'Tạo thành công');
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
              <Typography variant="subtitle2">Nội dung</Typography>
              <RHFEditor simple name="content" />
              <FormHelperText>Hình ảnh đẹp nhất khi ở 630x500</FormHelperText>
            </Stack>

          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <Box sx={{ mt: 3, width: "100%", textAlign: "end" }}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {currentNew ? "Cập nhật" : "Tạo mới"}
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
