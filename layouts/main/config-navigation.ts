import { paths } from "#/routes/paths";

// ----------------------------------------------------------------------
export const pageLinks = [
  {
    order: '1',
    subheader: 'Từ khóa tìm kiếm',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'Trang chủ', path: paths.home },
      { title: 'Livestream', path: paths.livestream.root },
      { title: 'Highlight', path: paths.highlight.root },
      { title: 'BXH', path: paths.bxh.root },
      { title: 'Kết quả', path: paths.result.root },
      { title: 'Lịch thi đấu', path: paths.schedule.root },
      { title: 'Tin tức', path: paths.news.root },
    ],
  },
];



export const navConfig = [
  { title: 'LIVESTREAM', path: paths.livestream.root },
  { title: 'HIGHTLIGHT', path: paths.highlight.root },
  {
    title: 'BXH',
    path: paths.bxh.root,
  },
  { title: 'KẾT QUẢ', path: paths.result.root },
  { title: 'LỊCH THI ĐẤU', path: paths.schedule.root },
  { title: 'TIN TỨC', path: paths.news.root },
];
