export let config:any = {};

export function initConfig(callback:any) {
  initFile('config', (response) => {
    config = response;
    callback();
  });
}

export function initFile(file:string, callback:any) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
      else if (xhr.status >= 400) {
        console.error('failed to load config', xhr);
      }
    }
  };
  xhr.open('GET', `assets/${file}.json`);
  xhr.send();
}
