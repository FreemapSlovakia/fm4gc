Object.defineProperty(window, "L", {
  configurable: true,
  set(L) {
    delete window.L; // Remove the property to redefine it normally

    window.L = L; // Assign it back

    L.Map.addInitHook(function () {
      const [freemapLayer, ortoLayer] = freemap_createLayers();

      L.control
        .layers({
          Default: L.tileLayer(""),
          "Freemap Outdoor": freemapLayer,
          "Ortofotomozaika SR": ortoLayer,
        })
        .addTo(this);

      freemapLayer.addTo(this);
    });
  },
});
