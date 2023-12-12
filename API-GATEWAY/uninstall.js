var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
    name:'API-GATEWAY',
    description: 'Web Server de Agent-Session API REST',
    script: 'C:\\react-projects\\API-GATEWAY\\API-GATEWAY\\index.js'
  });
 
// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});
 
// Uninstall the service.
svc.uninstall();