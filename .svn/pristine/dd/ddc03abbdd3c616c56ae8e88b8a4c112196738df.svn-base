var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'TRANS-API-INTEGRACION',
  description: 'Web Server de API-INTEGRACION',
  script: 'C:\\Program Files (x86)\\Trans Industrias Electronicas\\API-Integracion\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service. C:\react-applications\treporting-api-rest
svc.on('install',function(){
  svc.start();
});

svc.install();