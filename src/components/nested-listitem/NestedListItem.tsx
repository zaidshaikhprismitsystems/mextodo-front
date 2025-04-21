import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

interface NestedListItemProps{
  open: boolean;
  list: any;
}

export default function NestedListItem({ open, list }: NestedListItemProps) {
  
  return (
    <Collapse in={open} timeout="auto" unmountOnExit sx={{width:200,}}>
      <List component="div" disablePadding sx={{mb:2, ml:1}}>
        {
          list && list.length > 0 ?
          list.map((item: any) => {
            return(
            <ListItemButton sx={{ backgroundColor: item.active ? "primary.100" : "" }} onClick={item.onClick}>
              {/* <ListItemIcon>
                <StarBorder />
              </ListItemIcon> */}
              <ListItemText primary={item.name} sx={{m:0, fontSize: 16, fontWeight: 400, color: item.active ? 'primary.main' : '#333333'}} />
            </ListItemButton>
            )
          })
          : ''
        }
      </List>
    </Collapse>
  )
}