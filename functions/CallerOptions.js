exports.CallerOptions_task = async function (context, event, callback, RB) {
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
    let { CurrentTaskConfidence } = event;
    let CurrentConfidencevalue = Number(CurrentTaskConfidence);

    if (Memory.check_cnt === undefined) {
      Remember.check_cnt = 0;
      console.log("Counter: " + Remember.check_cnt);
    }
    // First time the CurrentConfidencevalue is 0
    else {
      if (CurrentConfidencevalue === 0) {
        console.log("CurrentConfidencevalue: " + CurrentConfidencevalue);
        Remember.check_cnt = Memory.check_cnt + 1;
      }
    }
    if (Remember.check_cnt === 0)
      Say = `To authorize us to proceed with this payment request press 1 or say proceed ,
                 to return to the main menu press 2 or say menu ,
                 to talk to a  representative press 3 or say agent ,
                 to repeat this message press 4 or say repeat`;
    else
      Say = `To authorize us to proceed with this payment request press 1 or say proceed ,
                 to return to the main menu press 2 or say menu ,
                 to talk to a  representative press 3 or say agent ,
                 to repeat this message press 4 or say repeat`;

    console.log("Counter: " + Remember.check_cnt);
    if (Remember.check_cnt <= 3 || Remember.check_cnt === undefined) {
      Listen = {
        voice_digits: {
          num_digits: 1,
          finish_on_key: "#",
          redirects: {
            1: "task://ProcessPayment",
            2: "task://mainMenu",
            3: "task://agentTransfer",
            4: "task://greeting",
          },
        },
      };
    } else {
      Say = `I'm sorry didn't quite get that. `;
      Redirect = "task://agentTransfer";
    }
    //End of your code.

    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  } catch (error) {
    console.error("error: " + error);
    callback(error);
  }
};
