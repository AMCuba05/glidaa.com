// var userFolder = 'your_bucket_name' + '/' + variable-with-dir-1-name + '/' + variable-with-dir-2-name;
// // IMPORTANT : No trailing '/' at the end of the last directory name

// AWS.config.region = 'us-east-1';

// AWS.config.update({
//     accessKeyId: 'YOUR_KEY_HERE',
//     secretAccessKey: 'your_secret_access_key_here'
// });

// var bucket = new AWS.S3({
//     params: {
//         Bucket: userFolder
//     }
// });

// var contentToPost = {
//     Key: <<your_filename_here>>, 
//     Body: <<your_file_here>>,
//     ContentEncoding: 'base64',
//     ContentType: <<your_file_content_type>>,
//     ServerSideEncryption: 'AES256'
// };

// bucket.putObject(contentToPost, function (error, data) {

//     if (error) {
//         console.log("Error in posting Content [" + error + "]");
//         return false;
//     } /* end if error */
//     else {
//         console.log("Successfully posted Content");
//     } /* end else error */
// })
// .on('httpUploadProgress',function (progress) {
//     // Log Progress Information
//     console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
// });