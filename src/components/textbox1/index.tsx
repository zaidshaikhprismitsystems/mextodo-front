import TextField from '@mui/material/TextField';

interface InputBoxType{
  type: string;
  placeholder?: string;
  name: string;
  handleBlur: any
  handleChange: any
  value: string;
  slotProps?: any | undefined;
  helperText: string;
  error: boolean | undefined;
  fullWidth: boolean;
  rows?: number;
  multiline?: boolean;
  labelId?: string;
  InputProps?: any;
  InputLabelProps?: any;
  children?: any;
  disabled?: any;
}

export const TextBox = (props: InputBoxType) => {

  const {
    type="text",
    placeholder,
    name,
    handleBlur,
    handleChange,
    value,
    slotProps,
    helperText,
    error,
    fullWidth,
    children,
    rows,
    multiline,
    InputProps,
    InputLabelProps,
    disabled
  } = props;

  return <TextField
          fullWidth={fullWidth}
          type={type}
          // placeholder={placeholder}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          helperText={helperText}
          error={error}
          rows={rows}
          label={placeholder}
          disabled={disabled}
          variant='standard'
          multiline={multiline}
          slotProps={slotProps}
          InputProps={InputProps}
          InputLabelProps={InputLabelProps}
          // sx={{
          //   border: "0",
          //   p: 0,
          //   "& .MuiInputBase-input, .MuiInputBase-multiline": {
          //     p: "8px 0px",
          //     border: "0",
          //     outline: 0,
          //     color: "primary.main",
          //     fontWeight: 300,
          //   },
          //   "& .MuiOutlinedInput-root": {
          //     "& fieldset": {
          //       outline: 0,
          //       borderLeft: "0 !important",
          //       borderRight: "0 !important",
          //       borderTop: "0 !important",
          //       borderBottom: "2px solid primary.main",
          //       borderRadius: 0,
          //     },
          //     "&:hover fieldset": {
          //       borderColor: "primary.main",
          //     },
          //     "&.Mui-focused fieldset": {
          //       borderColor: "primary.main",
          //     },
          //   },
          //   "& .Mui-error": {
          //     mx: 0,
          //   },
          // }}
        >{children}</TextField>
};