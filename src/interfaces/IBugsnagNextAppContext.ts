import { Bugsnag } from '@bugsnag/js';

export interface IBugsnagNextAppContext {
  ctx: {
    bugsnag: Bugsnag.Client;
  };
}
