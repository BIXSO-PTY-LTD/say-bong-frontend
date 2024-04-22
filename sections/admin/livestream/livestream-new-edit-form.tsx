import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  RHFUpload,
  RHFUploadFile,
} from '#/components/hook-form';

import { Button, CardHeader, FormHelperText } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import RHFEditor from '#/components/hook-form/rhf-editor';
import { mutate } from 'swr';
import { endpoints } from '#/utils/axios';
import { ILivestreamItem } from '#/types/livestream';
import { useCreateLivestream, useUpdateLivestream } from '#/api/livestream';
import { Upload } from '#/components/upload';
// ----------------------------------------------------------------------

type Props = {
  currentLivestream?: ILivestreamItem;
};

export default function LivestreamNewEditForm({ currentLivestream }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const [file, setFile] = useState<File | null>(null);

  const [videoSrc, setVideoSrc] = useState('')


  const videoRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();




  const LivestreamSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string().required('Title is required'),
    content: Yup.mixed<any>().nullable().required('Phải có file video'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentLivestream?.id || '',
      title: currentLivestream?.title || '',
      content: currentLivestream?.content || null,
    }),
    [currentLivestream]
  );

  const methods = useForm({
    resolver: yupResolver(LivestreamSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([file || ''], { type: 'video/mp4' }));
    setVideoSrc(src)
    setValue('content', src)
  }, [file, setValue])

  useEffect(() => {
    if (currentLivestream) {
      reset(defaultValues);
    }
  }, [currentLivestream, defaultValues, reset]);


  const extractBlobToFile = async (blobUrl: string, fileName: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', blobUrl, true);
      xhr.responseType = 'blob';

      xhr.onload = function () {
        if (xhr.status === 200) {
          const blob = xhr.response;
          const file = new File([blob], fileName, { type: blob.type });
          resolve(file);
        } else {
          reject(new Error('Failed to fetch blob'));
        }
      };

      xhr.onerror = function () {
        reject(new Error('XHR Error'));
      };

      xhr.send();
    });
  };

  const createLiveStream = useCreateLivestream();
  const updateLivestream = useUpdateLivestream();
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data.content);

      const videoFile = extractBlobToFile(data.content, 'video.mp4')
      console.log(videoFile);

      // const filesArray = base64ToFiles(base64Array, 'image/jpeg');

      // Upload files to Cloudinary
      // const uploadedUrls = await Promise.all(filesArray.map(async (file) => {
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   formData.append('upload_preset', 'ml_default');

      //   const response = await fetch('https://api.cloudinary.com/v1_1/dxopjzpvw/image/upload', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to upload image to Cloudinary');
      //   }

      //   const responseData = await response.json();
      //   return responseData.secure_url;
      // }));

      // let updatedContent = data.content;
      // base64Array.forEach((base64String, index) => {
      //   updatedContent = updatedContent.replace(base64String, uploadedUrls[index]);
      // });

      // data.content = updatedContent;

      if (currentLivestream) {
        await updateLivestream(data);
      } else {
        await createLiveStream(data);
      }
      mutate(endpoints.livestream.base);
      enqueueSnackbar(currentLivestream ? 'Cập nhật thành công!' : 'Tạo thành công');
      router.push(paths.dashboard.livestream.root);
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
            Chủ đề, mô tả, livestream,...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField inputColor='#fff' name="title" label="Tiêu đề" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Video file</Typography>
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                  accept='video/*'
                  ref={videoRef}
                />
              </Button>
              <Box>
                <video id='video-summary' controls src={videoSrc} width="100%" height="350px" />
              </Box>

            </Stack>

          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <Box sx={{ mt: 3, width: "100%", textAlign: "end" }}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {currentLivestream ? "Cập nhật" : "Tạo mới"}
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
