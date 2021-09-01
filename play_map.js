const head = document.getElementsByTagName('head')[0];

const s = document.createElement('script');

s.textContent = `
  L.Map.addInitHook(function () {
    ${common}

    L.control.layers(
      {
        'Default': L.tileLayer(''),
        'Freemap Outdoor': freemapLayer,
        'Ortofotomozaika SR': ortoLayer,
      }
    ).addTo(this);

    freemapLayer.addTo(this);
  });
`;

head.insertBefore(s, head.firstChild);
