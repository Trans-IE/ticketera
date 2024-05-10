import { build } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { mkdirSync, existsSync } from 'fs'

if (!existsSync('dist')) {
    mkdirSync('dist')
}

if (!existsSync('dist/logs')) {
    mkdirSync('dist/logs')
}

await build({
    entryPoints: ['index.js'],
    bundle: true,
    minify: true,
    sourcemap: false,
    splitting: false,
    target: ['node20'],
    outdir: 'dist',
    format: 'iife',
    platform: 'node',
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    plugins: [
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./.env'],
                to: ['dist/.env'],
            },
            watch: false,
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./sslcert/*'],
                to: ['dist/sslcert'],
            },
            watch: false,
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./public/*'],
                to: ['dist/public'],
            },
            watch: false,
        }),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./package.json'],
                to: ['dist/package.json'],
            },
            watch: false,
        })
    ],

})