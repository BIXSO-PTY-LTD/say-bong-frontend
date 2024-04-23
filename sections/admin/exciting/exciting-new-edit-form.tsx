import * as Yup from 'yup';
import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
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

import { Alert, Button, CardHeader } from '@mui/material';
import { useResponsive } from '#/hooks/use-responsive';
import { ITourProps } from '#/types/tour';
import { Upload } from '#/components/upload';
import { IVideoItem } from '#/types/video';
import { useCreateExcitingVideo, useUpdateExcitingVideo } from '#/api/exciting-video';
import { mutate } from 'swr';
import { endpoints } from '#/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  currentVideo?: IVideoItem;
};

export default function ExcitingNewEditForm({ currentVideo }: Props) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [videoSrc, setVideoSrc] = useState('')

  const videoRef = useRef(null);

  const mdUp = useResponsive('up', 'md');

  const [errorMsg, setErrorMsg] = useState('');

  const { enqueueSnackbar } = useSnackbar();


  // useEffect(() => {
  //   if (currentVideo?.video) {
  //     setFile(currentVideo.video);
  //   }
  // }, [currentVideo?.video]);

  const NewPostSchema = Yup.object().shape({
    id: Yup.string(),

    title: Yup.string().required('Phải có tiêu đề'),
    content: Yup.mixed<any>().nullable().required('Phải có file video'),

  });

  const defaultValues = useMemo(
    () => ({
      id: currentVideo?.id || '',
      title: currentVideo?.title || '',
      content: currentVideo?.content || null,
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
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
      setValue('content', file);
    }
  }, [file, setValue])

  useEffect(() => {
    if (currentVideo) {
      reset(defaultValues);
      setVideoSrc(currentVideo?.content)
    }
  }, [currentVideo, defaultValues, reset]);

  console.log(videoSrc);


  const createExcitingVideo = useCreateExcitingVideo()

  const updateExcitingVideo = useUpdateExcitingVideo()
  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.content);
      formData.append('upload_preset', 'ml_default');

      const response = await fetch('https://api.cloudinary.com/v1_1/dxopjzpvw/video/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const responseData = await response.json();
      const uploadedUrl = responseData.secure_url;


      data.content = uploadedUrl;
      if (currentVideo) {
        await updateExcitingVideo(data)
      } else {
        await createExcitingVideo(data);
      }
      mutate(endpoints.excitingVideo);
      enqueueSnackbar(currentVideo ? 'Cập nhật thành công' : 'Tạo thành công');
      router.push(paths.dashboard.video.exciting.root);
      console.info('DATA', data);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message)
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
          {!mdUp && <CardHeader slug="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <RHFTextField inputColor='#fff' name="title" label="Chủ đề" />
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
              {currentVideo?.content || file ? (
                <Box>
                  <video id="video-summary" controls src={videoSrc} width="100%" height="350px" />
                </Box>
              ) : null}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <Box sx={{ mt: 3, width: "100%", textAlign: "end" }}>
      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
        {currentVideo ? "Cập nhật" : "Tạo mới"}
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
