const AWS = require('aws-sdk');
const s3  = new AWS.S3();

module.exports.saveDataUri  = saveDataUri;
module.exports.getObjectUrl = getObjectUrl;
module.exports.getObject    = getObject;
module.exports.putObjectUrl = putObjectUrl;

function saveDataUri(s3Bucket, dataUri, key) {

    return new Promise((resolve, reject) => {

        try {

            const contentTypeRegExp = new RegExp(/^data:(.+);/);
            const regex             = new RegExp(/^data:(?:.+);base64,(.*)$/);

            const contentType = contentTypeRegExp.exec(dataUri)[1];
            const data        = regex.exec(dataUri)[1];

            const params = {
                Bucket:      s3Bucket,
                Key:         key,
                ContentType: contentType,
                Body:        new Buffer(data, 'base64')
            };

            // if signature filed exists
            s3.putObject(params, (error, response) => {

                    !error && resolve(response) || reject(error);
                }
            );

        } catch (error) {

            reject(error);
        }
    });
}

function getObjectUrl(s3Bucket, key) {

    return new Promise((resolve, reject) => {

        try {

            let params = {
                Bucket: s3Bucket,
                Key:    key
            };

            s3.headObject(params, (error) => {

                !!error && console.log(error);

                let url = !error ? s3.getSignedUrl('getObject', params) : null;

                resolve(url);
            });

        } catch (error) {

            reject(error);
        }
    });
}

function getObject(s3Bucket, key) {

    try {

        let params = {
            Bucket: s3Bucket,
            Key:    key
        };

        return Promise.resolve()
            .then(() => checkObjectExists(params))
            .then(() => new Promise((resolve, reject) => {

                s3.getObject(params, (error, data) => !error && resolve(data) || reject(error));
            }));

    } catch(error) {

        return Promise.reject(error);
    }
}

function checkObjectExists(params) {

    return new Promise((resolve, reject) => {

        s3.headObject(params, (error) => !error && resolve() || reject(error));
    });
}


function putObjectUrl(s3Bucket, key, contentType) {

    return new Promise((resolve, reject) => {

        try {

            const params = {
                Bucket:      s3Bucket,
                Key:         key,
                ContentType: contentType
            };

            let url = (!!contentType) ? s3.getSignedUrl('putObject', params) : null;

            resolve(url);

        } catch (error) {

            reject(error);
        }
    });
}