import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const MenuSelector = ({ value, handleChange, type, colors }) => {
  return (
    <>
      {type === 'data' ? (
        <FormControl size="small" variant="filled" color="info">
          <InputLabel id="demo-simple-select-label">
            Select Line Data
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Recent Transactions"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={'profit'}>Profit History</MenuItem>
            <MenuItem value={'revenue'}>Revenue History</MenuItem>
            <MenuItem value={'quantity'}>Quantity Sold History</MenuItem>
            <MenuItem value={'losses'}>Losses History</MenuItem>
            <MenuItem value={'default'}>Default</MenuItem>
          </Select>
        </FormControl>
      ) : type === 'color' ? (
        <FormControl size="small" variant="filled" color="info">
          <InputLabel id="demo-simple-select-label">
            Select Line Data Color
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Recent Transactions"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={'#FFFFFF'}>#FFFFFF (WHITE)</MenuItem>
            <MenuItem value={'#E5FCC2'}>#E5FCC2 (very-bright)</MenuItem>
            <MenuItem value={'#C6E5D9'}>#C6E5D9 (very-bright)</MenuItem>
            <MenuItem value={'#F4EAD5'}>#F4EAD5 (very-bright)</MenuItem>
            <MenuItem value={'#D5DED9'}>#D5DED9 (very-bright)</MenuItem>
            <MenuItem value={'#EFFFCD'}>#EFFFCD (very-bright)</MenuItem>
            <MenuItem value={'#C6A49A'}>#C6A49A (bright)</MenuItem>
            <MenuItem value={'#D9CEB2'}>#D9CEB2 (bright)</MenuItem>
            <MenuItem value={'#CBE86B'}>#CBE86B (bright)</MenuItem>
            <MenuItem value={'#F2E9E1'}>#F2E9E1 (bright)</MenuItem>
            <MenuItem value={'#CBE86B'}>#CBE86B (bright)</MenuItem>
            <MenuItem value={'#000000'}>#000000 (BLACK)</MenuItem>
            <MenuItem value={'#00A0B0'}>#00A0B0 (very-dark)</MenuItem>
            <MenuItem value={'#6A4A3C'}>#6A4A3C (very-dark)</MenuItem>
            <MenuItem value={'#CC333F'}>#CC333F (very-dark)</MenuItem>
            <MenuItem value={'#EB6841'}>#EB6841 (very-dark)</MenuItem>
            <MenuItem value={'#E94E77'}>#E94E77 (very-dark)</MenuItem>
            <MenuItem value={'#7A6A53'}>#7A6A53 (very-dark)</MenuItem>
            <MenuItem value={'#1C140D'}>#1C140D (very-dark)</MenuItem>
            <MenuItem value={'#9DE0AD'}>#9DE0AD (dark)</MenuItem>
            <MenuItem value={'#EDC951'}>#EDC951 (dark)</MenuItem>
            <MenuItem value={'#D68189'}>#D68189 (dark)</MenuItem>
            <MenuItem value={'#948C75'}>#948C75 (dark)</MenuItem>
            <MenuItem value={'#99B2B7'}>#99B2B7 (dark)</MenuItem>
          </Select>
        </FormControl>
      ) : type === 'fonts' ? (
        <FormControl fullWidth>
          <InputLabel
            id="fontSelector"
            sx={{ color: `${colors.primary[100]}`, fontSize: '1rem' }}
          >
            FONT
          </InputLabel>
          <Select
            labelId="fontSelector"
            id="fontFamilySelector"
            value={value}
            label="Age"
            onChange={(e) => handleChange(e)}
            sx={{
              background: `${colors.greenAccent[600]}`,
              boxShadow:
                'rgba(80, 148, 126, 0.17) 0px -23px 25px 0px inset, rgba(80, 148, 126, 0.15) 0px -36px 30px 0px inset, rgba(80, 148, 126, 0.1) 0px -79px 40px 0px inset, rgba(80, 148, 126, 0.06) 0px 2px 1px, rgba(80, 148, 126, 0.09) 0px 4px 2px, rgba(80, 148, 126, 0.09) 0px 8px 4px, rgba(80, 148, 126, 0.09) 0px 16px 8px, rgba(80, 148, 126, 0.09) 0px 32px 16px',
            }}
          >
            <MenuItem
              value={'Arial'}
              sx={{ backgroundColor: `${colors.blueAccent[800]}` }}
            >
              Arial
            </MenuItem>
            <MenuItem value={'Brush Script MT'}>Brush Script MT</MenuItem>
            <MenuItem value={'Courier New'}>Courier New</MenuItem>
            <MenuItem value={'Cursive'}>Cursive</MenuItem>
            <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
            <MenuItem value={'Garamond'}>Garamond</MenuItem>
            <MenuItem value={'Georgia'}>Georgia</MenuItem>
            <MenuItem value={'initial'}>Initial</MenuItem>
            <MenuItem value={'monospace'}>Monospace</MenuItem>
            <MenuItem value={'system-ui'}>System-UI</MenuItem>
            <MenuItem value={'Tahoma'}>Tahoma</MenuItem>
            <MenuItem value={'Times New Roman'}>Times New Roman</MenuItem>
            <MenuItem value={'Trebuchet MS'}>Trebuchet MS</MenuItem>
            <MenuItem value={'Verdana'}>Verdana</MenuItem>
          </Select>
        </FormControl>
      ) : (
        ''
      )}
    </>
  );
};

export default MenuSelector;
