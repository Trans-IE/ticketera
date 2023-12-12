var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'API-GATEWAY',
  description: 'Web Server de Agent-Session API REST',
  script: 'C:\\react-projects\\API-GATEWAY\\API-GATEWAY\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service. C:\react-applications\treporting-api-rest
svc.on('install',function(){
  console.log('Service initialized.');
  svc.start();
});

svc.install();