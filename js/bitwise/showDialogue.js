const YES    = 1;
const NO     = 2;
const OK     = 4;
const CANCEL = 8;

function showDialog(message, options) {
  let msg = message;
  if (options & YES)    { msg += " [YES]"}
  if (options & NO)     { msg += " [NO]"}
  if (options & OK)     { msg += " [OK]"}
  if (options & CANCEL) { msg += " [CANCEL]"}
  console.log(msg);
}

showDialog('do you like it?', YES | NO);
showDialog('hey there tiny one', OK | CANCEL);
