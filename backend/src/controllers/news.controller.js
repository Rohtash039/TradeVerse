import * as newsService from '../services/news.service.js';
import { success } from '../utils/apiResponse.js';

export async function getNews(req, res, next) {
  try {
    const { category } = req.query;
    const news = await newsService.getNews(category);
    return success(res, news);
  } catch (err) {
    next(err);
  }
}
