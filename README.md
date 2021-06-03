# express-file-upload-multer
This repo explains how to use multer for uploading files to backend server's defined storage and response back with the file.

## static destination defination 
Among the other ways such as geting files from server via API, defining destination folder as static, mayking it publically available. However, this is not the suggested method because;

    1 - it can possibily bring vulnerability to your folder structure
    2- it can cause confusion as your project goes bigger.

```
app.use('/upload', express.static('upload'));
```
however, for the sake of example, just have implemented here.

## geting files from server  

As mentioned above, files from server can be accessed via static folder defination. However getting files from server via API endpoit is suggested. Here is how we can access files from server via an end point.

```
app.get('/getFile/:filename', (req, res) => {

    const fileName = req.params.filename;

    if (!fileName || fileName === undefined) {
		res.status(400).send({
			message: 'filename is required',
		});
	} else {
		res.status(200).sendFile(`${path.join(__dirname, 'upload', fileName)}`);
	}
});
```

One thing to keep in mind is that while responding back to a request with a file, we need to provide absolute path to the resource.

Cheers! 


