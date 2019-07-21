module.exports = {
    devServer: {
        hot: true,
        port: 8080,
        host: '0.0.0.0',
        //禁用域名检测，供内网穿透使用
        disableHostCheck: true
    }
}