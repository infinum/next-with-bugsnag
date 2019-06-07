import bugsnag, { Bugsnag } from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import React from 'react';

let bugsnagClient: Bugsnag.Client;

export function getOrCreateBugsnagClient(apiKeyOrOpts: string | Bugsnag.IConfig): Bugsnag.Client {
  if (!bugsnagClient) {
    bugsnagClient = bugsnag(apiKeyOrOpts);
    bugsnagClient.use(bugsnagReact, React);
  }

  return bugsnagClient;
}
