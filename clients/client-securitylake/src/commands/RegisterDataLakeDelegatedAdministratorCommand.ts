// smithy-typescript generated code
import { EndpointParameterInstructions, getEndpointPlugin } from "@aws-sdk/middleware-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
} from "@aws-sdk/types";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";

import {
  RegisterDataLakeDelegatedAdministratorRequest,
  RegisterDataLakeDelegatedAdministratorResponse,
} from "../models/models_0";
import {
  de_RegisterDataLakeDelegatedAdministratorCommand,
  se_RegisterDataLakeDelegatedAdministratorCommand,
} from "../protocols/Aws_restJson1";
import { SecurityLakeClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SecurityLakeClient";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link RegisterDataLakeDelegatedAdministratorCommand}.
 */
export interface RegisterDataLakeDelegatedAdministratorCommandInput
  extends RegisterDataLakeDelegatedAdministratorRequest {}
/**
 * @public
 *
 * The output of {@link RegisterDataLakeDelegatedAdministratorCommand}.
 */
export interface RegisterDataLakeDelegatedAdministratorCommandOutput
  extends RegisterDataLakeDelegatedAdministratorResponse,
    __MetadataBearer {}

/**
 * @public
 * <p>Designates the Amazon Security Lake delegated administrator account for the organization. This
 *          API can only be called by the organization management account. The organization management
 *          account cannot be the delegated administrator account.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SecurityLakeClient, RegisterDataLakeDelegatedAdministratorCommand } from "@aws-sdk/client-securitylake"; // ES Modules import
 * // const { SecurityLakeClient, RegisterDataLakeDelegatedAdministratorCommand } = require("@aws-sdk/client-securitylake"); // CommonJS import
 * const client = new SecurityLakeClient(config);
 * const input = { // RegisterDataLakeDelegatedAdministratorRequest
 *   accountId: "STRING_VALUE", // required
 * };
 * const command = new RegisterDataLakeDelegatedAdministratorCommand(input);
 * const response = await client.send(command);
 * // {};
 *
 * ```
 *
 * @param RegisterDataLakeDelegatedAdministratorCommandInput - {@link RegisterDataLakeDelegatedAdministratorCommandInput}
 * @returns {@link RegisterDataLakeDelegatedAdministratorCommandOutput}
 * @see {@link RegisterDataLakeDelegatedAdministratorCommandInput} for command's `input` shape.
 * @see {@link RegisterDataLakeDelegatedAdministratorCommandOutput} for command's `response` shape.
 * @see {@link SecurityLakeClientResolvedConfig | config} for SecurityLakeClient's `config` shape.
 *
 * @throws {@link AccessDeniedException} (client fault)
 *  <p>You do not have sufficient access to perform this action. Access denied errors appear when Amazon Security Lake explicitly or implicitly denies an authorization
 *          request. An explicit denial occurs when a policy contains a Deny statement for the specific
 *          Amazon Web Services action. An implicit denial occurs when there is no applicable Deny statement and also
 *          no applicable Allow statement.</p>
 *
 * @throws {@link BadRequestException} (client fault)
 *  <p>The request is malformed or contains an error such as an invalid parameter value or a missing required parameter.</p>
 *
 * @throws {@link ConflictException} (client fault)
 *  <p>Occurs when a conflict with a previous successful write is detected. This generally
 *          occurs when the previous write did not have time to propagate to the host serving the
 *          current request. A retry (with appropriate backoff logic) is the recommended response to
 *          this exception.</p>
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p>Internal service exceptions are sometimes caused by transient issues. Before you start
 *          troubleshooting, perform the operation again.</p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>The resource could not be found.</p>
 *
 * @throws {@link ThrottlingException} (client fault)
 *  <p>The limit on the number of requests per second was exceeded.</p>
 *
 * @throws {@link SecurityLakeServiceException}
 * <p>Base exception class for all service exceptions from SecurityLake service.</p>
 *
 */
export class RegisterDataLakeDelegatedAdministratorCommand extends $Command<
  RegisterDataLakeDelegatedAdministratorCommandInput,
  RegisterDataLakeDelegatedAdministratorCommandOutput,
  SecurityLakeClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  public static getEndpointParameterInstructions(): EndpointParameterInstructions {
    return {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    };
  }

  /**
   * @public
   */
  constructor(readonly input: RegisterDataLakeDelegatedAdministratorCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: SecurityLakeClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<RegisterDataLakeDelegatedAdministratorCommandInput, RegisterDataLakeDelegatedAdministratorCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, RegisterDataLakeDelegatedAdministratorCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "SecurityLakeClient";
    const commandName = "RegisterDataLakeDelegatedAdministratorCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: (_: any) => _,
      outputFilterSensitiveLog: (_: any) => _,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  /**
   * @internal
   */
  private serialize(
    input: RegisterDataLakeDelegatedAdministratorCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return se_RegisterDataLakeDelegatedAdministratorCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<RegisterDataLakeDelegatedAdministratorCommandOutput> {
    return de_RegisterDataLakeDelegatedAdministratorCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
