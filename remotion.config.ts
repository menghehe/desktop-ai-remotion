import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

Config.overrideWebpackConfig((currentConfiguration) => {
  const rules = currentConfiguration.module?.rules ?? [];

  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: rules.map((rule) => {
        if (
          typeof rule === 'object' &&
          rule &&
          rule.test instanceof RegExp &&
          rule.test.test('.css') &&
          Array.isArray(rule.use)
        ) {
          return {
            ...rule,
            use: [...rule.use, {loader: require.resolve('postcss-loader')}],
          };
        }
        return rule;
      }),
    },
  };
});
