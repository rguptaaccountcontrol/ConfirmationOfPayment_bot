exports.agentTransfer_task =async function(context, event, callback,RB) {
    try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    const Memory = JSON.parse(event.Memory);

     Say = "Please wait while we transfer you to an agent  ";
     Remember.choice=3;
    
    //End of your code.
   
     RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
    
     } catch (error) {
    console.error("error: "+ error);
    callback( error);
    }
    };