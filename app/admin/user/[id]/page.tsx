import { _userList } from '#/_mock/_user';
import UserEditView from '#/sections/admin/user/view/user-edit-view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Thông tin user',
};

type Props = {
  params: {
    id: string;
  };
};

export default function UserEditPage({ params }: Props) {
  const { id } = params;

  return <UserEditView id={id} />;
}

