const head = document.getElementsByTagName('head')[0];

const s = document.createElement('script');


s.textContent = `
  L.Map.addInitHook(function () {
    ${common}

    const iRef = setInterval(() => {
      let removed = false;

      this.eachLayer((layer) => {
        if (layer !== freemapLayer && layer !== ortoLayer && layer._url) {
          removed = true;

          this.removeLayer(layer);
        }
      });

      if (removed) {
        clearInterval(iRef);
      }
    }, 200);

    L.control
      .layers(
        {
          'Freemap Outdoor': freemapLayer,
          'Ortofotomozaika SR': ortoLayer,
        }
      )
      .addTo(this);

    freemapLayer.addTo(this);

    const mapLinks = document.querySelector('#ctl00_ContentBody_MapLinks_MapLinks > ul');

    const m = /lat=([\\d.]+)&lng=([\\d.]+)/.exec(mapLinks.firstChild.firstChild.href);

    console.log(mapLinks.firstChild.firstChild.href, {m});

    if (m) {
      const li = document.createElement('li');

      li.innerHTML = \`<a target="_blank" href="https://www.freemap.sk/?map=16/\${m[1]}/\${m[2]}&point=\${m[1]}/\${m[2]}">Freemap.sk</a>\`;

      mapLinks.insertBefore(li, mapLinks.firstChild);
    }
  });
`;

head.insertBefore(s, head.firstChild);
