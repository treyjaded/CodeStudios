const basicFetchOptions = {
  method: 'GET',
  credentials: 'include',
};

export const deleteOptions = {
  method: 'DELETE',
  credentials: 'include',
};

export const getPostOptions = (body) => ({
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: 'PATCH',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/* Always returns a two-value array where the first value is data (if present) and the second value
is an error (if present) */
export const fetchHandler = async (url, options = basicFetchOptions) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return [null, { status: res.status, statusText: res.statusText }];
    if (res.status === 204) return [true, null]; // delete responses

    const data = await res.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
