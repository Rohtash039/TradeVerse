import React from 'react';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ShoppingCart,
  Tag,
  HelpCircle
} from 'lucide-react';
import './TransactionHistory.css';

export default function TransactionHistory({ transactions = [] }) {
  const formatUSD = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const getTxDetails = (type) => {
    switch (type.toLowerCase()) {
      case 'buy':
        return {
          label: 'Buy',
          typeClass: 'txn-type--buy',
          icon: ShoppingCart,
        };
      case 'sell':
        return {
          label: 'Sell',
          typeClass: 'txn-type--sell',
          icon: Tag,
        };
      case 'deposit':
        return {
          label: 'Deposit',
          typeClass: 'txn-type--deposit',
          icon: ArrowDownToLine,
        };
      case 'withdraw':
        return {
          label: 'Withdraw',
          typeClass: 'txn-type--withdraw',
          icon: ArrowUpFromLine,
        };
      default:
        return {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          typeClass: 'txn-type--transfer',
          icon: HelpCircle,
        };
    }
  };

  const mappedTransactions = transactions.map((t, idx) => {
    const details = getTxDetails(t.type);
    const dateObj = new Date(t.createdAt || t.updatedAt);
    const dateStr = isNaN(dateObj.getTime())
      ? 'Recent'
      : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      id: t._id || idx,
      type: details.label,
      typeClass: details.typeClass,
      icon: details.icon,
      asset: t.asset ? t.asset.toUpperCase() : 'USD',
      amount: t.amount,
      value: formatUSD(t.value),
      date: dateStr,
      status: t.status ? t.status.charAt(0).toUpperCase() + t.status.slice(1) : 'Completed',
      statusClass: t.status === 'pending' ? 'txn-status--pending' : 'txn-status--completed',
    };
  });

  return (
    <div className="txn-history">
      <div className="txn-history__header">
        <h3 className="txn-history__title">Transaction History</h3>
        <span className="txn-history__count" style={{ color: "var(--text-secondary)", fontSize: "12px" }}>{transactions.length} records</span>
      </div>

      <div className="txn-history__list">
        {mappedTransactions.length === 0 ? (
          <div style={{ color: "var(--text-secondary)", padding: "24px", textAlign: "center" }}>
            No transaction records.
          </div>
        ) : (
          mappedTransactions.map((txn) => {
            const Icon = txn.icon;
            return (
              <div key={txn.id} className="txn-row">
                <div className="txn-row__left">
                  <div className={`txn-row__icon ${txn.typeClass}`}>
                    <Icon size={16} />
                  </div>
                  <div className="txn-row__info">
                    <span className="txn-row__type">{txn.type}</span>
                    <span className="txn-row__date">{txn.date}</span>
                  </div>
                </div>

                <div className="txn-row__center">
                  <span className="txn-row__asset">{txn.asset}</span>
                  <span className="txn-row__amount">{txn.amount}</span>
                </div>

                <div className="txn-row__right">
                  <span className="txn-row__value">{txn.value}</span>
                  <span className={`txn-row__status ${txn.statusClass}`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
