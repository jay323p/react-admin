import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';
import { colorArray } from '../../data/colorDataArray';
import { selectHighDemandItems } from '../../redux/features/stats/statSlice';
import { tokens } from '../../theme';

const Pie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const highDemandItems = useSelector(selectHighDemandItems);
  const [pieData, setPieData] = useState();

  const turnHighDemandItemsIntoPieData = (data) => {
    let pieDataArray = [];

    for (let i = 0; i < data.length; i++) {
      let pieDataObject = {
        id: '',
        label: '',
        value: 0,
        color: '',
      };

      pieDataObject.id = data[i].description;
      pieDataObject.label = data[i].description;
      pieDataObject.value = data[i].qtySold;
      pieDataObject.color = colorArray[i];

      pieDataArray.push(pieDataObject);
    }

    return pieDataArray;
  };

  useEffect(() => {
    if (highDemandItems && highDemandItems.length > 0) {
      const data = turnHighDemandItemsIntoPieData(highDemandItems);

      if (data && data.length > 0) {
        setPieData(data);
      }
    }
  }, [highDemandItems]);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Viewing High Demand Items" />
      <Box height="75vh">
        <PieChart pieData={pieData && pieData.length && pieData} />
      </Box>
    </Box>
  );
};

export default Pie;
