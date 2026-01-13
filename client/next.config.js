module.exports = {
  experimental: {
    allowedDevOrigins: ['ticketing.dev']
  },
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
