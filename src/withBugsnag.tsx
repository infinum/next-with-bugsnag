import { Bugsnag } from '@bugsnag/js';
import * as React from 'react';

import { BugsnagConsumer } from './context';
import { wrapDisplayName } from './utils/displayName';

export const withBugsnag = (ComposedComponent: React.ComponentType) => {
  const WithBugsnagWrapper = (props: any) => (
    <BugsnagConsumer>
      {(value: Bugsnag.Client | null) => (
        <ComposedComponent {...props} bugsnag={value} />
      )}
    </BugsnagConsumer>
  );

  if (process.env.NODE_ENV !== 'production') {
    WithBugsnagWrapper.displayName = wrapDisplayName(ComposedComponent, 'withBugsnag');
  }

  return WithBugsnagWrapper;
};
