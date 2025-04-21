import { Theme } from '@mui/material/styles';
import Fab from './fab';
import Chip from './chip';
import Alert from './alert';
import Radio from './radio';
import Badge from './badge';
import Rating from './rating';
import Switch from './switch';
import Backdrop from './backdrop';
import DataGrid from './dataGrid';
import Breadcrumbs from './breadcrumbs';
import Autocomplete from './autocomplete';
import { Menu, MenuItem } from './menu';
import { Avatar, AvatarGroup } from './avatar';
import { ListItemIcon, ListItemText } from './list';
import { Tab, TabList, TabPanel, Tabs } from './tabs';
import { FilledInput, Input, InputLabel, OutlinedInput } from './input';
import { Pagination, PaginationItem, TablePagination } from './pagination';
import { Accordion, AccordionDetails, AccordionSummery } from './accordion';
import { Dialog, DialogActions, DialogContent, DialogTitle } from './dialog';
import { Button, ButtonBase, ButtonGroup, IconButton, LoadingButton } from './button';
import { DatePicker, TimePicker, DateTimePicker, MobileDatePicker, StaticDatePicker, DesktopDatePicker, DesktopTimePicker, DesktopDateTimePicker } from './pickers';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
// import { isDark } from '../../utils/constants';

const componentsOverride = (theme: Theme) => {
  const { primary } = theme.palette;
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          scrollBehavior: 'smooth',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        a: {
          color: primary.main,
          textDecoration: 'none',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        '#root': {
          width: '100%',
          height: '100%',
          '& .apexcharts-xaxistooltip': {
            display: 'none',
          },
          '& .apexcharts-tooltip': {
            border: 'none',
            borderRadius: 8,
            boxShadow: theme.shadows[2],
          },
        },
        '#nprogress .bar': {
          zIndex: '9999 !important',
          backgroundColor: primary.main,
        },
        '#nprogress .peg': {
          boxShadow: 'none',
        },
      },
    },
    MuiRadio: Radio(),
    MuiFab: Fab(theme),
    MuiChip: Chip(theme),
    MuiAlert: Alert(theme),
    MuiBadge: Badge(theme),
    MuiSwitch: Switch(theme),
    MuiRating: Rating(theme),
    MuiDataGrid: DataGrid(theme),
    MuiBackdrop: Backdrop(theme),
    MuiBreadcrumbs: Breadcrumbs(theme),
    MuiAutocomplete: Autocomplete(theme),
    MuiAvatar: Avatar(theme),
    MuiAvatarGroup: AvatarGroup(theme),
    MuiButton: Button(theme),
    MuiIconButton: IconButton(theme),
    MuiButtonBase: ButtonBase(theme),
    MuiButtonGroup: ButtonGroup(theme),
    MuiLoadingButton: LoadingButton(theme),
    MuiAccordion: Accordion(theme),
    MuiAccordionSummary: AccordionSummery(theme),
    MuiAccordionDetails: AccordionDetails(theme),
    MuiPagination: Pagination(),
    MuiPaginationItem: PaginationItem(theme),
    MuiTablePagination: TablePagination(theme),
    MuiDialog: Dialog(),
    MuiDialogTitle: DialogTitle(),
    MuiDialogContent: DialogContent(),
    MuiDialogActions: DialogActions(),
    MuiMenu: Menu(),
    MuiMenuItem: MenuItem(),
    MuiListItemText: ListItemText(),
    MuiListItemIcon: ListItemIcon(theme),
    MuiTab: Tab(theme),
    MuiTabs: Tabs(theme),
    MuiTabList: TabList(),
    MuiTabPanel: TabPanel(),
    MuiDatePicker: DatePicker(),
    MuiMobileDatePicker: MobileDatePicker(),
    MuiStaticDatePicker: StaticDatePicker(),
    MuiDesktopDatePicker: DesktopDatePicker(),
    MuiTimePicker: TimePicker(),
    MuiDateTimePicker: DateTimePicker(),
    MuiDesktopTimePicker: DesktopTimePicker(),
    MuiDesktopDateTimePicker: DesktopDateTimePicker(),
    MuiInput: Input(theme),
    MuiInputLabel: InputLabel(theme),
    MuiFilledInput: FilledInput(theme),
    MuiOutlinedInput: OutlinedInput(theme),
  };
};

export default componentsOverride;