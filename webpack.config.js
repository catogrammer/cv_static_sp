const path = require('path');
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// Define your website's URLs dynamically
const urls = [
    { loc: "https://catogrammer.com/", lastmod: "2025-02-19", changefreq: "monthly", priority: "1.0" },
];

// Generate XML sitemap
const generateSitemap = () => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
        .map(
        (url) => `
        <url>
            <loc>${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
            <changefreq>${url.changefreq}</changefreq>
            <priority>${url.priority}</priority>
        </url>`
    ) .join("\n")}
    </urlset>`;

    fs.writeFileSync(path.join(__dirname, '.', "build", "sitemap.xml"), sitemapContent);
    console.log("✅ Sitemap generated: ./build/sitemap.xml");
};
generateSitemap();

module.exports = {

    entry: './src/index.js',

    devServer: {
        static: [path.join(__dirname, '..', 'build')],
        historyApiFallback: true
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },

    resolve: {
        alias: {
            images:  path.resolve(__dirname, "./src/imgs"),
            fonts:   path.resolve(__dirname, "./src/fonts"),
            favicon: path.resolve(__dirname, "./src/favicon")
        },
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
            },
            {
                test: /\.pug$/,
                use: [ "pug-loader", ],
            },
            {
                test: /\.(jp(e)?g|png|svg|ico)$/i,
                use : [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.(ttf)$/,
                type: 'asset/resource',
                dependency: { not: ['url'] },
            }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/cv-app.pug",
            filename: 'index.html',
        }),
        
        new MiniCssExtractPlugin({
            filename: '[name].style.css'
        }),

        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", '!sitemap.xml'],
        }),
    ]
}