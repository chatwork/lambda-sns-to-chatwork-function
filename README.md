# lambda-sns-to-chatwork-function

[![Build Status](https://travis-ci.org/chatwork/lambda-sns-to-chatwork-function.svg?branch=develop)](https://travis-ci.org/chatwork/lambda-sns-to-chatwork-function)
[![Dependency Status](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function.png?theme=shields.io)](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function)
[![devDependency Status](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function/dev-status.png?theme=shields.io)](https://david-dm.org/chatwork/lambda-sns-to-chatwork-function#info=devDependencies)

Notify the SNS to chatwork.

![image](https://cloud.githubusercontent.com/assets/7764002/8642031/f3adc224-2958-11e5-901a-c9adfacd156f.png)


## Get started

```
export CHATWORK_API_TOKEN=xxxx
export CHATWORK_SEND_ROOM_ID=[ChatWork Room ID]
export CHATWORK_MESSAGE_TEMPLATE=[Notify Message]
git clone https://github.com/chatwork/lambda-sns-to-chatwork-function
cd lambda-sns-to-chatwork-function
npm install
npm run template
npm start # Notify the example events
```

## Configuration

You will generate `config/local.json`. When you run the `npm run template` to generate a `config/local.json` from the environment variable .


| name | type | value |
| :--: | :--: | :--: |
| CHATWORK_API_TOKEN | string | [ChatWork API Token](http://developer.chatwork.com/ja/authenticate.html) |
| CHATWORK_SEND_ROOM_ID | int | ID of the room to be sent to the ChatWork |
| CHATWORK_MESSAGE_TEMPLATE | string | The format of the message to be sent to the ChatWork (e.g. `<%- Message %>`) |

Or please create a `config/local.json`

```json
{
  "token": "[ChatWork API Token]",
  "roomId": [Send Room ID],
  "template": "[Message format]"
}
```

## Deployment

### Manual deploy

1. `git clone https://github.com/chatwork/lambda-sns-to-chatwork-function.git`
1. Generate `config/local.json`
2. Run the `npm run archive` tasks
3. It will upload the `archive.zip` as Lambda Function
4. Add the SNS to the event source

### Jenkins

1. `wget https://github.com/chatwork/lambda-sns-to-chatwork-function/archive/0.0.0.zip`
2. Generate `config/local.json`
3. `zip 0.0.0.zip config/local.json`
4. It will upload the `0.0.0.zip` to S3
5. To deploy the Lambda Function using the [AWS Lambda Plugin](https://wiki.jenkins-ci.org/display/JENKINS/AWS+Lambda+Plugin)

### TravisCI

1. To fork
2. Add configuration value to `.travis.yml` of `env`
3. Add `npm run template` to `.travis.yml` of `after_success`
4. Add deployment configuration to `.travis.yml` (e.g. [https://github.com/travis-ci/dpl#lambda](https://github.com/travis-ci/dpl#lambda))

## License

MIT

## Copyright

Copyright (c) 2015 ChatWork.inc
