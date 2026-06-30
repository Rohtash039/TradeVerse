import * as marketService from '../services/market.service.js';
import { SYMBOL_TO_COINGECKO, SUPPORTED_COINS } from '../utils/constants.js';
import { success } from '../utils/apiResponse.js';
import AppError from '../utils/AppError.js';

export async function getQuotes(req, res, next) {
  try {
    const { symbols } = req.query;
    let coinIds = SUPPORTED_COINS;

    if (symbols) {
      coinIds = symbols.split(',').map(s => {
        const sym = s.trim().toUpperCase();
        return SYMBOL_TO_COINGECKO[sym] || s.trim().toLowerCase();
      });
    }

    const quotes = await marketService.getMarketQuotes(coinIds);
    return success(res, { quotes });
  } catch (err) {
    next(err);
  }
}

export async function getQuote(req, res, next) {
  try {
    const { symbol } = req.params;
    const sym = symbol.toUpperCase();
    const coinId = SYMBOL_TO_COINGECKO[sym] || symbol.toLowerCase();

    const quote = await marketService.getSingleQuote(coinId);
    if (!quote) throw AppError.notFound(`Market quote not found for symbol: ${symbol}`);

    return success(res, { quote });
  } catch (err) {
    next(err);
  }
}

export async function getTrending(req, res, next) {
  try {
    const trending = await marketService.getTrending();
    return success(res, trending);
  } catch (err) {
    next(err);
  }
}

export async function getGlobal(req, res, next) {
  try {
    const globalData = await marketService.getGlobalData();
    return success(res, { global: globalData });
  } catch (err) {
    next(err);
  }
}
