import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

const client = new CloudWatchClient({});
export async function handler(event: any): Promise<any> {
  console.log(JSON.stringify(event, null, 2));

  //  {
  //   "version": "0",
  //   "id": "ad35d6ee-86cb-14ad-68a8-d8abea0de45a",
  //   "detail-type": "Glue Job State Change",
  //   "source": "aws.glue",
  //   "account": "348901320172",
  //   "time": "2024-02-21T17:38:11Z",
  //   "region": "us-west-2",
  //   "resources": [],
  //   "detail": {
  //     "jobName": "bigquery_ga_export_to_snowflake",
  //     "severity": "ERROR",
  //     "state": "FAILED",
  //     "jobRunId": "jr_7c0805867bae428cbc4cbb64f4afd42813308658010be821fb97f2bba125ec7c",
  //     "message": "NameError: name 'sql' is not defined"
  //   }
  // }

  if (event.detail.state !== undefined && event.detail.jobName !== undefined) {
    const jobName = event.detail.jobName;
    const state = event.detail.state;
    const command = new PutMetricDataCommand({
      Namespace: "SUP/Glue",
      MetricData: [
        {
          MetricName: "JobStatus",
          Dimensions: [
            {
              Name: "State",
              Value: state,
            },
            {
              Name: "JobName",
              Value: jobName,
            }
          ],
          Value: 1,
        },
      ],
    });
    await client.send(command);
  }
}
