import type { Contributor, ContributorConfig } from '../types.ts';

const NodeInfoContributor: Contributor<ContributorConfig> = () => {
  return Promise.resolve({
    version: process.version,
  });
};

export { NodeInfoContributor };
