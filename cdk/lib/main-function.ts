import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import {Construct} from 'constructs';
import {Architecture, Runtime} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import {RetentionDays} from 'aws-cdk-lib/aws-logs';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';

export interface MainFunctionProps {

}

export class MainFunction extends NodejsFunction {
  constructor(scope: Construct, id: string, props: MainFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_20_X,
      architecture: Architecture.ARM_64,
      logRetention: RetentionDays.ONE_MONTH,
      handler: 'handler',
      entry: path.join(__dirname, '..', '..', 'handlers', 'src', 'main-handler.ts'),
      memorySize: 512,
    });

    this.addToRolePolicy(new PolicyStatement({
      actions: ['cloudwatch:PutMetricData'],
      resources: ['*']
    }))
  }
}
