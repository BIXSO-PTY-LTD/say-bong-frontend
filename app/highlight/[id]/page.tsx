

// ----------------------------------------------------------------------

import HighlightDetailView from "#/sections/highlight/highlight-detail-view";

export const metadata = {
  title: 'Say Bóng: Highlights',
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
