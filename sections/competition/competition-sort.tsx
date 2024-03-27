import CustomPopover, { usePopover } from '#/components/custom-popover';
import Iconify from '#/components/iconify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


// ----------------------------------------------------------------------

type Props = {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: {
    value: string;
    label: string;
  }[];
};

export default function CompetitionSort({ sort, sortOptions, onSort }: Props) {
  const popover = usePopover();

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ ml: 8 }}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize', background: (theme) => theme.palette.grey[800], p: 2, borderRadius: 1, }}
      >
        <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
          {sort}
        </Box>
      </Button>

      <CustomPopover
        open={popover.open} onClose={popover.onClose} sx={{ width: 250, background: (theme) => theme.palette.grey[800] }}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={sort === option.value}
            onClick={() => {
              popover.onClose();
              onSort(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
