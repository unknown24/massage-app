const fetchHandle = (url, config) => {
    return  fetch(url, config)
        .then(r => r.text())
        .then(r => {
          try {
            return JSON.parse(r);
          } catch (error) {
            console.log("e", error, r);
            return r;
          }
        });
}

export const postFetch = (url, params) => {

    const body = new FormData();
    for(var key in params) {
        body.append(key,params[key])
     }

    return fetchHandle(url, {
        method: "POST",
        body: body
    })
}

export default fetchHandle