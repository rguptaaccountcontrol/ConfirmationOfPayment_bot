exports.greeting_task = async function (context, event, callback, RB) {
  try {
    let Listen = false;
    let Remember = {};
    let Collect = false;
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
    let Say = "";
    // Add your code here.
    console.log("greeting_task");
    const Memory = JSON.parse(event.Memory);
     let { CurrentTaskConfidence } = event;
     let CurrentConfidencevalue = Number(CurrentTaskConfidence);
    // let date_ob = new Date();
    // let date = ("0" + date_ob.getDate()).slice(-2);
    // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // let year = date_ob.getFullYear();
    // let cdate = month + "/" + date + "/" + year;
    // let LegalAnnounce;
    // let TypeOfPayment;
    // let AcctLastFourDigit;

    // if (Memory.LegalAnnounce === undefined) LegalAnnounce = 'the payment of $400';
    // else LegalAnnounce = Memory.LegalAnnounce;

    // if (Memory.TypeOfPayment === undefined) TypeOfPayment = "ACH";
    // else TypeOfPayment = Memory.TypeOfPayment;

    // if (Memory.AcctLastFourDigit === undefined)
    // AcctLastFourDigit = 6104;
    // else AcctLastFourDigit = Memory.AcctLastFourDigit;

    // console.log("TypeOfPayment: " + TypeOfPayment);
    // console.log("AcctLastFourDigit: " + AcctLastFourDigit);
    // console.log("LegalAnnounce: " + LegalAnnounce);

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

    //This code runs when comming from Address_task
    if (Remember.check_cnt === 0)
      Prompt = `To authorize us to proceed with this payment request press 1 or say proceed ,
                   to return to the main menu press 2 or say menu ,
                   to talk to a  representative press 3 or say agent ,
                   to repeat this message press 4 or say repeat`;
    else 
      Prompt = `To authorize us to proceed with this payment request press 1 or say proceed ,
                   to return to the main menu press 2 or say menu ,
                   to talk to a  representative press 3 or say agent ,
                   to repeat this message press 4 or say repeat`;
    
                    console.log("check_cnt: " + Remember.check_cnt);
     if (Remember.check_cnt <= 3 || Remember.check_cnt === undefined) {
      // Say = `Before I process your payment, Let’s confirm-Today’s date is, , , , ${cdate},  , , ,  You are authorizing ${LegalAnnounce}. , to be taken from your ${TypeOfPayment}  account ending in ,   ${AcctLastFourDigit}. ,`;

      // Say=`You are in greeting task`;
      // //Redirect = "task://CallerOptions";
      // Say += Prompt;
      Say= Prompt;

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
    console.error(error);
    callback(error);
  }
};
