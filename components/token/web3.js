import Web3 from 'web3';
var currentAccount;
function handleAccountsChanged(accounts) {
    window.ethereum
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
      window.location.reload();
    } else if (accounts[0] !== currentAccount) {
      window.location.reload();
      currentAccount = accounts[0];
      console.log(currentAccount);
      //window.location.reload();
      // Do any other work!
    }
    //window.location.reload();
  }
var web3 = new Web3();// = new Web3(window.web3.currentProvider);
try{
if (window.ethereum) {
    try{
    web3 = new Web3(window.ethereum);
       //window.ethereum.enable().then(function() {
        
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(function(){
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        currentAccount = web3.eth.getAccounts();
           // User has allowed account access to DApp...
       });
    } catch(e) {
       // User has denied account access to DApp...
    }
 }
 // Legacy DApp Browsers
 else if (window.web3) {
     web3 = new Web3(window.web3.currentProvider);
     currentAccount = web3.eth.getAccounts();
 }
 // Non-DApp Browsers
 else {
     alert('You have to install MetaMask !');
     web3 = new Web3();
 }
}catch{
    console.log("xxxxxxxxxx")
}
//window.ethereum.enable();
// web3 = new Web3();
export default web3;
