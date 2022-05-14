import { addAliases } from 'module-alias';
import { resolve } from 'path';

addAliases({
  '@application': resolve('dist'),
  '@domain': resolve('dist'),
  '@infra': resolve('dist'),
  '@main': resolve('dist'),
});
