const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const copyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: { // Alias === 경로 별칭 해당 경로로 점프 뛰어서 이동 가능
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  //parcel index.html
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  //결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true // public파일에 app.js가 남아있는거를 제거한다
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        // ?는 뒤에 s라는게 있을수도 있고 없을 수도있는거 scss,css파일 둘다 찾기 위함
        test: /\.s?css$/, // .css확장자로 끝나는 것을 찻는것 $은 앞에 있는 내용으로 끝나는 것을 의미 
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new copyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}