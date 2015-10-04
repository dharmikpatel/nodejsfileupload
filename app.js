var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload 			= 		multer({ dest: './uploads/'});
var fs = require('fs');
var path = require('path');
var fileup = "";
app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
		console.log(fieldname);
		console.log(filename);
		return filename;
	},
	onFileUploadStart: function (file) {
		
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path);
		fileup = file.path;
		var filePath = path.join(__dirname, fileup);
		fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		    if (!err){
		    console.log('received data: ' + data);
		    //response.writeHead(200, {'Content-Type': 'text/html'});
		    //response.write(data);
		    //response.end();
		    }else{
		        console.log(err);
		    }

		});
	}
}));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
