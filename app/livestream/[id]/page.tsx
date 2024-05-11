

// ----------------------------------------------------------------------


import { useGetLivestream, useGetLivestreams } from "#/api/livestream";
import LivestreamDetailView from "#/sections/livestream/view/livestream-detail-view";

export const metadata = {
  title: 'Say Bóng: Trực tiếp',
};

type Props = {
  params: {
    id: string;
  };
};

export default function LivestreamDetailsPage({ params }: Props) {
  const { id } = params;

  return <LivestreamDetailView id={id} />;
}
