import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from '../theme';
import { mockBarData1 as data } from '../data/mockData';
import { getRecentTransactionsBarChartData } from '../services/statService';
import { useEffect, useState } from 'react';

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [currentData, setCurrentData] = useState();
  const [currentDataKeys, setCurrentDataKeys] = useState();
  const [timeLineArray, setTimeLineArray] = useState();
  const [transaction, setTransaction] = useState(0);

  const getTransactionsBarChartData = async () => {
    const data = await getRecentTransactionsBarChartData();

    if (data) {
      const { barDataArray, keyArray, timeLineArray } = data;
      setCurrentData(barDataArray);
      setCurrentDataKeys(keyArray);
      setTimeLineArray(timeLineArray);
    }
  };

  useEffect(() => {
    getTransactionsBarChartData();
  }, []);

  const handleChange = (e) => {
    setTransaction(e.target.value);
  };

  return (
    <>
      <FormControl fullWidth variant="filled" color="info">
        <InputLabel id="demo-simple-select-label">
          Recent Transactions
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={transaction}
          label="Recent Transactions"
          onChange={(e) => handleChange(e)}
        >
          {timeLineArray && timeLineArray.length > 0 ? (
            timeLineArray.map((item, i) => {
              return (
                <MenuItem value={i} key={item}>
                  {item}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={0}>Default</MenuItem>
          )}
        </Select>
      </FormControl>
      <ResponsiveBar
        data={
          currentData && currentData.length > 0
            ? currentData[transaction]
            : data
        }
        theme={{
          // override default chart theme
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        keys={
          currentDataKeys && currentDataKeys.length > 0
            ? currentDataKeys[transaction]
            : ['quantity']
        }
        indexBy={
          currentData && currentData.length > 0 ? 'description' : 'country'
        }
        margin={{ top: 50, right: 130, bottom: 120, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '1.6']],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: isDashboard ? 'Transacted Item' : 'Transacted Item', // changed
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? 'Quantity Sold' : 'Quantity Sold', // changed
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return (
            e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
          );
        }}
      />
    </>
  );
};

export default BarChart;
