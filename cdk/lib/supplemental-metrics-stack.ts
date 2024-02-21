import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {SupplementalMetrics} from './supplemental-metrics';
import {Rule} from 'aws-cdk-lib/aws-events';

export class SupplementalMetricsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new SupplementalMetrics(this, 'SupplementalMetrics', {});
  }
}
