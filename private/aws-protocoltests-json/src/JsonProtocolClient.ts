// smithy-typescript generated code
import {
  EndpointsInputConfig,
  EndpointsResolvedConfig,
  RegionInputConfig,
  RegionResolvedConfig,
  resolveEndpointsConfig,
  resolveRegionConfig,
} from "@aws-sdk/config-resolver";
import { getContentLengthPlugin } from "@aws-sdk/middleware-content-length";
import {
  getHostHeaderPlugin,
  HostHeaderInputConfig,
  HostHeaderResolvedConfig,
  resolveHostHeaderConfig,
} from "@aws-sdk/middleware-host-header";
import { getLoggerPlugin } from "@aws-sdk/middleware-logger";
import { getRecursionDetectionPlugin } from "@aws-sdk/middleware-recursion-detection";
import { getRetryPlugin, resolveRetryConfig, RetryInputConfig, RetryResolvedConfig } from "@aws-sdk/middleware-retry";
import {
  AwsAuthInputConfig,
  AwsAuthResolvedConfig,
  getAwsAuthPlugin,
  resolveAwsAuthConfig,
} from "@aws-sdk/middleware-signing";
import {
  getUserAgentPlugin,
  resolveUserAgentConfig,
  UserAgentInputConfig,
  UserAgentResolvedConfig,
} from "@aws-sdk/middleware-user-agent";
import {
  Client as __Client,
  DefaultsMode as __DefaultsMode,
  SmithyConfiguration as __SmithyConfiguration,
  SmithyResolvedConfiguration as __SmithyResolvedConfiguration,
} from "@aws-sdk/smithy-client";
import {
  BodyLengthCalculator as __BodyLengthCalculator,
  Checksum as __Checksum,
  ChecksumConstructor as __ChecksumConstructor,
  Credentials as __Credentials,
  Hash as __Hash,
  HashConstructor as __HashConstructor,
  HttpHandlerOptions as __HttpHandlerOptions,
  Logger as __Logger,
  Provider,
  RegionInfoProvider,
  UrlParser as __UrlParser,
  UserAgent as __UserAgent,
} from "@aws-sdk/types";
import { HttpHandler as __HttpHandler } from "@smithy/protocol-http";
import {
  Decoder as __Decoder,
  Encoder as __Encoder,
  Provider as __Provider,
  StreamCollector as __StreamCollector,
} from "@smithy/types";

import { DatetimeOffsetsCommandInput, DatetimeOffsetsCommandOutput } from "./commands/DatetimeOffsetsCommand";
import { EmptyOperationCommandInput, EmptyOperationCommandOutput } from "./commands/EmptyOperationCommand";
import { EndpointOperationCommandInput, EndpointOperationCommandOutput } from "./commands/EndpointOperationCommand";
import {
  EndpointWithHostLabelOperationCommandInput,
  EndpointWithHostLabelOperationCommandOutput,
} from "./commands/EndpointWithHostLabelOperationCommand";
import { FractionalSecondsCommandInput, FractionalSecondsCommandOutput } from "./commands/FractionalSecondsCommand";
import { GreetingWithErrorsCommandInput, GreetingWithErrorsCommandOutput } from "./commands/GreetingWithErrorsCommand";
import {
  HostWithPathOperationCommandInput,
  HostWithPathOperationCommandOutput,
} from "./commands/HostWithPathOperationCommand";
import { JsonEnumsCommandInput, JsonEnumsCommandOutput } from "./commands/JsonEnumsCommand";
import { JsonUnionsCommandInput, JsonUnionsCommandOutput } from "./commands/JsonUnionsCommand";
import {
  KitchenSinkOperationCommandInput,
  KitchenSinkOperationCommandOutput,
} from "./commands/KitchenSinkOperationCommand";
import { NullOperationCommandInput, NullOperationCommandOutput } from "./commands/NullOperationCommand";
import {
  OperationWithOptionalInputOutputCommandInput,
  OperationWithOptionalInputOutputCommandOutput,
} from "./commands/OperationWithOptionalInputOutputCommand";
import {
  PutAndGetInlineDocumentsCommandInput,
  PutAndGetInlineDocumentsCommandOutput,
} from "./commands/PutAndGetInlineDocumentsCommand";
import {
  SimpleScalarPropertiesCommandInput,
  SimpleScalarPropertiesCommandOutput,
} from "./commands/SimpleScalarPropertiesCommand";
import { getRuntimeConfig as __getRuntimeConfig } from "./runtimeConfig";

export { __Client };

/**
 * @public
 */
export type ServiceInputTypes =
  | DatetimeOffsetsCommandInput
  | EmptyOperationCommandInput
  | EndpointOperationCommandInput
  | EndpointWithHostLabelOperationCommandInput
  | FractionalSecondsCommandInput
  | GreetingWithErrorsCommandInput
  | HostWithPathOperationCommandInput
  | JsonEnumsCommandInput
  | JsonUnionsCommandInput
  | KitchenSinkOperationCommandInput
  | NullOperationCommandInput
  | OperationWithOptionalInputOutputCommandInput
  | PutAndGetInlineDocumentsCommandInput
  | SimpleScalarPropertiesCommandInput;

/**
 * @public
 */
export type ServiceOutputTypes =
  | DatetimeOffsetsCommandOutput
  | EmptyOperationCommandOutput
  | EndpointOperationCommandOutput
  | EndpointWithHostLabelOperationCommandOutput
  | FractionalSecondsCommandOutput
  | GreetingWithErrorsCommandOutput
  | HostWithPathOperationCommandOutput
  | JsonEnumsCommandOutput
  | JsonUnionsCommandOutput
  | KitchenSinkOperationCommandOutput
  | NullOperationCommandOutput
  | OperationWithOptionalInputOutputCommandOutput
  | PutAndGetInlineDocumentsCommandOutput
  | SimpleScalarPropertiesCommandOutput;

/**
 * @public
 */
export interface ClientDefaults extends Partial<__SmithyResolvedConfiguration<__HttpHandlerOptions>> {
  /**
   * The HTTP handler to use. Fetch in browser and Https in Nodejs.
   */
  requestHandler?: __HttpHandler;

  /**
   * A constructor for a class implementing the {@link @aws-sdk/types#ChecksumConstructor} interface
   * that computes the SHA-256 HMAC or checksum of a string or binary buffer.
   * @internal
   */
  sha256?: __ChecksumConstructor | __HashConstructor;

  /**
   * The function that will be used to convert strings into HTTP endpoints.
   * @internal
   */
  urlParser?: __UrlParser;

  /**
   * A function that can calculate the length of a request body.
   * @internal
   */
  bodyLengthChecker?: __BodyLengthCalculator;

  /**
   * A function that converts a stream into an array of bytes.
   * @internal
   */
  streamCollector?: __StreamCollector;

  /**
   * The function that will be used to convert a base64-encoded string to a byte array.
   * @internal
   */
  base64Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a base64-encoded string.
   * @internal
   */
  base64Encoder?: __Encoder;

  /**
   * The function that will be used to convert a UTF8-encoded string to a byte array.
   * @internal
   */
  utf8Decoder?: __Decoder;

  /**
   * The function that will be used to convert binary data to a UTF-8 encoded string.
   * @internal
   */
  utf8Encoder?: __Encoder;

  /**
   * The runtime environment.
   * @internal
   */
  runtime?: string;

  /**
   * Disable dyanamically changing the endpoint of the client based on the hostPrefix
   * trait of an operation.
   */
  disableHostPrefix?: boolean;

  /**
   * Unique service identifier.
   * @internal
   */
  serviceId?: string;

  /**
   * Enables IPv6/IPv4 dualstack endpoint.
   */
  useDualstackEndpoint?: boolean | __Provider<boolean>;

  /**
   * Enables FIPS compatible endpoints.
   */
  useFipsEndpoint?: boolean | __Provider<boolean>;

  /**
   * The AWS region to which this client will send requests
   */
  region?: string | __Provider<string>;

  /**
   * Default credentials provider; Not available in browser runtime.
   * @internal
   */
  credentialDefaultProvider?: (input: any) => __Provider<__Credentials>;

  /**
   * Fetch related hostname, signing name or signing region with given region.
   * @internal
   */
  regionInfoProvider?: RegionInfoProvider;

  /**
   * The provider populating default tracking information to be sent with `user-agent`, `x-amz-user-agent` header
   * @internal
   */
  defaultUserAgentProvider?: Provider<__UserAgent>;

  /**
   * Value for how many times a request will be made at most in case of retry.
   */
  maxAttempts?: number | __Provider<number>;

  /**
   * Specifies which retry algorithm to use.
   */
  retryMode?: string | __Provider<string>;

  /**
   * Optional logger for logging debug/info/warn/error.
   */
  logger?: __Logger;

  /**
   * The {@link @aws-sdk/smithy-client#DefaultsMode} that will be used to determine how certain default configuration options are resolved in the SDK.
   */
  defaultsMode?: __DefaultsMode | __Provider<__DefaultsMode>;
}

/**
 * @public
 */
export type JsonProtocolClientConfigType = Partial<__SmithyConfiguration<__HttpHandlerOptions>> &
  ClientDefaults &
  RegionInputConfig &
  EndpointsInputConfig &
  RetryInputConfig &
  HostHeaderInputConfig &
  AwsAuthInputConfig &
  UserAgentInputConfig;
/**
 * @public
 *
 *  The configuration interface of JsonProtocolClient class constructor that set the region, credentials and other options.
 */
export interface JsonProtocolClientConfig extends JsonProtocolClientConfigType {}

/**
 * @public
 */
export type JsonProtocolClientResolvedConfigType = __SmithyResolvedConfiguration<__HttpHandlerOptions> &
  Required<ClientDefaults> &
  RegionResolvedConfig &
  EndpointsResolvedConfig &
  RetryResolvedConfig &
  HostHeaderResolvedConfig &
  AwsAuthResolvedConfig &
  UserAgentResolvedConfig;
/**
 * @public
 *
 *  The resolved configuration interface of JsonProtocolClient class. This is resolved and normalized from the {@link JsonProtocolClientConfig | constructor configuration interface}.
 */
export interface JsonProtocolClientResolvedConfig extends JsonProtocolClientResolvedConfigType {}

/**
 * @public
 */
export class JsonProtocolClient extends __Client<
  __HttpHandlerOptions,
  ServiceInputTypes,
  ServiceOutputTypes,
  JsonProtocolClientResolvedConfig
> {
  /**
   * The resolved configuration of JsonProtocolClient class. This is resolved and normalized from the {@link JsonProtocolClientConfig | constructor configuration interface}.
   */
  readonly config: JsonProtocolClientResolvedConfig;

  constructor(configuration: JsonProtocolClientConfig) {
    const _config_0 = __getRuntimeConfig(configuration);
    const _config_1 = resolveRegionConfig(_config_0);
    const _config_2 = resolveEndpointsConfig(_config_1);
    const _config_3 = resolveRetryConfig(_config_2);
    const _config_4 = resolveHostHeaderConfig(_config_3);
    const _config_5 = resolveAwsAuthConfig(_config_4);
    const _config_6 = resolveUserAgentConfig(_config_5);
    super(_config_6);
    this.config = _config_6;
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(getAwsAuthPlugin(this.config));
    this.middlewareStack.use(getUserAgentPlugin(this.config));
  }

  /**
   * Destroy underlying resources, like sockets. It's usually not necessary to do this.
   * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
   * Otherwise, sockets might stay open for quite a long time before the server terminates them.
   */
  destroy(): void {
    super.destroy();
  }
}
