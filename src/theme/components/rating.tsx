// CUSTOM ICON COMPONENTS
import Star from '../../icons/Star';
import StarOutlined from '../../icons/StarOutlined'; // ==============================================================

// ==============================================================
const RatingStyles = (theme: any) => ({
  styleOverrides: {
    root: {
      color: theme.palette.warning.main
    },
    iconEmpty: {
      color: theme.palette.grey[300]
    }
  },
  defaultProps: {
    icon: <Star fontSize="inherit" />,
    emptyIcon: <StarOutlined fontSize="inherit" />
  }
});

export default RatingStyles;