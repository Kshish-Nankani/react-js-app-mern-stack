export const buildApiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(host);

    if (isLocalhost && process.env.REACT_APP_LOCAL_BASE_URL) {
      return `${process.env.REACT_APP_LOCAL_BASE_URL.replace(/\/$/, '')}${normalizedPath}`;
    }
  }

  if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_LOCAL_BASE_URL) {
    return `${process.env.REACT_APP_LOCAL_BASE_URL.replace(/\/$/, '')}${normalizedPath}`;
  }

  return normalizedPath;
};
