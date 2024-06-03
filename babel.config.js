module.exports = {
    presets: [
      [
        '@babel/preset-env', // Transpiles ES6 features to ES5
        {
          targets: 'defaults' // Choose appropriate targets based on your browser support
        }
      ]
    ]
  };