export const convertTxnsToLineDataHelperFxn = (txns) => {
  let profitDataArray = [];
  let revenueDataArray = [];
  let quantityDataArray = [];
  let lossesDataArray = [];

  let profitDataObject = { id: 'profit', color: 'red', data: [] };
  let revenueDataObject = { id: 'revenue', color: 'orange', data: [] };
  let quantityDataObject = { id: 'quantity', color: 'yellow', data: [] };
  let lossesDataObject = { id: 'losses', color: 'green', data: [] };
  for (let i = 0; i < txns.length; i++) {
    let profitDataArrayObject = { x: txns[i].transactionTimeline, y: 0 };
    let revenueDataArrayObject = {
      x: txns[i].transactionTimeline,
      y: txns[i].transactionTotal,
    };
    let quantityDataArrayObject = { x: txns[i].transactionTimeline, y: 0 };
    let lossesDataArrayObject = {
      x: txns[i].transactionTimeline,
      y: txns[i].transactionLosses,
    };
    let profit = 0;
    //   let revenue = 0;
    let qtySold = 0;
    for (let j = 0; j < txns[i].transactedItems.length; j++) {
      let item = txns[i].transactedItems[j];
      let itemProfit = (item.salePrice - item.costBasis) * item.qtySold;
      // let itemRevenue = item.saleTotal;
      let itemQtySold = item.qtySold;

      profit += itemProfit;
      // revenue += itemRevenue;
      qtySold += itemQtySold;
    }
    // profit pushing
    profitDataArrayObject.y = profit;
    profitDataObject.data.push(profitDataArrayObject);

    // revenue pushing
    //   revenueDataArrayObject.y = revenue;
    revenueDataObject.data.push(revenueDataArrayObject);

    // qtySold pushing
    quantityDataArrayObject.y = qtySold;
    quantityDataObject.data.push(quantityDataArrayObject);

    // losses pushing
    lossesDataObject.data.push(lossesDataArrayObject);
  }
  profitDataArray.push(profitDataObject);
  revenueDataArray.push(revenueDataObject);
  quantityDataArray.push(quantityDataObject);
  lossesDataArray.push(lossesDataObject);

  return {
    profitDataArray,
    revenueDataArray,
    quantityDataArray,
    lossesDataArray,
  };
};
