import { NewsCreateView } from "#/sections/admin/news/view";
import UserCreateView from "#/sections/admin/user/view/user-create-view";

// ----------------------------------------------------------------------


export const metadata = {
  title: 'Dashboard: Thêm tin tức',
};

export default function NewsCreatePage() {
  return <NewsCreateView />;
}
