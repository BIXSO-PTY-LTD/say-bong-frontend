import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { IMatchInfo, IMatchItem } from '#/types/match';
import { useSnackbar } from '#/components/snackbar';
import { useGetInfoMatches } from '#/api/match';
import FormProvider from '#/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from '#/components/hook-form';
import { MATCH_HOT_OPTIONS, MATCH_LIVE_OPTIONS } from '#/_mock';
import LivestreamNewEditBroadCaster from './livestream-new-edit-broadcoaster';
import { useCreateLivestream, useDeleteLivestream, useGetLivestreams, useUpdateLivestream } from '#/api/livestream';
import { ILivestreamItem, ILivestreamMetas } from '#/types/livestream';
import { mutate } from 'swr';


// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentLivestream?: IMatchItem;
  matchesInfo: IMatchInfo[];
  endpoints: string;
  livestreams: ILivestreamItem[]
};

export default function LivestreamQuickEditForm({ currentLivestream, open, onClose, matchesInfo, endpoints, livestreams }: Props) {
  const { enqueueSnackbar } = useSnackbar();


  const [currentMatchInfo, setCurrentMatchInfo] = useState<IMatchInfo>();

  const [matchingLivestream, setMatchingLivestream] = useState<ILivestreamItem>()


  const [metas, setMetas] = useState<ILivestreamMetas[]>();

  const NewMatchSchema = Yup.object().shape({
    id: Yup.string().required('Trường bắt buộc'),
    localteam_title: Yup.string(),
    visitorteam_title: Yup.string(),
    score: Yup.string(),
    live: Yup.string().required('Trường bắt buộc'),
    m3u8: Yup.string(),
    league_title: Yup.string(),
    startTimez: Yup.string(),
    localteam_logo: Yup.string(),
    visitorteam_logo: Yup.string(),
    hot: Yup.string().required('Trường bắt buộc'),
    broadcaster: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        link: Yup.string(),
      })
    ),
  });

  const defaultValues = useMemo(
    () => {
      // Extract broadcaster information from metas
      const broadcasterMetas = metas
        ?.filter(meta => meta.key?.startsWith('broadcaster'))
        .map(meta => {
          const [name, link] = meta.content?.split(' ') ?? ['', ''];
          return { name, link };
        }) || [{ name: '', link: '' }];

      return {
        id: currentLivestream?.matchId || '',
        localteam_title: currentLivestream?.localteam_title || '',
        visitorteam_title: currentLivestream?.visitorteam_title || '',
        score: currentMatchInfo?.score.replace(",", " - ") ?? '',
        live: metas?.find(meta => meta.key === 'live')?.content ?? '',
        m3u8: currentLivestream?.m3u8 || '',
        broadcaster: broadcasterMetas,
        league_title: currentLivestream?.league_title || '',
        startTimez: currentLivestream?.startTimez || '',
        localteam_logo: currentLivestream?.localteam_logo || '',
        visitorteam_logo: currentLivestream?.visitorteam_logo || '',
        hot: metas?.find(meta => meta.key === 'hot')?.content ?? ''
      };
    },
    [
      currentLivestream?.league_title,
      currentLivestream?.localteam_logo,
      currentLivestream?.localteam_title,
      currentLivestream?.m3u8,
      currentLivestream?.matchId,
      currentLivestream?.startTimez,
      currentLivestream?.visitorteam_logo,
      currentLivestream?.visitorteam_title,
      currentMatchInfo?.score,
      metas
    ]
  );

  const methods = useForm({
    resolver: yupResolver(NewMatchSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (matchesInfo && currentLivestream) {
      reset(defaultValues);
      setCurrentMatchInfo(matchesInfo.find(item => item.matchId === currentLivestream.matchId));
      console.log(livestreams);

      setMatchingLivestream(livestreams.find(item => item.title === currentLivestream.matchId));

      if (matchingLivestream) {
        setMetas(matchingLivestream.meta);
      }
    }
  }, [currentLivestream, matchesInfo, livestreams, reset, defaultValues, matchingLivestream]);

  const createLivestream = useCreateLivestream()
  const updateLivestream = useUpdateLivestream()
  // const deleteLivestream = useDeleteLivestream()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const metas = [
        { key: 'live', content: data.live },
        { key: 'hot', content: data.hot }
      ];

      if (data.live === 'Người phát sóng trực tiếp' && data.broadcaster) {
        data.broadcaster.forEach((broadcaster, index) => {
          metas.push({ key: `broadcaster${index}`, content: `${broadcaster.name} ${broadcaster.link}` });
        });
      }

      if (matchingLivestream) {
        await updateLivestream({ id: matchingLivestream.id, title: data.id, content: data.m3u8, metas: metas });
        enqueueSnackbar('Livestream updated!');

      } else {
        await createLivestream({ title: data.id, content: data.m3u8, metas: metas });
        enqueueSnackbar('Livestream created!');
      }
      mutate(endpoints)
      reset();
      onClose();
      console.info('DATA', data);
    } catch (error) {
      console.error('Error saving Livestream:', error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Cập nhật</DialogTitle>

        <DialogContent>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="id" label="ID" disabled />
            <RHFTextField name="league_title" label="Tên giải đấu" disabled />
            <RHFTextField name="score" inputColor='white' label="Tỉ số hiện tại" disabled />

            <RHFTextField name="startTimez" label="Ngày thi đấu" disabled />
            <RHFTextField name="localteam_title" label="Đội nhà" disabled />

            <RHFTextField name="visitorteam_title" label="Đội khách" disabled />
            <RHFTextField name="localteam_logo" label="Logo đội nhà" disabled />

            <RHFTextField name="visitorteam_logo" label="Logo đội khách" disabled />

            <RHFSelect
              fullWidth
              name="live"
              label="Live"
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {MATCH_LIVE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              fullWidth
              name="hot"
              label="Lập lịch thủ công"
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {MATCH_HOT_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>


          </Box>
          <RHFTextField sx={{ my: 2 }} name="m3u8" inputColor='white' label="Nguồn video(Luồng phát live)" disabled />
          {values.live === "Người phát sóng trực tiếp" && <LivestreamNewEditBroadCaster />}


        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Hủy
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Lưu lại
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
