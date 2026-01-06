export const calculatePnL = ({
    invested,
    currentValue,
    realizedPnL,
  }) => {
    const unrealizedPnL = currentValue - invested;
  
    const totalPnL = realizedPnL + unrealizedPnL;
  
    const pnlPercent =
      invested === 0 ? 0 : (totalPnL / invested) * 100;
  
    return {
      invested,
      current_value: currentValue,
      realized_pnl: realizedPnL,
      unrealized_pnl: unrealizedPnL,
      total_pnl: totalPnL,
      pnl_percent: pnlPercent,
    };
  };
  