module.exports = function(webpack) {
  return {
    devtool: false,
    plugins: [new webpack.SourceMapDevToolPlugin({})],
  };
};