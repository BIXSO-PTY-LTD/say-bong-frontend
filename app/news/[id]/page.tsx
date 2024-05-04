


import NewsDetailsView from "#/sections/news/view/news-details-view";
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



  return <NewsDetailsView id={id} />;
}
