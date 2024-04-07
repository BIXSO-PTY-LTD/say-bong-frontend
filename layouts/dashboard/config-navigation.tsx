import { useMemo } from 'react';

import { paths } from '#/routes/paths';


import SvgColor from '#/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ color: "#fff", width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  blog: icon('ic_blog'),
  video: icon('ic_video'),
  key: icon('ic_key'),
  api: icon('ic_api'),
  user: icon('ic_user'),
};

// ----------------------------------------------------------------------

export function useNavData() {

  const data = useMemo(
    () => [
      {
        items: [
          {
            title: 'Khách hàng',
            path: paths.dashboard.user.root,
            icon: ICONS.user,
          },
          {
            title: 'Tin tức',
            path: paths.dashboard.news.root,
            icon: ICONS.blog,
          },
          {
            title: 'Video',
            path: paths.dashboard.video.exciting.root,
            icon: ICONS.video,
            children: [
              { title: 'Những pha bóng thú vị', path: paths.dashboard.video.exciting.root },
              {
                title: 'Highlight',
                path: paths.dashboard.video.highlight.root,
              },

            ],
          },
          {
            title: 'Đổi mật khẩu',
            path: paths.dashboard.password,
            icon: ICONS.key,
          },
        ]
      }

    ],

    []

  );

  return data;
}
