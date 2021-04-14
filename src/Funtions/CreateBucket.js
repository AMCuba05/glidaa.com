var AWS = require("aws-sdk");

var path = require('path')


// Set the region

AWS.config.update({

  region: "us-east-1",

  accessKeyId: "your aws  acces id ",

  secretAccessKey: "your secret access key"
});

s3 = new AWS.S3();

var bucketParams = {

  Bucket: "imageurrllll",

  ACL: "public-read"
};



s3.createBucket(bucketParams, function(err, data) {

  if (err) {

    console.log("Error", err);

  } else {

    console.log("Success", data.Location);

    var folder_name = 'root_folder'

    //this is for local folder data path

    var filePath = "./public/stylesheets/user.png"

    //var child_folder='child'

    var date = Date.now()

    var imgData = `${folder_name}_${date}/` +

      path.basename(filePath);


    var params = {

      Bucket: 'imageurrllll',

      Body: '', //here you can  give image data url from your local directory

      Key: imgData,

      ACL: 'public-read'
    };

    //in this section we are creating the folder structre 

    s3.upload(params, async function(err, aws_uploaded_url) {

      //handle error

      if (err) {

        console.log("Error", err);

      }

      //success
      else {

        console.log("Data Uploaded in:", aws_uploaded_url.Location)

      }

    })
  }

});