const SwitchStyles = (theme: any) => ({
  styleOverrides: {
    track: {
      borderRadius: 16,
      backgroundColor: theme.palette.grey[500]
    },
    switchBase: getSwitchSize,
    root: getSwitchSize,
    thumb: getSwitchSize
  }
});

const getSwitchSize = ({ size }: { size: string }) => ({
  padding: size === 'small' ? '6px !important' : 11,
  width: size === 'small' ? '12px !important' : 16,
  height: size === 'small' ? '12px !important' : 16
});

export default SwitchStyles;