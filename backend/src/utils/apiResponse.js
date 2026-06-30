export function success(res, data = {}, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, ...data });
}

export function created(res, data = {}, message = 'Created') {
  return success(res, data, message, 201);
}

export function error(res, message = 'Internal Server Error', statusCode = 500, code = 'INTERNAL_ERROR') {
  return res.status(statusCode).json({
    success: false,
    error: { code, message },
  });
}
