const path = require('path'); // CommonJS

module.exports = {
    mode: 'development',  //Dois modos: development (mais rápido)
    entry: './frontend/main.js', //Arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'), //bundle pro public (Todo código modificado pelo webpack)
        filename: 'bundle.js'
    },
    module: { //é o modulo que ele vai usar
        rules: [
            {
                exclude: /node_modules/, //Não pega esse arquivo (exclui)
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }, 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'source-map' //Faz um mapeamento já que junta vários arquivos
};