module.exports = (api) => {
  const isProd = api.env('production');

  return {
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
          development: !isProd,
        },
      ],
    ],
  };
};
