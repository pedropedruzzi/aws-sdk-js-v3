import { CredentialsProviderError } from "@aws-sdk/property-provider";
import { AwsCredentialIdentityProvider } from "@aws-sdk/types";
import { RequestOptions } from "http";
import { parse } from "url";

import { httpRequest } from "./remoteProvider/httpRequest";
import { fromImdsCredentials, isImdsCredentials } from "./remoteProvider/ImdsCredentials";
import { providerConfigFromInit, RemoteProviderInit } from "./remoteProvider/RemoteProviderInit";
import { retry } from "./remoteProvider/retry";

/**
 * @internal
 */
export const ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
/**
 * @internal
 */
export const ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
/**
 * @internal
 */
export const ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";

/**
 * @internal
 * 
 * Creates a credential provider that will source credentials from the ECS
 * Container Metadata Service
 */
export const fromContainerMetadata = (init: RemoteProviderInit = {}): AwsCredentialIdentityProvider => {
  const { timeout, maxRetries } = providerConfigFromInit(init);
  return () =>
    retry(async () => {
      const requestOptions = await getCmdsUri();
      const credsResponse = JSON.parse(await requestFromEcsImds(timeout, requestOptions));
      if (!isImdsCredentials(credsResponse)) {
        throw new CredentialsProviderError("Invalid response received from instance metadata service.");
      }
      return fromImdsCredentials(credsResponse);
    }, maxRetries);
};

const requestFromEcsImds = async (timeout: number, options: RequestOptions): Promise<string> => {
  if (process.env[ENV_CMDS_AUTH_TOKEN]) {
    options.headers = {
      ...options.headers,
      Authorization: process.env[ENV_CMDS_AUTH_TOKEN],
    };
  }

  const buffer = await httpRequest({
    ...options,
    timeout,
  });
  return buffer.toString();
};

const CMDS_IP = "169.254.170.2";
const GREENGRASS_HOSTS = {
  localhost: true,
  "127.0.0.1": true,
};
const GREENGRASS_PROTOCOLS = {
  "http:": true,
  "https:": true,
};

const getCmdsUri = async (): Promise<RequestOptions> => {
  if (process.env[ENV_CMDS_RELATIVE_URI]) {
    return {
      hostname: CMDS_IP,
      path: process.env[ENV_CMDS_RELATIVE_URI],
    };
  }

  if (process.env[ENV_CMDS_FULL_URI]) {
    const parsed = parse(process.env[ENV_CMDS_FULL_URI]!);
    if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
      throw new CredentialsProviderError(
        `${parsed.hostname} is not a valid container metadata service hostname`,
        false
      );
    }

    if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
      throw new CredentialsProviderError(
        `${parsed.protocol} is not a valid container metadata service protocol`,
        false
      );
    }

    return {
      ...parsed,
      port: parsed.port ? parseInt(parsed.port, 10) : undefined,
    };
  }

  throw new CredentialsProviderError(
    "The container metadata credential provider cannot be used unless" +
      ` the ${ENV_CMDS_RELATIVE_URI} or ${ENV_CMDS_FULL_URI} environment` +
      " variable is set",
    false
  );
};
