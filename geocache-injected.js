Object.defineProperty(window, "L", {
  configurable: true,
  set(L) {
    delete window.L; // Remove the property to redefine it normally

    window.L = L; // Assign it back

    if (L.Map) {
      addFreemapLayers();
    } else {
      Object.defineProperty(L, "Map", {
        configurable: true,
        set(Map) {
          delete L.Map;

          L.Map = Map;

          addFreemapLayers();
        },
      });
    }
  },
});

function addFreemapLayers() {
  L.Map.addInitHook(function () {
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

    const [freemapLayer, ortoLayer] = freemap_createLayers();

    L.control
      .layers({
        "Freemap Outdoor": freemapLayer,
        "Ortofotomozaika SR": ortoLayer,
      })
      .addTo(this);

    freemapLayer.addTo(this);

    const mapLinks = document.querySelector(
      "#ctl00_ContentBody_MapLinks_MapLinks > ul"
    );

    const m = /lat=([\\d.]+)&lng=([\\d.]+)/.exec(
      mapLinks.firstChild.firstChild.href
    );

    console.log(mapLinks.firstChild.firstChild.href, { m });

    if (m) {
      const li = document.createElement("li");

      li.innerHTML = `<a target="_blank" href="https://www.freemap.sk/?map=16/\${m[1]}/\${m[2]}&point=\${m[1]}/\${m[2]}">Freemap.sk</a>`;

      mapLinks.insertBefore(li, mapLinks.firstChild);
    }
  });
}
