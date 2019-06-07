import { Bugsnag } from '@bugsnag/js';
import React from 'react';

const BugsnagContext = React.createContext<Bugsnag.Client | null>(null);

export const BugsnagProvider = BugsnagContext.Provider;
export const BugsnagConsumer = BugsnagContext.Consumer;
