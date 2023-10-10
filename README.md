# Multer HTTP Storage

## Usage
```javascript
const MulterHttpStorage = require('@bss-sbc/multer-http-storage');

const customStorage = new MulterHttpStorage({
    uploadedFolder: ({query}) => {
        return `/${query.folder}/`;
    },
    url: (uploadedFolder) => {
        return `https://example.com/folder=${uploadedFolder}`
    },
});

const upload = multer({
    storage: customStorage
});

```