const SERVER_URI =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

export default SERVER_URI;
