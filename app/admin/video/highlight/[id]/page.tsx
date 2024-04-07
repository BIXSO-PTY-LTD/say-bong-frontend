import { _userList } from '#/_mock/_user';
import { HighlightEditView } from '#/sections/admin/highlight/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Thông tin Highlight',
};

type Props = {
  params: {
    id: string;
  };
};

export default function HighlightEditPage({ params }: Props) {
  const { id } = params;

  return <HighlightEditView id={id} />;
}

