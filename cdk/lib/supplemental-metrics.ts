import {Construct} from 'constructs';
import {Rule} from 'aws-cdk-lib/aws-events';
import {MainFunction} from './main-function';
import {LambdaFunction} from 'aws-cdk-lib/aws-events-targets';

export interface SupplementalMetricsProps {

}

export class SupplementalMetrics extends Construct {
  constructor(scope: Construct, id: string, props: SupplementalMetricsProps) {
    super(scope, id);

    const rule = new Rule(this, 'GlueRule', {
      eventPattern: {
        source: ['aws.glue'],
        detailType: ['Glue Job State Change']
      }
    });
    const mainFn = new MainFunction(this, 'MainFunction', {

    });
    rule.addTarget(new LambdaFunction(mainFn));
  }
}
