import Web3 from 'web3';
var currentAccount;
if (window.ethereum) {
  handleEthereum();
} else {
  window.addEventListener('ethereum#initialized', handleEthereum, {
    once: true,
  });
  setTimeout(handleEthereum, 3000); // 3 seconds
}
function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Access the decentralized web!
  } else {
    console.log('Please install MetaMask!');
  }
}
//window.ethereum.enable();
// web3 = new Web3();
export default web3;
