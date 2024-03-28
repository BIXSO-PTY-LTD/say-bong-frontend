

// ----------------------------------------------------------------------

import { _tours } from "#/_mock";
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

  const currentTour = _tours.find(tour => tour.id === id);

  return <LivestreamDetailView currentTour={currentTour} />;
}
