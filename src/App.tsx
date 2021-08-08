import './App.css';
import React, {useEffect, useState} from 'react';
import USDT from './USDT';
import VFX from './VFX';
import web3 from './web3';
import detectEthereumProvider from '@metamask/detect-provider';
// import console from 'console';
var err = true;
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
const App: React.FC = () => {

    const [usdt_mnt, setMnt] = useState('');
    const [vfx_mnt, setvfxMnt] = useState('')
    const [value, setValue] = useState('');
    const [bvalue, bsetValue] = useState('');
    const [message, setMessage] = useState('');
    const [txhash, setTxhash] = useState('');
    const [total, setTotal] = useState('');
    const [btncolor, setColor] = useState('');
    // var [txhash,setTxhash] = useState('');
    // const [currentAccount, setCurrentAccount] = useState('');

    useEffect(() => {

            const init = async () => {
                    const provider = await detectEthereumProvider();
                    if (! provider) {
                        console.log("Invalid Setting");
                        setMessage("Please Install Metamask!")
                        err = true;
                    } else {
                        try {
                            const txhash = ""
                            const message = "";
                            const accounts = await web3.eth.getAccounts();
                            const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
                            const vfx_mnt = await VFX.methods.balanceOf(accounts[0]).call();
                            const total = await USDT.methods.balanceOf(process.env.REACT_APP_VFX_CONTRACT_ADDRESS).call();
                            var result = parseInt(vfx_mnt) / 100;
                            setMnt(usdt_mnt);
                            setvfxMnt(result.toString());
                            setMessage(message);
                            bsetValue("0");
                            setTxhash(txhash);
                            setTotal(total);
                            setColor("normal");
                            err = false;
                            if (accounts.length === 0) {
                                alert("please select account");
                                window.location.reload();
                            }
                        } catch {
                            err = true;
                            const message = "Connect Metamask!";
                            // window.location.reload();
                            setMnt("0");
                            setvfxMnt("0");
                            setMessage(message);
                        }}
                };
                init();
            },
            []
        );

        const submitForm2 = async (e : any) => {
            e.preventDefault();
            if (value !== "") {
                const accounts = await web3.eth.getAccounts();
                setMessage('Waiting on transaction success...');
                try {
                    // const gas = await USDT.methods.approve(process.env.REACT_APP_USDT_CONTRACT_ADDRESS,value).estimateGas();
                    // err = true;
                    await USDT.methods.approve(process.env.REACT_APP_VFX_CONTRACT_ADDRESS, web3.utils.toWei(value, 'ether')).send({from: accounts[0]});
                    setMessage('You have been approved USDT! #1');
                    await VFX.methods.fundUSDT(web3.utils.toWei(value, 'ether')).send({from: accounts[0]}).on('transactionHash', (hash : any) => { // txhash=0;
                        setTxhash(hash);
                    });
                    const total = await USDT.methods.balanceOf(process.env.REACT_APP_VFX_CONTRACT_ADDRESS).call();
                    const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
                    const vfx_mnt = await VFX.methods.balanceOf(accounts[0]).call();
                    // setTxhash(txhash('ssss'));
                    var result = parseInt(vfx_mnt) / 100;
                    setMnt(usdt_mnt);
                    setvfxMnt(result.toString());
                    setValue("");
                    bsetValue("0");
                    // setMessage('You have been send USDT! #2');
                    setTotal(total);
                    // err=false;
                } catch {
                    setMessage('Please input only numberical value');
                    // err=false;
                }} else {
                // err=false;
                // alert("Cannot be blank");
                setMessage('Cannot be blank!');
            }
        };


        function calculate(e : any) {
            e.preventDefault()
              if (rx_live.test(e.target.value)){
            var temp = e.target.value;
            setValue(e.target.value);
            if (temp !== "") {
                bsetValue(temp);
            } else {
                bsetValue("0");
            }
          }
            // console.log(value);
        }
        return (

            <div className="min-h-screen bg-cover	bg-opacity-10 flex flex-col justify-center bg-no-repeat w-full"
                style={
                    {backgroundImage: `url("https://i.pinimg.com/originals/f1/dd/40/f1dd40d36b17542578727c3d6e863903.jpg")`}
            }>
                <div className="text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden mt-2 text-center">
                    BUY VFX TOKEN
                </div>
                <form onSubmit={submitForm2}>
                    <div className="max-w-md w-full mx-auto mt-4 bg-blue-700 p-8 border border-blue-300 rounded-lg">
                        <div className="max-w-md w-full mx-auto mt-4 bg-blue-900 p-8 border-2 border-blue-900 rounded-lg hover:border-green-500">
                            <div className="mt-2 mb-3 pt-0 flex">
                            <div className="rounded-full w-1/6 rounded-md text-white text-center bg-blue-900 shadow-lg border py-3"><p>USDT</p></div>
                                <input type="text" placeholder="0.00"  inputMode="decimal" autoComplete="off" autoCorrect="off" pattern="^[0-9]*[.,]?[0-9]*$" className="text-2xl w-5/6 bg-blue-900 text-right px-4 py-2  rounded-lg text-green-400 focus:outline-none focus:border-green-500"
                                    value={value}
                                    onChange={calculate}/>
                            </div>
                            <div className="-mt-2">
                            <label className="text-sm front-bold">Balance:<span className="front-bold text-green-400 mt-2 text-sm"> {web3.utils.fromWei(usdt_mnt, 'ether')} </span> USDT</label>
                        </div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-3/12 sm:w-2/12 px-4 border-none mt-2 ">
                                <img src="https://upload.wikimedia.org/wikipedia/en/f/f1/Down_Arrow_Icon.png" alt="..." className=" rounded max-w-full h-auto align-middle border-none"/>
                            </div>
                        </div>
                        <div className="max-w-md w-full mx-auto mt-2 bg-blue-900 p-8 border-2 border-blue-900 rounded-lg hover:border-green-500">
                        <div className="mt-2 mb-3 pt-0 flex">
                          <div className="w-1/6 rounded-full text-white text-center bg-blue-900 shadow-lg border py-3"><p>VFX</p></div>
                                <input type="text" placeholder="0.00"  inputMode="decimal" autoComplete="off" autoCorrect="off" pattern="^[0-9]*[.,]?[0-9]*$" className="text-2xl w-5/6 bg-blue-900 text-right px-4 py-2  rounded-lg text-green-400 focus:outline-none focus:border-green-500"
                                    value={value}
                                    onChange={calculate}/>
                            </div>
                            <div className="-mt-2">
                            <label className="text-sm front-bold">Balance:<span className="front-bold text-green-400 mt-2 text-sm"> {vfx_mnt} </span> VFX</label>
                        </div>
                        </div>
                        <button disabled={err}
                            className={
                                `${
                                    btncolor === 'normal' ? 'bg-blue-500' : 'bg-gray-600'
                                } ${
                                    btncolor === 'normal' ? 'hover:bg-red-700' : 'hover:bg-gray-600'
                                } w-full py-2 px-4 rounded-md text-white text-sm mt-7 shadow transition ease-in duration-700 transform hover:-translate-y-1 hover:scale-110`
                        }>Buy Token</button>
                    </div>
                </form>
                <div className="text-3xl front-bold text-red-500 text-center">
                    {message} </div>
                <div className="mt-10">
                    <p className="ml-3">You have <span className="front-bold text-green-400 mt-2">{web3.utils.fromWei(usdt_mnt, 'ether')} </span>USDT</p>
                    <p className="ml-3">You have VFX Token <span className="front-bold text-green-400 mt-2"> {vfx_mnt} </span>Tokens</p>
                    <p className="ml-3">You are buying <span className="front-bold text-green-400 mt-2">{bvalue}</span> Tokens</p>
                    <p className="ml-3">VFX total bought <span className="front-bold text-green-400 mt-2">{web3.utils.fromWei(total, 'ether')}</span> Tokens</p>
                    <p className="ml-3">Your hash is <span className="front-bold text-green-400 mt-2">{txhash}</span></p>
                </div>
            </div>
        );
    };
    export default App;
