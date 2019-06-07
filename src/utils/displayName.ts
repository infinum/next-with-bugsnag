import { ComponentType } from 'react';

export function getDisplayName(BaseComponent: ComponentType) {
  if (typeof BaseComponent === 'string') {
    return BaseComponent;
  }

  if (!BaseComponent) {
    return undefined;
  }

  return BaseComponent.displayName || BaseComponent.name || 'Component';
}

export function wrapDisplayName(BaseComponent: ComponentType, hocName: string) {
  return `${hocName}(${getDisplayName(BaseComponent)})`;
}
