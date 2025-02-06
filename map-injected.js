Object.defineProperty(window, "L", {
  configurable: true,
  set(L) {
    delete window.L; // Remove the property to redefine it normally

    window.L = L; // Assign it back

    Object.defineProperty(L, "Control", {
      configurable: true,
      set(Control) {
        delete L.Control; // Remove the property to redefine it normally

        L.Control = Control; // Assign it back

        Object.defineProperty(L.Control, "Layers", {
          configurable: true,
          set(Layers) {
            delete L.Control.Layers; // Remove the property to redefine it normally

            L.Control.Layers = Layers; // Assign it back

            L.Control.Layers.addInitHook(function () {
              const [freemapLayer, ortoLayer] = freemap_createLayers();

              this.addBaseLayer(freemapLayer, "Freemap Outdoor");

              this.addBaseLayer(ortoLayer, "Ortofotomozaika SR");
            });
          },
        });
      },
    });
  },
});
