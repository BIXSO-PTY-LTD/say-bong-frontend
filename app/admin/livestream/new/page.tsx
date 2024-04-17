import { LivestreamCreateView } from "#/sections/admin/livestream/view";
import { NewsCreateView } from "#/sections/admin/news/view";

// ----------------------------------------------------------------------


export const metadata = {
  title: 'Dashboard: Thêm livestream',
};

export default function NewsCreatePage() {
  return <LivestreamCreateView />;
}
