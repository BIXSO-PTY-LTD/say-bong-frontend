import sum from 'lodash/sum';
import { useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { fCurrency } from '#/utils/format-number';


import Iconify from '#/components/iconify';
import { RHFTextField } from '#/components/hook-form';


// ----------------------------------------------------------------------

export default function LivestreamNewEditBroadCaster() {
  const { control, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'broadcaster',
  });


  const handleAdd = () => {
    append({
      name: '',
      link: '',
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };
  return (
    <Box >
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Người phát sóng trực tiếp:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                inputColor='#fff'
                size="small"
                name={`broadcaster[${index}].name`}
                label="Tên người phát sóng"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                inputColor='#fff'
                size="small"
                name={`broadcaster[${index}].link`}
                label="Link"
                InputLabelProps={{ shrink: true }}
              />

            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />


      <Button
        size="small"
        color="primary"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={handleAdd}
        sx={{ flexShrink: 0 }}
      >
        Thêm người phát sóng
      </Button>



    </Box>
  );
}
