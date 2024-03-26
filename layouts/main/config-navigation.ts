import { paths } from "#/routes/paths";

// ----------------------------------------------------------------------
export const pageLinks = [
  {
    order: '1',
    subheader: 'Từ khóa tìm kiếm',
    cover: '/assets/images/menu/menu_marketing.jpg',
    items: [
      { title: 'Trang chủ', path: paths.home },
      { title: 'Livestream', path: paths.home },
      { title: 'Highlight', path: paths.home },
      { title: 'BXH', path: paths.home },
      { title: 'Kết quả', path: paths.home },
      { title: 'Lịch thi đấu', path: paths.home },
      { title: 'Tin tức', path: paths.home },
    ],
  },
];



export const navConfig = [
  { title: 'LIVESTREAM', path: paths.home },
  { title: 'HIGHTLIGHT', path: paths.home },
  {
    title: 'BXH',
    path: paths.home,
  },
  { title: 'KẾT QUẢ', path: paths.home },
  { title: 'LỊCH THI ĐẤU', path: paths.home },
  { title: 'TIN TỨC', path: paths.home },
];
