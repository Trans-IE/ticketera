var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'TRANS-API-INTEGRACION',
  description: 'Web Server de API-INTEGRACION',
  script: 'C:\\Program Files (x86)\\Trans Industrias Electronicas\\API-Integracion\\index.js'
  });
 
// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});
 
// Uninstall the service.
svc.uninstall();