import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: false,
    splitting: false,
    target: ['chrome60', 'firefox57', 'safari12', 'edge79'],
    outdir: 'dist',
    format: 'iife',
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    loader: {
        '.js': 'jsx',
        '.woff': 'dataurl',
        '.woff2': 'dataurl',
        '.ttf': 'dataurl',
        '.png': 'dataurl',
        '.svg': 'dataurl',
    },
    plugins: [
        sassPlugin(),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./src/config/*'],
                to: ['dist/config'],
            },
            watch: false,
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./src/index.html'],
                to: ['dist'],
            },
            watch: false,
        }),
    ],
})