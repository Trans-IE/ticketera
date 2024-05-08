import { context } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { sassPlugin } from 'esbuild-sass-plugin';

const ctx = await context({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: false,
    sourcemap: false,
    splitting: false,
    target: ['chrome60', 'firefox57', 'safari12', 'edge79'],
    outdir: 'dist',
    format: 'iife',
    define: {
        'process.env.NODE_ENV': '"dev"'
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
            watch: true,
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./src/index.html'],
                to: ['dist'],
            },
            watch: true,
        }),
    ],
})

await ctx.watch()