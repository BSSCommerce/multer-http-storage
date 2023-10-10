const superagent = require('superagent');
const url = require('url');

function CustomStorage({uploadedFolder, url, method, accept = 'application/json'}) {
    this.uploadedFolder = uploadedFolder;
    this.accept = accept;
    this.url = url;
    this.method = method;
}

CustomStorage.prototype._handleFile = function (req, file, cb) {
    const parsedUrl = url.parse(req.url, true);
    const uploadFolder = this.uploadedFolder(parsedUrl);
    const uploadUrl = this.url(uploadFolder);
    superagent
        .post(uploadUrl)
        .accept(this.accept)
        .attach(file.fieldname, file.stream, file.originalname)
        .then((data) => {
            cb(null, data.body[file.fieldname]);
        })
        .catch((error) => {
            cb(error);
        });
};

CustomStorage.prototype._removeFile = () => {};

module.exports = CustomStorage;
