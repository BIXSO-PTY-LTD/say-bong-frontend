import { _userList } from '#/_mock/_user';
import { NewsEditView } from '#/sections/admin/news/view';


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

  return <NewsEditView id={id} />;
}

