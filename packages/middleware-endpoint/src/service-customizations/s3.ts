import { EndpointParameters } from "@aws-sdk/types";

/**
 * @internal
 */
export const resolveParamsForS3 = async (endpointParams: EndpointParameters) => {
  const bucket = (endpointParams?.Bucket as string) || "";

  if (typeof endpointParams.Bucket === "string") {
    endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
  }

  if (isArnBucketName(bucket)) {
    if (endpointParams.ForcePathStyle === true) {
      throw new Error("Path-style addressing cannot be used with ARN buckets");
    }
  } else if (
    !isDnsCompatibleBucketName(bucket) ||
    (bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:")) ||
    bucket.toLowerCase() !== bucket ||
    bucket.length < 3
  ) {
    endpointParams.ForcePathStyle = true;
  }

  if (endpointParams.DisableMultiRegionAccessPoints) {
    // inconsistent naming
    endpointParams.disableMultiRegionAccessPoints = true;
    endpointParams.DisableMRAP = true;
  }

  return endpointParams;
};

const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
/**
 * @internal
 */
export const DOT_PATTERN = /\./;
/**
 * @internal
 */
export const S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;

/**
 * Determines whether a given string is DNS compliant per the rules outlined by
 * S3. Length, capitaization, and leading dot restrictions are enforced by the
 * DOMAIN_PATTERN regular expression.
 * @internal
 *
 * @see https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html
 */
export const isDnsCompatibleBucketName = (bucketName: string): boolean =>
  DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);

/**
 * @internal
 */
export const isArnBucketName = (bucketName: string): boolean => {
  const [arn, partition, service, region, account, typeOrId] = bucketName.split(":");
  const isArn = arn === "arn" && bucketName.split(":").length >= 6;
  const isValidArn = [arn, partition, service, account, typeOrId].filter(Boolean).length === 5;
  if (isArn && !isValidArn) {
    throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
  }
  return arn === "arn" && !!partition && !!service && !!account && !!typeOrId;
};
