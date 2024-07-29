import { load } from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';

export function loadConfig() {
  return load(
    readFileSync(
      join(__dirname, '../../../../apps/user/src/config/config.dev.yaml'),
      'utf8',
    ),
  ) as Record<string, any>;
}
