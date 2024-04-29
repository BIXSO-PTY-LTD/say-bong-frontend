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
import { useUpload } from '#/api/upload';
import { HOST_API } from '#/config-global';
// ----------------------------------------------------------------------

type Props = {
  currentLivestream?: ILivestreamItem;
};

export default function LivestreamNewEditForm({ currentLivestream }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');


  const { enqueueSnackbar } = useSnackbar();

  const LivestreamSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string().required('Phải có tiêu đề'),
    content: Yup.string().required('Phải có link livestream'),
    metas: Yup.array().of(
      Yup.object().shape({
        key: Yup.string(),
        content: Yup.mixed<any>().nullable()
      })
    )
  });
  const defaultValues = useMemo(
    () => ({
      id: currentLivestream?.id || '',
      title: currentLivestream?.title || '',
      content: currentLivestream?.content || "",
      metas: currentLivestream?.meta || [{ key: 'thumbnail', content: '' }],
    }),
    [currentLivestream]
  );

  const methods = useForm({
    resolver: yupResolver(LivestreamSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;



  useEffect(() => {
    if (currentLivestream) {
      reset(defaultValues);
    }
  }, [currentLivestream, defaultValues, reset]);


  const upload = useUpload()
  const createLiveStream = useCreateLivestream();
  const updateLivestream = useUpdateLivestream();
  const onSubmit = handleSubmit(async (data) => {
    try {

      if (data.metas && data.metas.length > 0) {
        if (data.metas[0].content instanceof File) {

          const fileData = await upload(data.metas[0].content)

          data.metas[0].content = `${HOST_API}/api/v1/${fileData[0].filename}`
        }

      } else {
        console.log('No metas found or metas array is empty');
      }

      if (currentLivestream) {
        await updateLivestream(data);
      } else {
        await createLiveStream(data);
      }
      mutate(endpoints.livestream);
      enqueueSnackbar(currentLivestream ? 'Cập nhật thành công!' : 'Tạo thành công');
      router.push(paths.dashboard.livestream.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('metas.0.content', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('metas.0.content', null);
  }, [setValue]);



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

            <RHFTextField inputColor='#fff' name="content" label="Link livestream" />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Hình hiển thị</Typography>
              <RHFUpload
                name="metas.0.content"
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
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
