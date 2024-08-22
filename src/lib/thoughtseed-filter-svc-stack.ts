import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class ThoughtseedFilterSvcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "lambda", {
      entry: "src/index.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
    });
    const s3BucketsPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:ListBucket"],
      resources: [
        "arn:aws:s3:::thoughtseed-influencers",
        "arn:aws:s3:::thoughtseed-influencers/*",
        "arn:aws:s3:::thoughtseed-influencers/top_insta_influencers_data.csv",
      ],
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    fn.role?.attachInlinePolicy(
      new iam.Policy(this, "s3BucketsPolicy", {
        statements: [s3BucketsPolicy],
      })
    );

    new apigw.LambdaRestApi(this, "thoughtspeed-api", {
      handler: fn,
    });
  }
}
