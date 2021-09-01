const head = document.getElementsByTagName('head')[0];

const s = document.createElement('script');

s.textContent = `
  L.Control.Layers.addInitHook(function () {
    ${common}

    this.addBaseLayer(freemapLayer, 'Freemap Outdoor');

    this.addBaseLayer(ortoLayer, 'Ortofotomozaika SR');
  });
`;

head.insertBefore(s, head.firstChild);
