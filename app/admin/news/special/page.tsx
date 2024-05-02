import NewsListView from "#/sections/admin/news/view/news-list-view";
import SpecialNewsListView from "#/sections/admin/special-news/view/special-news-list-view";

// ----------------------------------------------------------------------


export const metadata = {
  title: 'Dashboard: News',
};

export default function NewsPage() {
  return <SpecialNewsListView />;
}
