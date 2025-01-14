import type { Plugin } from 'vite';

import { createInfo } from './info.ts';
import type { BuildInfoFilePluginConfig, Json } from './types.ts';

const defaultBuildInfoFilePluginConfig: BuildInfoFilePluginConfig = {
  contributors: {
    git: { commitId: 'SHORT', enabled: true },
    node: { enabled: true },
    package: { enabled: true },
    platform: { enabled: true },
  },
  filename: 'info.json',
};

function buildInfoFile(config: BuildInfoFilePluginConfig = defaultBuildInfoFilePluginConfig): Plugin {
  return {
    name: 'build-info-file',
    // eslint-disable-next-line sort-keys
    async buildEnd(error?: Error) {
      if (!error) {
        const infoFile: Json = await createInfo(config);
        this.emitFile({
          fileName: config.filename,
          name: config.filename,
          source: JSON.stringify(infoFile, undefined, 2),
          type: 'asset',
        });
      }
    },
  };
}

export { buildInfoFile };
