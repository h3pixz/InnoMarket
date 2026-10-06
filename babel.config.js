module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV !== 'production',
      },
    ],
  ],
};
