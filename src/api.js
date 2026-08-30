export const buildApiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const localBaseUrl = process.env.REACT_APP_LOCAL_BASE_URL?.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(host);

    if (isLocalhost && localBaseUrl) {
      return `${localBaseUrl}${normalizedPath}`;
    }
  }

  if (process.env.NODE_ENV === 'development' && localBaseUrl) {
    return `${localBaseUrl}${normalizedPath}`;
  }

  return normalizedPath;
};
