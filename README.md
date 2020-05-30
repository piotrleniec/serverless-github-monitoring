# Serverless Github Monitoring

## IAM Permissions

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Manual0",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::{{ APPLICATION_NAME }}-code-bucket/*"
            ]
        },
        {
            "Sid": "Manual1",
            "Effect": "Allow",
            "Action": "cloudformation:*",
            "Resource": [
                "arn:aws:cloudformation:{{ REGION }}:{{ ACCOUNT_ID }}:stack/{{ APPLICATION_NAME }}",
                "arn:aws:cloudformation:{{ REGION }}:{{ ACCOUNT_ID }}:stack/{{ APPLICATION_NAME }}/*",
                "arn:aws:cloudformation:{{ REGION }}:aws:transform/Serverless-2016-10-31"
            ]
        },
        {
            "Sid": "Manual2",
            "Effect": "Allow",
            "Action": "lambda:*",
            "Resource": [
                "arn:aws:lambda:{{ REGION }}:{{ ACCOUNT_ID }}:function:{{ APPLICATION_NAME }}-*"
            ]
        },
        {
            "Sid": "Manual3",
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": [
                "arn:aws:iam::{{ ACCOUNT_ID }}:role/{{ APPLICATION_NAME }}-*"
            ]
        },
        {
            "Sid": "Manual4",
            "Effect": "Allow",
            "Action": "apigateway:*",
            "Resource": [
                "arn:aws:apigateway:{{ REGION }}::/restapis",
                "arn:aws:apigateway:{{ REGION }}::/restapis/*"
            ]
        }
    ]
}
```

## Sample CloudWatch Logs Insights Queries

```
filter eventType = 'jobFinished'
| filter jobResult = '{{ JOB_RESULT }}'
| filter jobName = '{{ JOB_NAME }}'
| stats avg(durationInMinutes) by bin(1h)
```

```
filter eventType = 'jobFinished'
| stats count(*) by bin(1h)
```

```
filter eventType = 'jobFinished'
| stats sum(durationInMinutes) by runId
```
