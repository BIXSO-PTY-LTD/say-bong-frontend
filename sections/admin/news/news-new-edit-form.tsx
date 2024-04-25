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
import { axiosHost, endpoints } from '#/utils/axios';
import { useCreateNews, useUpdateNew } from '#/api/news';
import { INewsItem } from '#/types/news';
import { useUpload } from '#/api/upload';
import { HOST_API } from '#/config-global';

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
    title: Yup.string().required('Phải có tiêu đề'),

    content: Yup.string().required('Phải có nội dung'),

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

  function base64ToFiles(base64Array: string[]) {
    const filesArray = [];

    for (let i = 0; i < base64Array.length; i++) {
      const base64String = base64Array[i];
      const base64Data = base64String.split(',')[1]; // Remove prefix
      const binaryData = atob(base64Data); // Decode base64 string to binary
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let j = 0; j < binaryData.length; j++) {
        uint8Array[j] = binaryData.charCodeAt(j); // Convert to UTF-16 code units
      }

      const blob = new Blob([uint8Array]); // Create blob from binary data
      const file = new File([blob], `file${i}.png`, { type: 'image/png' }); // Create File object

      filesArray.push(file);
    }

    return filesArray;
  }

  const upload = useUpload();
  const createNews = useCreateNews();
  const updateNew = useUpdateNew();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const base64Array = extractBase64Src(data.content);

      const filesArray = base64ToFiles(base64Array);


      const FilesContent = await upload(filesArray)
      const fileNames = FilesContent.map((file: any) => file.filename);

      let updatedContent = data.content;

      base64Array.forEach((base64String, index) => {
        updatedContent = updatedContent.replace(base64String, `${HOST_API}/api/v1/${fileNames[index]}`);
      });

      data.content = updatedContent;

      if (currentNew) {
        await updateNew(data);
      } else {
        await createNews(data);
      }
      mutate(endpoints.news);
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
            Chi tiết
          </Typography>

        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField inputColor='#fff' name="title" label="Tiêu đề" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Nội dung</Typography>
              <RHFEditor simple name="content" />
              <FormHelperText>Hình ảnh đẹp nhất khi ở 630x500</FormHelperText>
              <FormHelperText>Chỉ upload tối đa 5 hình</FormHelperText>
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