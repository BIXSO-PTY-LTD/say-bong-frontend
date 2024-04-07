

// ----------------------------------------------------------------------

import { _tours } from "#/_mock";
import ExcitingDetailView from "#/sections/highlight/exciting/exciting-detail-view";
import HighlightDetailView from "#/sections/highlight/highlight-detail-view";
import LivestreamDetailView from "#/sections/livestream/view/livestream-detail-view";

export const metadata = {
  title: 'Dashboard: Post Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ExcitingDetailsPage({ params }: Props) {
  const { id } = params;

  const currentTour = _tours.find(tour => tour.id === id);

  return <ExcitingDetailView currentTour={currentTour} />;
}
