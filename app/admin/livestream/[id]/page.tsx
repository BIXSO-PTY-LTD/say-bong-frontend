import { LivestreamEditView } from '#/sections/admin/livestream/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Thông tin tin tức',
};

type Props = {
  params: {
    id: string;
  };
};

export default function NewsEditPage({ params }: Props) {
  const { id } = params;

  return <LivestreamEditView id={id} />;
}

