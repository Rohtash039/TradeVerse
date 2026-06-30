import {
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { formatPrice, formatVolume, formatMarketCap } from './marketData';
import './MarketTable.css';

export default function MarketTable({ assets, totalCount, favorites, onToggleFavorite, onTrade }) {
  return (
    <div className="market-table-wrapper">
      <div className="market-table-scroll">
        <table className="market-table" id="markets-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th>Asset</th>
              <th className="th-right">Last Price</th>
              <th className="th-right">24h Change</th>
              <th className="th-right">24h Volume</th>
              <th className="th-right">Market Cap</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const isUp = asset.change24h >= 0;
              return (
                <tr key={asset.id}>
                  {/* Favorite */}
                  <td>
                    <button
                      className={`market-table__fav-btn ${
                        favorites.has(asset.id)
                          ? 'market-table__fav-btn--active'
                          : ''
                      }`}
                      onClick={() => onToggleFavorite(asset.id)}
                      aria-label={`Toggle favorite for ${asset.symbol}`}
                    >
                      <Star
                        size={14}
                        fill={
                          favorites.has(asset.id)
                            ? 'var(--accent-amber)'
                            : 'none'
                        }
                      />
                    </button>
                  </td>

                  {/* Asset */}
                  <td>
                    <div className="market-table__asset-cell">
                      <span className="market-table__asset-rank">
                        {asset.rank}
                      </span>
                      <span
                        className="market-table__asset-icon"
                        style={{ background: asset.color }}
                      >
                        {asset.symbol.slice(0, 2)}
                      </span>
                      <div className="market-table__asset-names">
                        <span className="market-table__asset-symbol">
                          {asset.symbol}
                        </span>
                        <span className="market-table__asset-name">
                          {asset.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="market-table__price" style={{ textAlign: 'right' }}>
                    {formatPrice(asset.price)}
                  </td>

                  {/* 24h Change */}
                  <td style={{ textAlign: 'right' }}>
                    <span
                      className={`market-table__change ${
                        isUp
                          ? 'market-table__change--up'
                          : 'market-table__change--down'
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {isUp ? '+' : ''}
                      {asset.change24h.toFixed(2)}%
                    </span>
                  </td>

                  {/* Volume */}
                  <td className="market-table__volume">
                    {formatVolume(asset.volume)}
                  </td>

                  {/* Market Cap */}
                  <td className="market-table__mcap">
                    {formatMarketCap(asset.marketCap)}
                  </td>

                  {/* Trade */}
                  <td>
                    <button
                      className="market-table__trade-btn"
                      onClick={() => onTrade(asset.id)}
                      id={`trade-${asset.id}`}
                    >
                      Trade
                      <ArrowUpRight size={12} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {assets.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: 'var(--text-muted)',
                  }}
                >
                  No assets found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="market-table__footer">
        <span className="market-table__info">
          Showing <span>{assets.length}</span> of{' '}
          <span>{totalCount}</span> assets
        </span>
        <div className="market-table__live-badge">
          <span className="market-table__live-dot" />
          Live
        </div>
      </div>
    </div>
  );
}
