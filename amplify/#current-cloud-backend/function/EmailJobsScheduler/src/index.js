/* Amplify Params - DO NOT EDIT
	API_MONITORAPI_EMAILJOBTABLE_ARN
	API_MONITORAPI_EMAILJOBTABLE_NAME
	API_MONITORAPI_EMAILTEMPLATETABLE_ARN
	API_MONITORAPI_EMAILTEMPLATETABLE_NAME
	API_MONITORAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const AWS = require("aws-sdk");
const axios = require("axios");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const items = await getJobs();

  console.log("ddb data: ", items);

  for (const item of items) {
    console.log("emails: ", JSON.stringify(item.emails));
    let emails = item.emails;

    let numberOfEmailsToProcess = Math.ceil(parseInt(item.limit) / 60);

    for (let i = 0; i < numberOfEmailsToProcess; i++) {
      let emailToProcess = emails.find((x) => x.isProcessed == false);
      if (emailToProcess) {
        emailToProcess.isProcessed = true;
        emails = emails.filter((x) => x.email != emailToProcess.email);
        emails.push(emailToProcess);

        item.emails = JSON.stringify(emails);
        item.status = "processing";
        await sendEmail(emailToProcess.email, item.templateId);
        await updateMutation(item);
      } else {
        break;
      }
    }

    console.log("Prcessed item : ", item);
  }
};

async function updateitem(item) {
  try {
    let putItemParams = {
      TableName: process.env.API_MONITORAPI_EMAILJOBTABLE_NAME,
      Item: item,
    };

    const res = await dynamodbClient.put(putItemParams).promise();

    return res;
  } catch (err) {
    console.log("PUT error : ", err);
    return null;
  }
}

async function getJobs() {
  try {
    const params = {
      TableName: process.env.API_MONITORAPI_EMAILJOBTABLE_NAME,
      FilterExpression:
        "#status = :job_status_processing or #status = :job_status_active",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":job_status_processing": "processing",
        ":job_status_active": "active",
      },
    };

    const data = await dynamodbClient.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.log("DDB Error: ", err);
  }
}

async function getTemplate(id) {
  let params = {
    TableName: process.env.API_MONITORAPI_EMAILTEMPLATETABLE_NAME,
    Key: {
      id: id,
    },
  };
  try {
    console.log("template param: ", params);
    const data = await dynamodbClient.get(params).promise();
    console.log("DDB template: ", data);
    return data.Item;
  } catch (err) {
    console.log("DDB template error: ", err);
  }
}

async function updateMutation({ id, emails, status }) {
  let req = new AWS.HttpRequest(
    "https://4jkaynefzzeljkljpyklrlgjlq.appsync-api.us-east-1.amazonaws.com/graphql",
    "us-east-1"
  );
  req.method = "POST";
  req.headers.host =
    "4jkaynefzzeljkljpyklrlgjlq.appsync-api.us-east-1.amazonaws.com";
  req.headers["Content-Type"] = "multipart/form-data";
  req.headers["X-Api-Key"] = "da2-2d5iwcwo2fcdjeogkaasw2rbey";
  req.body = JSON.stringify({
    query: `
      mutation UpdateEmailJob(
        $input: UpdateEmailJobInput!
        $condition: ModelEmailJobConditionInput
      ) {
        updateEmailJob(input: $input, condition: $condition) {
          id
          name
          queryId
          templateId
          limit
          emails
          status
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      input: {
        id: id,
        emails: emails,
        status: status,
      },
    },
  });

  let signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  return axios({
    method: "post",
    url:
      "https://4jkaynefzzeljkljpyklrlgjlq.appsync-api.us-east-1.amazonaws.com/graphql",
    data: req.body,
    headers: req.headers,
  });
}

async function sendEmail(email, templateId) {

 let template = await getTemplate(templateId);
  const msg = {
    to: email, // Change to your recipient
    from: "sc@explainerpage.com", // Change to your verified sender
    subject: template.subject,
    text: template.textBody,
    html: template.htmlBody,
  };

  console.log("email message: ", msg);

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return true;
  } catch (err) {
    console.log("Email send error: ", err);
    return null;
  }
}
