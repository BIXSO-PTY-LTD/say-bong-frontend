import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useResponsive } from '#/hooks/use-responsive';
import { pageLinks } from './config-navigation';
import { _socials } from '#/_mock';
import Iconify from '#/components/iconify';
import { usePathname } from 'next/navigation';
import { NavSubListProps } from './nav/types';
import { RouterLink } from '#/routes/components';
import { useBoolean } from '#/hooks/use-boolean';



// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');


  const renderList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>

              <Stack spacing={1} >
                <Typography variant="h6">Giới thiệu</Typography>
                <Typography variant="body2">Đồng hành cùng Xoilac TV kênh phát sóng trực tiếp bóng đá hôm nay với đường truyền full HD tốc độ cao và bình luận hấp dẫn. Cập nhật link xem bóng đá trực tuyến Xoilaczl.tv phát sóng tất cả các giải đấu đang được quan tâm hiện nay. Ngoài tên gọi Xôi Lạc TV, bạn có thể biết đến chúng tôi là Xoivo TV tructiepbongda cập nhật lịch thi đấu đầy đủ, tin bóng đá mới, video highlight, bảng xếp hạng, kết quả, kiến thức bóng đá... tất cả thông tin về môn thể thao vua sẽ được tổng hợp từ Xoilac. Truy cập website để có những giây phút Ăn Xôi Lạc Xem Bóng Đá trực tuyến.</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h6">Liên hệ nhanh</Typography>
              <Stack direction="column">
                <Typography variant="body2">Địa chỉ: 231 Đỗ Quang, Vĩnh Trung, Thanh Khê, Đà Nẵng 550000.</Typography>
                <Typography variant="body2">Điều hành hoạt động : Võ Hà Chiến</Typography>
                <Typography variant="body2">Email: xoilactvznet@gmail.com</Typography>

              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>

            {mdUp ? (
              <Stack >
                {renderList.map((list: any) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Stack>
            ) : (
              <Stack spacing={1.5}>
                {renderList.map((list: any) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>



    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} >
      <Typography variant="h6">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function ListMobile({ list }: { list: NavSubListProps }) {
  const pathname = usePathname();
  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="body2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

// ----------------------------------------------------------------------
