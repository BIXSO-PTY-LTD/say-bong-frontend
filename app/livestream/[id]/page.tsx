

// ----------------------------------------------------------------------

import { _tours } from "#/_mock";
import { useGetLivestream, useGetLivestreams } from "#/api/livestream";
import LivestreamDetailView from "#/sections/livestream/view/livestream-detail-view";

export const metadata = {
  title: 'Dashboard: Post Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function LivestreamDetailsPage({ params }: Props) {
  const { id } = params;
  const { livestream: currentLivestream } = useGetLivestream(id);
  const { livestreams } = useGetLivestreams();
  return <LivestreamDetailView currentLivestream={currentLivestream} livestreams={livestreams} />;
}
