

// ----------------------------------------------------------------------

import HighlightDetailView from "#/sections/highlight/highlight-detail-view";

export const metadata = {
  title: 'Dashboard: Highlight',
};

type Props = {
  params: {
    id: string;
  };
};

export default function HighlightDetailsPage({ params }: Props) {
  const { id } = params;


  return <HighlightDetailView id={id} />;
}
