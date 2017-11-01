# AWS s3 Wrapper

A handful of utility tools for AWS s3 functions

http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html

## Usage:

```javascript
const s3 = require('@headforwards-spd/aws-s3');
```

### saveDataUri()

```javascript
const s3Bucket  = 'my-s3-bucket';
const dataUri   = 'my-data-uri';
const objectKey = 'my-object-key';

function saveMyDataUri() {

    return new Promise((resolve, reject) => {
        
        try {

            s3.saveDataUri(s3Bucket, dataUri, objectKey)
                .then(
                    response => resolve(response),
                    error => reject(error)
                );

        } catch (error) {

            reject(error);
        }
    });
}
```

### getObjectUrl()

```javascript
const s3Bucket  = 'my-s3-bucket';
const objectKey = 'my-object-key';

function myObjectGetUrlIs() {

    return new Promise((resolve, reject) => {

        try {

            s3.getObjectUrl(s3Bucket, objectKey)
                .then(
                    getObjectUrl => resolve(getObjectUrl),
                    error => reject(error)
                );
        } catch (error) {

            reject(error);
        }
    });
}
```

### putObjectUrl()

```javascript
const s3Bucket    = 'my-s3-bucket';
const objectKey   = 'my-object-key';
const contentType = 'my-object-content-type';

function myObjectPutUrlIs() {

    return new Promise((resolve, reject) => {

        try {

            s3.putObjectUrl(s3Bucket, objectKey, contentType)
                .then(
                    putObjectUrl => resolve(putObjectUrl),
                    error => reject(error)
                );

        } catch (error) {

            reject(error);
        }
    });
}
```