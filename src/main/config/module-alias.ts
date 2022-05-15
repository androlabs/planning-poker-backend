import { addAliases } from 'module-alias';
import { resolve } from 'path';

addAliases({
  '@application': resolve('dist/application'),
  '@domain': resolve('dist/domain'),
  '@infra': resolve('dist/infra'),
  '@main': resolve('dist/main'),
});
