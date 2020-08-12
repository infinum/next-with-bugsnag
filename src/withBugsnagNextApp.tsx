import { Bugsnag } from '@bugsnag/js';
import NextAppContext from 'next/app';
import React, { Component } from 'react';

import { BugsnagProvider } from './context';
import { IBugsnagNextAppContext } from './interfaces/IBugsnagNextAppContext';
import { wrapDisplayName } from './utils/displayName';
import { getOrCreateBugsnagClient } from './utils/getOrCreateBugsnagClient';

export const withBugsnagNextApp = (apiKeyOrOpts: string | Bugsnag.IConfig) => (
  ComposedComponent: any
): any => {
  class WithBugsnagNextAppWrapper extends Component {
    public static async getInitialProps(
      context: NextAppContext & IBugsnagNextAppContext
    ): Promise<any> {
      let appProps = {
        pageProps: {},
      };

      const client: Bugsnag.Client = getOrCreateBugsnagClient(apiKeyOrOpts);
      context.ctx.bugsnag = client;

      if (ComposedComponent.getInitialProps) {
        appProps = await ComposedComponent.getInitialProps(context);
      }

      return appProps;
    }

    private bugsnag: Bugsnag.Client;

    constructor(props: any) {
      super(props);
      this.bugsnag = getOrCreateBugsnagClient(apiKeyOrOpts);
    }

    public render() {
      const appProps = {
        ...this.props,
        bugsnag: this.bugsnag,
      };

      return (
        <BugsnagProvider value={this.bugsnag}>
          <ComposedComponent {...appProps} />
        </BugsnagProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    (WithBugsnagNextAppWrapper as any).displayName = wrapDisplayName(
      ComposedComponent,
      'withBugsnagNextApp'
    );
  }

  return WithBugsnagNextAppWrapper;
};
