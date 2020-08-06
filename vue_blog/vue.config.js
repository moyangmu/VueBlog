module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/vueblog/" : "/",
    devServer: {
        host: "47.95.13.8",
        port: 8080,
        open: true,
        proxy: {}
    }
}