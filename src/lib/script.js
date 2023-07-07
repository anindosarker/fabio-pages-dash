function formatMetaTags(tags) {
  return (
    "&" +
    Object.keys(tags)
      .map(function (key) {
        if (tags[key].name.length > 0) {
          return tags[key].name + "=" + encodeURIComponent(tags[key].content);
        } else {
          return (
            tags[key].getAttribute("property") +
            "=" +
            encodeURIComponent(tags[key].content)
          );
        }
      })
      .join("&")
  );
}
function formatParams(params) {
  return (
    "&" +
    Object.keys(params)
      .map(function (key) {
        return key + "=" + encodeURIComponent(params[key]);
      })
      .join("&")
  );
}

const grabberFunction = async () => {
  const tags = window.top.document.getElementsByTagName("meta");
  const url_referrer =
    window.location.host.length > 0 ? window.location.host.toLowerCase() : "";
  // fof url referrer -> window.location.href gets the whole url. theres window.location.host too.
  const titulo_pagina =
    window.top.document.title.length > 0
      ? window.top.document.title.toLowerCase()
      : "";

  const lng = navigator.language !== null ? navigator.language : "";

  const currentOs = navigator.platform !== null ? navigator.platform : "";

  const today = new Date();
  const user_agent = navigator.userAgent;
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const hrs = today.getHours();
  const hours = hrs.toString().length > 1 ? hrs : `0${hrs}`;
  const min = today.getMinutes();
  const minutes = min.toString().length > 1 ? min : `0${min}`;
  const seg = today.getSeconds();
  const seconds = seg.toString().length > 1 ? seg : `0${seg}`;
  const time = hours + ":" + minutes + ":" + seconds;
  const dateTime = date + " " + time;

  // new req code
  const request = new XMLHttpRequest();
  request.timeout = 1000;

  // Parametros da Page
  const params = {
    title: titulo_pagina,
    url_referrer: url_referrer,
    language: lng,
    user_agent: user_agent,
    os: currentOs,
    datetime: dateTime,
  };

  // const endpoint = "http://127.0.0.1:8000/?";
  const endpoint = "https://www.ew3.com.br/testing/analytics?";
  const url = endpoint + formatParams(params) + formatMetaTags(tags);

  console.log(url);
  console.log(params);

  request.open("GET", url, true);
  request.send(url);

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // fazer alguma coisa aqui!!!
      const res = request.responseText;
      console.log(res); // resposta do servidor
      document.querySelector("#data").innerHTML = res;
    }
  };
};

// old req code

// const url = `https://www.ew3.com.br/testing/analytics?url_ref=${url_referrer}&title=${titulo_pagina}&lang=${lng}&os=${currentOs}&userAgent=${userAgent}datetime=${dateTime}`
// console.log(url)
// const responseBackend = await fetch(url, {
// type: 'GET',
// crossDomain: true,
// dataType: 'jsonp',
// });
// const dataBackend = await responseBackend.json();
// document.querySelector('#data').innerHTML = JSON.stringify(dataBackend);
// console.log(dataBackend);

// };

export default grabberFunction;
