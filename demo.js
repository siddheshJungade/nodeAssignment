import https from 'https'
let request = https.get('https://randomuser.me/api/', (res) => {
    if (res.statusCode !== 200) {
        console.err("error")
        res.resume()
        return
    }
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        return data;
    });
});

// request.end();

request.on('error', (err) => {
    console.error(`Encountered an error trying to make a request: ${err.message}`);
  });

setTimeout(() =>{
    console.log(JSON.parse(request))

},5000)
