// smithy-typescript generated code
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

import { MediaTypeHeaderInput, MediaTypeHeaderOutput } from "../models/models_0";
import { de_MediaTypeHeaderCommand, se_MediaTypeHeaderCommand } from "../protocols/Aws_restJson1";
import { RestJsonProtocolClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../RestJsonProtocolClient";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link MediaTypeHeaderCommand}.
 */
export interface MediaTypeHeaderCommandInput extends MediaTypeHeaderInput {}
/**
 * @public
 *
 * The output of {@link MediaTypeHeaderCommand}.
 */
export interface MediaTypeHeaderCommandOutput extends MediaTypeHeaderOutput, __MetadataBearer {}

/**
 * @public
 * This example ensures that mediaType strings are base64 encoded in headers.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { RestJsonProtocolClient, MediaTypeHeaderCommand } from "@aws-sdk/aws-protocoltests-restjson"; // ES Modules import
 * // const { RestJsonProtocolClient, MediaTypeHeaderCommand } = require("@aws-sdk/aws-protocoltests-restjson"); // CommonJS import
 * const client = new RestJsonProtocolClient(config);
 * const input = { // MediaTypeHeaderInput
 *   json: "STRING_VALUE",
 * };
 * const command = new MediaTypeHeaderCommand(input);
 * const response = await client.send(command);
 * // { // MediaTypeHeaderOutput
 * //   json: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param MediaTypeHeaderCommandInput - {@link MediaTypeHeaderCommandInput}
 * @returns {@link MediaTypeHeaderCommandOutput}
 * @see {@link MediaTypeHeaderCommandInput} for command's `input` shape.
 * @see {@link MediaTypeHeaderCommandOutput} for command's `response` shape.
 * @see {@link RestJsonProtocolClientResolvedConfig | config} for RestJsonProtocolClient's `config` shape.
 *
 * @throws {@link RestJsonProtocolServiceException}
 * <p>Base exception class for all service exceptions from RestJsonProtocol service.</p>
 *
 */
export class MediaTypeHeaderCommand extends $Command<
  MediaTypeHeaderCommandInput,
  MediaTypeHeaderCommandOutput,
  RestJsonProtocolClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  /**
   * @public
   */
  constructor(readonly input: MediaTypeHeaderCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: RestJsonProtocolClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<MediaTypeHeaderCommandInput, MediaTypeHeaderCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "RestJsonProtocolClient";
    const commandName = "MediaTypeHeaderCommand";
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
  private serialize(input: MediaTypeHeaderCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return se_MediaTypeHeaderCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<MediaTypeHeaderCommandOutput> {
    return de_MediaTypeHeaderCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
