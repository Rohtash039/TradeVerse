const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message = payload?.error?.message || payload?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.code = payload?.error?.code;
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const createSession = (idToken) => apiCall('/auth/session', {
  method: 'POST',
  body: JSON.stringify({ idToken }),
});
export const clearSession = () => apiCall('/auth/logout', { method: 'POST' });
export const syncUser = () => apiCall('/auth/sync', { method: 'POST' });
export const getCurrentUser = () => apiCall('/auth/me');
export const getPortfolio = () => apiCall('/portfolio');
export const getPortfolioPerformance = (range = '1m') => apiCall(`/portfolio/performance?range=${encodeURIComponent(range)}`);
export const getHoldings = () => apiCall('/portfolio/holdings');
export const getTransactions = (limit = 20) => apiCall(`/transactions?limit=${limit}`);
export const executeTrade = (data) => apiCall('/trades/execute', {
  method: 'POST',
  body: JSON.stringify(data),
});
export const getMarketData = (symbol) => apiCall(`/market/quote/${symbol}`);
export const getMarketQuotes = (symbols) => apiCall(symbols ? `/market/quotes?symbols=${symbols}` : '/market/quotes');
export const getWatchlist = () => apiCall('/watchlist');
export const addWatchlist = (symbol) => apiCall('/watchlist', {
  method: 'POST',
  body: JSON.stringify({ symbol }),
});
export const removeWatchlist = (symbol) => apiCall(`/watchlist/${symbol}`, {
  method: 'DELETE',
});
export const depositFunds = (amount) => apiCall('/users/deposit', {
  method: 'POST',
  body: JSON.stringify({ amount }),
});
export const withdrawFunds = (amount) => apiCall('/users/withdraw', {
  method: 'POST',
  body: JSON.stringify({ amount }),
});
export const getNewsData = (category) => apiCall(category ? `/news?category=${category}` : '/news');


