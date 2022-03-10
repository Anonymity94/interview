class FileListPlugin {
  static defaultOptions = { outputFile: 'assets.md' };

  constructor(options = {}) {
    this.options = {
      ...FileListPlugin.defaultOptions,
      ...options,
    };
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name;

    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      console.log('plugin');
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,

          // Using one of the later asset processing stages to ensure
          // that all assets were already added to the compilation by other plugins.
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          console.log(Object.keys(compiler.hooks));
          console.log(Object.keys(compilation.hooks));
          console.log(assets);
          const content =
            '# In this build:\n\n' +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join('\n');

          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}

module.exports = { FileListPlugin };
