var http=require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");
var server = http.createServer(function(req,res){
	if (req.url === "/favicon.ico") {
		res.end("404");
		return;
	}
	var extns = [".html",".js",".gif"];
	var ext = path.extname(url.parse(req.url).pathname);
	if ( extns.indexOf(ext) > -1 ){
		var fn = url.parse(req.url).pathname
		var fileName = fn.substr(1,fn.length-1);

		console.log(fileName, fs.existsSync(fileName));
		fs.createReadStream(fileName).pipe(res);
		return;
	}
	//console.log();
	var reqData = '';
	req.on('data',function(chunk){
		reqData += chunk;
	});
	req.on('end',function(chunk){
		if (typeof chunk !== "undefined")
			reqData += chunk;
		var prod = JSON.parse(reqData);
		prod.productValue = prod.cost * prod.units;
		setTimeout(function(){
			res.end(JSON.stringify(prod));
		},15000);
		
	});

	
	
});
server.listen(9091);