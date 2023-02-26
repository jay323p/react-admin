import { ResponsiveLine } from '@nivo/line';
import { mockLineData as mockData } from '../data/mockData';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';
import { useSelector } from 'react-redux';
import { selectTransactions } from '../redux/features/transactions/transactionsSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MenuSelector from './menuSelector/MenuSelector';
import { convertTxnsToLineDataHelperFxn } from '../utils/convertTxnsToLineDataHelperFxn';

const LineChart = ({
  isDashboard = false,
  data,
  xAxisLabel,
  yAxisLabel,
  xAxisRotation,
  basic,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const teamTransactions = useSelector(selectTransactions);
  const [profitData, setProfitData] = useState();
  const [revenueData, setRevenueData] = useState();
  const [quantityData, setQuantityData] = useState();
  const [lossesData, setLossesData] = useState();
  const [lineData, setLineData] = useState(data);
  const [selectValue, setSelectValue] = useState('default');
  const [colorValue, setColorValue] = useState('#9DE0AD');
  const [yAxis, setYAxis] = useState('Y-Axis');
  const [lineChartTitle, setLineChartTitle] = useState('Default Line Chart');
  const [style, setStyle] = useState(basic ? 'basic' : 'complex');

  const convertTxnsToLineData = (txns) => {
    const returnedData = convertTxnsToLineDataHelperFxn(txns);
    setProfitData(returnedData.profitDataArray);
    setRevenueData(returnedData.revenueDataArray);
    setQuantityData(returnedData.quantityDataArray);
    setLossesData(returnedData.lossesDataArray);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
    if (e.target.value === 'profit') {
      if (profitData) {
        setLineData(profitData);
        setYAxis('Profit ($)');
        setLineChartTitle('Profit History');
      } else {
        toast.error('Sorry, no profit data found!');
      }
    }
    if (e.target.value === 'revenue') {
      if (revenueData) {
        setLineData(revenueData);
        setYAxis('Revenue ($)');
        setLineChartTitle('Revenue History');
      } else {
        toast.error('Sorry, no revenue data found!');
      }
    }
    if (e.target.value === 'quantity') {
      if (quantityData) {
        setLineData(quantityData);
        setYAxis('Quantity (units)');
        setLineChartTitle('Quantity Sold History');
      } else {
        toast.error('Sorry, no quantity data found!');
      }
    }
    if (e.target.value === 'losses') {
      if (lossesData) {
        setLineData(lossesData);
        setYAxis('Losses ($)');
        setLineChartTitle('Losses History');
      } else {
        toast.error('Sorry, no losses data found!');
      }
    }
    if (e.target.value === 'default') {
      setLineData(mockData);
    }
  };

  const handleSelectColorChange = (e) => {
    setColorValue(e.target.value);
  };

  useEffect(() => {
    if (teamTransactions && teamTransactions.length > 0) {
      convertTxnsToLineData(teamTransactions);
    }
    if (data) {
      setLineData(data);
    }
    console.count('lineChart');
  }, [teamTransactions, data]);

  return (
    <>
      <Box display="flex" justifyContent="center">
        {style !== 'basic' && (
          <MenuSelector
            type="data"
            value={selectValue}
            handleChange={handleSelectChange}
          />
        )}
        <MenuSelector
          type="color"
          value={colorValue}
          handleChange={handleSelectColorChange}
        />
      </Box>
      {style !== 'basic' && (
        <h2
          style={{
            textAlign: 'center',
            color: colors.greenAccent[500],
            marginTop: '10px',
          }}
        >
          {lineChartTitle}
        </h2>
      )}
      <ResponsiveLine
        data={lineData ? lineData : data ? data : mockData}
        //   Theme Override
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.greenAccent[100],
              },
            },
            legend: {
              text: {
                fill: colors.greenAccent[300],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.blueAccent[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        // colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }} // added
        colors={colorValue}
        margin={{
          top: 50,
          right: 110,
          bottom: style === 'basic' ? 60 : 120,
          left: 60,
        }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 15,
          tickRotation: -45,
          legend: isDashboard ? xAxisLabel : 'Timeline', // added
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? yAxisLabel : yAxis, // added
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enableArea={style === 'basic' ? false : true}
        areaOpacity={0.6}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableGridX={true}
        enableGridY={style === 'basic' ? false : true}
        enablePointLabel={true}
        pointLabel="yFormatted"
        pointSize={10}
        pointColor={colors.primary[100]}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        isInteractive={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default LineChart;
