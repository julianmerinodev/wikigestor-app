function apiResponse({ success, message, statusCode, data }) {
  return {
    success,
    message,
    status_code: statusCode,
    data: data || null
  };
}

module.exports = apiResponse;
