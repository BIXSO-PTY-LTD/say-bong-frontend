import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material';

// ----------------------------------------------------------------------
const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'inputColor',
})<{ inputColor?: string }>(({ inputColor, theme }) => ({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Custom background color
    color: inputColor || 'black', // Custom text color for disabled state
  },
}));
type Props = TextFieldProps & {
  name: string;
  inputColor?: string;
};

export default function RHFTextField({ name, helperText, inputColor, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledTextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          inputProps={{ style: { color: inputColor || 'black' } }}
          {...other}
        />
      )}
    />
  );
}
