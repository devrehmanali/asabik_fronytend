const path = require("path");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

const iconsDir = path.join(__dirname, "./src/assets/icons/");

console.log("\n- Use extra webpack config: webpack.config.js");

module.exports = {
  resolve: {
    alias: {
      "ui-icons": path.resolve(__dirname, "src/assets/icons/"),
    },
  },
  context: __dirname,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/asabik-web"),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: iconsDir,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "ui-icons.svg",
              publicPath: "/",
              symbolId: "ui-icon-[name]",
            },
          },
        ],
      },
    ],
  },
  plugins: [new SpriteLoaderPlugin({ plainSprite: true })],
};
