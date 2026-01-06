export const calculatePnL = (quantity, buyPrice, currentPrice) => {
    const invested = quantity * buyPrice;
    const currentValue = quantity * currentPrice;
  
    return {
      invested,
      currentValue,
      pnl: currentValue - invested,
      pnlPercent:
        invested === 0 ? 0 : ((currentValue - invested) / invested) * 100,
    };
  };
  
  export const calculateAllocation = (holdings) => {
    const totalValue = holdings.reduce((sum, h) => sum + h.current_value, 0);
  
    return holdings.map((h) => ({
      ...h,
      allocation_percent:
        totalValue === 0 ? 0 : (h.current_value / totalValue) * 100,
    }));
  };
  