const head = document.getElementsByTagName('head')[0];

const s = document.createElement('script');


s.textContent = `
  L.Map.addInitHook(function () {
    const isHdpi = window.devicePixelRatio >= 1.5;

    const freemapLayer = L.tileLayer(
      'https://outdoor.tiles.freemap.sk/{z}/{x}/{y}' + (window.devicePixelRatio < 1.5 ? '' : window.devicePixelRatio < 2.5 ? '@2x' : '@3x'),
      {
        minZoom: 6,
        maxNativeZoom: 19,
        attribution: 'map &copy; <a href="https://www.freemap.sk">Freemap Slovakia</a> | data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );

    const ortoLayer = L.tileLayer(
      'https://ofmozaika.tiles.freemap.sk/{z}/{x}/{y}.jpg',
      {
        minNativeZoom: 0,
        maxNativeZoom: isHdpi ? 18 : 19,
        tileSize: isHdpi ? 128 : 256,
        zoomOffset: isHdpi ? 1 : 0,
        attribution: '&copy; <a href="https://www.geoportal.sk/sk/udaje/ortofotomozaika/">GKÚ, NLC</a>',
      },
    );

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
        },
        null,
        {
          position: 'topleft',
        }
      )
      .addTo(this);

    freemapLayer.addTo(this);

    const xxx = document.querySelector('#ctl00_ContentBody_MapLinks_MapLinks > ul');

    const m = /lat=([\\d.]+)&lng=([\\d.]+)/.exec(xxx.firstChild.firstChild.href);

    console.log(xxx.firstChild.firstChild.href, {m});

    if (m) {
      const li = document.createElement('li');

      li.innerHTML = \`<a target="_blank" href="https://www.freemap.sk/?map=16/\${m[1]}/\${m[2]}&point=\${m[1]}/\${m[2]}">Freemap.sk</a>\`;

      xxx.insertBefore(li, xxx.firstChild);
    }

  });
`;

head.insertBefore(s, head.firstChild);
