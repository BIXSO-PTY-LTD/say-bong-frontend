


import { _tours } from "#/_mock";
import { _travelPosts } from "#/_mock/_blog";
import { useGetNew } from "#/api/news";
import NewsDetailsView from "#/sections/news/news-details-view";
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function NewsDetailsPage({ params }: Props) {
  const { id } = params;

  const { new: currentPost } = useGetNew(id)


  return <NewsDetailsView currentPost={currentPost} />;
}
