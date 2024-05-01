import { NewsCreateView } from "#/sections/admin/news/view";
import SpecialNewsNewEditForm from "#/sections/admin/special-news/special-news-new-edit-form";
import SpecialNewsCreateView from "#/sections/admin/special-news/view/special-news-create-view";

// ----------------------------------------------------------------------


export const metadata = {
  title: 'Dashboard: Thêm tin tức',
};

export default function NewsCreatePage() {
  return <SpecialNewsCreateView />;
}
