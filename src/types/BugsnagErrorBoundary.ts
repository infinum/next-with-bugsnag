import { Bugsnag } from '@bugsnag/js';
import { ComponentType } from 'react';

export type BugsnagErrorBoundary = ComponentType<{
  FallbackComponent?: ComponentType;
  beforeSend?(report: Bugsnag.Report): void;
}>;
