module.exports = {
  "stories": [
    "../src/**/*.stories.@(tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    '@storybook/addon-actions',
		'@storybook/addon-links',
		'@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    "@storybook/preset-typescript"
  ]
}