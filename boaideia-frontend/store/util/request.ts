export const baseUrl = 'http://localhost/api'

const mountUrl = (endpoint: string) => {
  const endWidthBar = baseUrl.endsWith("/");
  const startWithBar = endpoint.startsWith("/")

  if (endWidthBar && startWithBar) {
    return `${baseUrl}${endpoint.slice(1)}`;
  }

  else if (!endWidthBar && !startWithBar) {
    return `${baseUrl}/${endpoint}`;
  }
  return `${baseUrl}${endpoint}`;
}


const request = {
  async get<T>(endpoint: string) {
    const finalUrl = mountUrl(endpoint);

    const contentReceived: T = await fetch(finalUrl).then(r => r.json());
    return contentReceived
  },

  async post<T>(endpoint: string, payload: any) {
    const finalUrl = mountUrl(endpoint);

    const contentSend = JSON.stringify(payload);
    const req = new Request(finalUrl, {
      body: contentSend,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const contentReceived: T = await fetch(finalUrl).then(r => r.json());
    return contentReceived;
  }
}

export default request;