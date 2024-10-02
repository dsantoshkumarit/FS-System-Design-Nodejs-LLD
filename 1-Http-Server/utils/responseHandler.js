const responseHandler = (req,res,headers,status, data) => {
    for(let [key,value] of Object.entries(headers)){
        res.setHeader(key,value);
    }

    // Write response content
    res.write(data);
    res.statusCode = status;
    
    // End the response
    res.end();
}

module.exports = {responseHandler};