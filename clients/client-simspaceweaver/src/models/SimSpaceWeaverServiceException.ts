// smithy-typescript generated code
import {
  ServiceException as __ServiceException,
  ServiceExceptionOptions as __ServiceExceptionOptions,
} from "@aws-sdk/smithy-client";

export { __ServiceException, __ServiceExceptionOptions };

/**
 * @public
 *
 * Base exception class for all service exceptions from SimSpaceWeaver service.
 */
export class SimSpaceWeaverServiceException extends __ServiceException {
  /**
   * @internal
   */
  constructor(options: __ServiceExceptionOptions) {
    super(options);
    Object.setPrototypeOf(this, SimSpaceWeaverServiceException.prototype);
  }
}
