const getFabColor = ({ color }: { color: string }) => ({
  ...((color === 'success' || color === 'warning') && {
    color: 'white'
  })
});

const getFabVariant = ({ variant }: { variant: string }) => ({
  ...(variant === 'extended' && {
    paddingInline: '1rem'
  })
});

const Fab = () => {
  return {
    styleOverrides: {
      extended: ({
        ownerState: {
          color
        }
      }) => ({
        gap: 4,
        lineHeight: 1,
        textTransform: 'none',
        ...getFabColor({ color })
      }),
      circular: ({
        ownerState: {
          color
        }
      }) => ({
        lineHeight: 1,
        ...getFabColor({ color })
      }),
      sizeSmall: ({
        ownerState: {
          variant
        }
      }) => ({
        fontSize: 14,
        svg: {
          fontSize: 20
        },
        ...getFabVariant({ variant })
      })
    }
  };
};

export default Fab;