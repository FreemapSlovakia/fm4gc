const head = document.getElementsByTagName('head')[0];

const s = document.createElement('script');


s.textContent = `
  L.Control.Layers.addInitHook(function () {
    const isHdpi = window.devicePixelRatio >= 1.5;

    this.addBaseLayer(
      L.tileLayer(
        'https://outdoor.tiles.freemap.sk/{z}/{x}/{y}' + (window.devicePixelRatio < 1.5 ? '' : window.devicePixelRatio < 2.5 ? '@2x' : '@3x'),
        {
          minZoom: 6,
          maxNativeZoom: 19,
          attribution: 'map &copy; <a href="https://www.freemap.sk">Freemap Slovakia</a> | data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ),
      'Freemap Outdoor'
    );

    this.addBaseLayer(
      L.tileLayer(
        'https://ofmozaika.tiles.freemap.sk/{z}/{x}/{y}.jpg',
        {
          minNativeZoom: 0,
          maxNativeZoom: isHdpi ? 18 : 19,
          tileSize: isHdpi ? 128 : 256,
          zoomOffset: isHdpi ? 1 : 0,
          attribution: '&copy; <a href="https://www.geoportal.sk/sk/udaje/ortofotomozaika/">GKÚ, NLC</a>',
        },
      ),
      'Ortofotomozaika SR'
    );
  });
`;

head.insertBefore(s, head.firstChild);
