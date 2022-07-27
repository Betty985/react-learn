module.exports = {
    output: {
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.json', '.js'],
    },
    externals: [
      {
        react: 'React',
      },
    ],
  };