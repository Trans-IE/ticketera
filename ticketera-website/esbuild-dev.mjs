import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { sassPlugin } from "esbuild-sass-plugin";
import liveServer from "live-server";

const watch = process.argv.includes("--watch");

const esbuildConfig = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: false,
  sourcemap: false,
  splitting: false,
  platform: "browser",
  target: ["chrome60", "firefox57", "safari12", "edge79"],
  outdir: "dist",
  format: "iife",
  define: {
    "process.env.NODE_ENV": '"dev"',
  },
  loader: {
    ".js": "jsx",
    ".woff": "dataurl",
    ".woff2": "dataurl",
    ".ttf": "dataurl",
    ".png": "dataurl",
    ".svg": "dataurl",
  },
  plugins: [
    sassPlugin(),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/config/*"],
        to: ["dist/config"],
      },
      watch: watch, // Cambiado a `watch` variable
    }),
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/index.html"],
        to: ["dist"],
      },
      watch: watch, // Cambiado a `watch` variable
    }),
  ],
  watch: watch && {
    onRebuild(error, result) {
      if (error) console.error("watch build failed:", error);
      else console.log("watch build succeeded:", result);
    },
  },
};

await build(esbuildConfig);

if (watch) {
  liveServer.start({
    root: "dist",
    open: false,
    file: "index.html",
    wait: 1000,
  });
}
