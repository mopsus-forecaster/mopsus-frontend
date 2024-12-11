import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { mopsusIcons } from '../../../icons';
import { Icon } from '@iconify/react/dist/iconify.js';

export const ActionsVert = ({ options = [] }) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon icon={mopsusIcons.moreVert} />
      </IconButton>

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        slotProps={{
          paper: {
            sx: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 'fit-content',
              backgroundColor: '#1e1e1e',
              borderRadius: '12px',
              color: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.5)',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              option.function();
              handleClose();
            }}
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontSize: '14px',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#333333',
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
