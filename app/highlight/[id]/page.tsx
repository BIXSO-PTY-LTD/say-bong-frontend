

// ----------------------------------------------------------------------

import { _tours } from "#/_mock";
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

export default function HighlightDetailsPage({ params }: Props) {
  const { id } = params;

  const currentTour = _tours.find(tour => tour.id === id);

  return <HighlightDetailView currentTour={currentTour} />;
}
