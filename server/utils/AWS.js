const AWS = require('aws-sdk');
let bucketName = process.env.BUCKET_NAME;
let bucketRegion = process.env.BUCKET_REGION;
let poolId = process.env.POOL_ID;
AWS.config.update({
	region      : bucketRegion,
	credentials : new AWS.CognitoIdentityCredentials({
		IdentityPoolId : poolId
	})
});
const s3 = new AWS.S3({
	apiVersion : '2006-03-01',
	params     : { Bucket: bucketName }
});

module.exports = {
	returnS3Instance() {
		// console.log('returning s3 instance from AWS', s3)
		return s3;
	},
	awsSignup(creatrDirKey) {
		s3.headObject({ Key: creatrDirKey }, function(err, data) {
			console.log('inside signUp headObject');
			if (!err) {
				console.log('A creator with this username already exists.');
			}
			if (err.code !== 'NotFound') {
				console.log(
					'There was an error creating your content directory: ' + err.message
				);
			}
			s3.putObject({ Key: creatrDirKey }, function(err, data) {
				console.log('inside signUp put');
				if (err) {
					console.log(
						'There was an error creating your content directory: ' +
							err.message
					);
				}
				console.log('Successfully created content directory.');
			});
		});
	},
	// not currently using
	awsUpload(fileKey, file) {
		return new AWS.S3.ManagedUpload({
			params : {
				Bucket : bucketName,
				Key    : fileKey,
				Body   : file,
				ACL    : 'public-read'
			}
		});
	},
	// not currently using
	awsDelete(photoKey) {
		s3.deleteObject({ Key: photoKey }, function(err, data) {
			if (err) {
				console.log('There was an error deleting your photo: ', err.message);
			}
		});
	}
};