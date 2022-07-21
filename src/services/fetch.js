function updateOptions(options) {
  const update = { ...options };
  const TOKEN = localStorage['__bloggrs__::select_blog_id'];
  const BLOG_ID = localStorage.getItem('bloggrs:token');

  console.log({ update });
  update.headers = {
    'content-type': update.headers['content-type'] || 'application/json',
    Authorization: 'Bearer ' + TOKEN,
    'x-bloggrs-id': BLOG_ID,
    ...update.headers,
  };

  console.log(update);
  return update;
}

export default function fetch(url, options) {
  return window.fetch(url, updateOptions(options));
}
