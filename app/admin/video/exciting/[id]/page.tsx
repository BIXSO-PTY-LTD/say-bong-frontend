import { _userList } from '#/_mock/_user';
import { ExcitingEditView } from '#/sections/admin/exciting/view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Thông tin Video',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ExcitingEditPage({ params }: Props) {
  const { id } = params;

  return <ExcitingEditView id={id} />;
}

