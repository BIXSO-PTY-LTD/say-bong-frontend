
import { NewsEditView } from '#/sections/admin/news/view';
import SpecialNewsEditView from '#/sections/admin/special-news/view/special-news-edit-view';


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

  return <SpecialNewsEditView id={id} />;
}

