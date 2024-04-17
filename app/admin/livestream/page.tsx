import { LivestreamListView } from "#/sections/admin/livestream/view";
import NewsListView from "#/sections/admin/news/view/news-list-view";

// ----------------------------------------------------------------------


export const metadata = {
  title: 'Dashboard: Livestream',
};

export default function NewsPage() {
  return <LivestreamListView />;
}
