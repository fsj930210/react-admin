import { bind, assignIn } from 'lodash-es';

import { defaults } from './defaults';
import Request from './Request';

import type { CreateRequestDefaults, RequestInstance } from './types';

function createInstance(defaultConfig: CreateRequestDefaults) {
  const context = new Request(defaultConfig);
  const instance: any = bind(Request.prototype.request, context);

  // Copy request.prototype to instance
  assignIn(instance, Request.prototype, context, { allOwnKeys: true });

  // Copy context to instance
  assignIn(instance, context, null, { allOwnKeys: true });

  // Factory for creating new instances
  instance.create = function create(instanceConfig: CreateRequestDefaults) {
    return createInstance(instanceConfig);
  };

  return instance as RequestInstance;
}

// Create the default instance to be exported
const request = createInstance(defaults);

export default request;
