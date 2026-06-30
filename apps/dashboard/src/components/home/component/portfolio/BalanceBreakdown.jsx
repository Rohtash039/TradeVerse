import "./BalanceBreakdown.css"
import { Wallet, CircleDollarSign, Lock, TrendingUp } from "lucide-react";

export default function BalanceBreakdown({ portfolio }) {
  const totalValue = portfolio?.totalValue || 0;
  const balance = portfolio?.balance || 0;
  const lockedBalance = portfolio?.lockedBalance || 0;
  const unrealizedPnl = portfolio?.unrealizedPnl || 0;
  const dailyPnlPercent = portfolio?.dailyPnlPercent || 0;

  const formatUSD = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const balance_cards = [
    {
      id: 'equity',
      label: 'Total Equity',
      value: formatUSD(totalValue),
      subtext: `Portfolio + Cash`,
      icon: Wallet,
      accentClass: 'balance-card-neon',
    },
    {
      id: 'available',
      label: 'Available Balance',
      value: formatUSD(balance),
      subtext: 'Ready to trade',
      icon: CircleDollarSign,
      accentClass: 'balance-card-blue',
    },
    {
      id: 'locked',
      label: 'Locked / In Orders',
      value: formatUSD(lockedBalance),
      subtext: 'Pending transactions',
      icon: Lock,
      accentClass: 'balance-card-amber',
    },
    {
      id: 'pnl',
      label: 'Unrealized PNL',
      value: `${unrealizedPnl >= 0 ? '+' : ''}${formatUSD(unrealizedPnl)}`,
      subtext: `${dailyPnlPercent >= 0 ? '+' : ''}${dailyPnlPercent.toFixed(2)}% overall`,
      icon: TrendingUp,
      accentClass: unrealizedPnl >= 0 ? 'balance-card-success' : 'balance-card-danger',
      isPositive: unrealizedPnl >= 0,
    },
  ];

  return (
    <div className="balance-breakdown">
      {balance_cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className={`balance-card ${card.accentClass}`}>
            <div className="balance-card-accent-bar"/>
            <div className="balance-card-icon-wrap">
              <Icon size={20}/>
            </div>
            <span className="balance-card-label">{card.label}</span>
            <span className={`balance-card-value ${card.isPositive ? 'text-success': card.isPositive === false ? 'text-danger' : ''}`}>
              {card.value}
            </span>
            <span className="balance-card-subtext">{card.subtext}</span>
          </div>
        );
      })}
    </div>
  );
}