import "./MarketCategory.css";

export default function MarketCategory({ activeCategory, onCategoryChange }) {
  const categories = [
    "All Assets",
    "Crypto",
    "Stocks",
    "Forex",
    "Commodities",
  ];

  return (
    <div className="category-main">
      <div className="category-btn">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`platform-button ${activeCategory === cat ? "platform-button-primary platform-button-active active" : "platform-button-secondary"}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}