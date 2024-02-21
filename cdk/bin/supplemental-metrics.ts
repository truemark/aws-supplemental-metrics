#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SupplementalMetricsStack } from '../lib/supplemental-metrics-stack';

const app = new cdk.App();
new SupplementalMetricsStack(app, 'SupplementalMetrics', {});
