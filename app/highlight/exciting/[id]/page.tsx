

// ----------------------------------------------------------------------

import ExcitingDetailView from "#/sections/highlight/exciting/exciting-detail-view";

export const metadata = {
  title: 'Say bóng: Những pha bóng thú vị',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ExcitingDetailsPage({ params }: Props) {
  const { id } = params;


  return <ExcitingDetailView id={id} />;
}
