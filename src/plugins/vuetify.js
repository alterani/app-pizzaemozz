import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const newLocal = colors.red.lighten4;
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#344955",
        secondary: "#F9AA33",
        accent: "#232F34",
        info: "#4A6572",
        error: "#B00020",
        success: "#4CAF50",
        warning: "#FFC107",
        // https://material.io/design/color/applying-color-to-ui.html#top-and-bottom-app-bars
      },
    },
  },
});
