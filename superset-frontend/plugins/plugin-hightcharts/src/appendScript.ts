export const appendScript = (scriptToAppend: string) => {
  const script = document.createElement('script');
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
};

export const loadScript = (url: string) =>
  new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.onload = function () {
      resolve(url);
    };
    script.onerror = function () {
      reject(url);
    };
    document.body.appendChild(script);
  });

export const loadAllScripts = (urls: string[]) =>
  Promise.all(urls.map(loadScript));
