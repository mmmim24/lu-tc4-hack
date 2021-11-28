export const getGatewayURL = (props) => functions.httpsCallable('getGatewayURL')(props)
  .then((result) => {
    // Read result of the Cloud Function.
    console.log(result);
  });
