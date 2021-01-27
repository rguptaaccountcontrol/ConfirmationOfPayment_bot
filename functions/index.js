const functions = Runtime.getFunctions();
const CallerOptionsTaskHandler = require(functions["CallerOptions"].path);
const mainMenuTaskHandler = require(functions["mainMenu_task"].path);
const ProcessPaymentTaskHandler = require(functions["ProcessPayment_task"]
  .path);
const agentTransferTypeHandler = require(functions["agentTransfer_task"].path);
const greetingTaskHandler = require(functions["greeting_task"].path);
const collectFallbackTaskHandler = require(functions["collect_fallback_task"]
  .path);
const fallbackHandler = require(functions["fallback_task"].path);

const responseBuilder = require(functions["responseBuilder"].path);

exports.handler = async (context, event, callback) => {
  console.log("Index");
  const { CurrentTask } = event;
  let { CurrentTaskConfidence } = event;
  let CurrentConfidencevalue = Number(CurrentTaskConfidence);
  console.log("currenttask: " + CurrentTask);
  console.log("CurrentTaskConfidence: " + CurrentTaskConfidence);
  console.log("CurrentConfidencevalue: " + CurrentConfidencevalue);

  // calling task handlers
  if (CurrentConfidencevalue === 1 || CurrentConfidencevalue === 0) {
    switch (CurrentTask) {
      case "CallerOptions":
        console.log("CallerOptions");
        await CallerOptionsTaskHandler.CallerOptions_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "mainMenu":
        console.log("mainMenu_task");
        await mainMenuTaskHandler.mainMenu_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "ProcessPayment":
        console.log("ProcessPayment_task");
        await ProcessPaymentTaskHandler.ProcessPayment_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "agentTransfer":
        console.log("agentTransfer_task");
        await agentTransferTypeHandler.agentTransfer_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "greeting":
        console.log("greeting");
        await greetingTaskHandler.greeting_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "collect_fallback":
        await collectFallbackTaskHandler.collect_fallback_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      case "fallback":
        await fallbackHandler.fallback_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;

      default:
        await fallbackHandler.fallback_task(
          context,
          event,
          callback,
          responseBuilder.RB
        );
        break;
    }
  } else {
    await fallbackHandler.fallback_task(
      context,
      event,
      callback,
      responseBuilder.RB
    );
    console.log("else fallback");
    return;
  }
};
