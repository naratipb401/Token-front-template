import './App.css';
import React, {useEffect, useState} from 'react';
import USDT from './USDT';
import VFX from './VFX';
import web3 from './web3';
//import console from 'console';
var err = false;
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

                    try {
                        const txhash = ""
                        const message = "";
                        const accounts = await web3.eth.getAccounts();
                        const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
                        const vfx_mnt = await VFX.methods.balanceOf(accounts[0]).call();
                        const total = await USDT.methods.balanceOf(process.env.REACT_APP_VFX_CONTRACT_ADDRESS).call();
                        var result=parseInt(vfx_mnt)/100;
                        setMnt(usdt_mnt);
                        setvfxMnt(result.toString());
                        setMessage(message);
                        bsetValue("0");
                        setTxhash(txhash);
                        setTotal(total);
                        setColor("normal");
                        err = false;
                    } catch {
                        err = true;

                        const message = "Connect Metamask!";
                        setMnt("0");
                        setvfxMnt("0");
                        setMessage(message);
                    }};
                init();
            },
            []
        );

        const submitForm2 = async (e : any) => {
            e.preventDefault();
            if (value !== "") {
                const accounts = await web3.eth.getAccounts();
                setMessage('Waiting on transaction success...');
                try { // const gas = await USDT.methods.approve(process.env.REACT_APP_USDT_CONTRACT_ADDRESS,value).estimateGas();
                    //err = true;
                    await USDT.methods.approve(process.env.REACT_APP_VFX_CONTRACT_ADDRESS, web3.utils.toWei(value, 'ether')).send({from: accounts[0]});
                    setMessage('You have been approved USDT! #1');
                    await VFX.methods.fundUSDT(web3.utils.toWei(value, 'ether')).send({from: accounts[0]}).on('status', (hash:any)=>{
                      //txhash=0;
                      console.log(hash);
                      setTxhash(hash);
                    }).on('status',(status:any)=>{
                      console.log(status)
                      setMessage(status);
                    });
                    const total = await USDT.methods.balanceOf(process.env.REACT_APP_VFX_CONTRACT_ADDRESS).call();
                    const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
                    const vfx_mnt = await VFX.methods.balanceOf(accounts[0]).call();
                    // setTxhash(txhash('ssss'));
                    var result=parseInt(vfx_mnt)/100;
                    setMnt(usdt_mnt);
                    setvfxMnt(result.toString());
                    setValue("");
                    bsetValue("0");
                    //setMessage('You have been send USDT! #2');
                    setTotal(total);
                    //err=false;
                } catch {
                    setMessage('Please input only numberical value');
                    //err=false;
                }} else {
                  //err=false;
                alert("Cannot be blank");
                setMessage('Cannot be blank!');
            }
        };
        function calculate(e:any){
            e.preventDefault()
            var temp = e.target.value;
            setValue(e.target.value);
            if(temp!==""){
            bsetValue(temp);
            }else{
              bsetValue("0");
            }
          
           // console.log(value);
        }
        return (

            <div className="min-h-screen bg-cover	bg-opacity-10 flex flex-col justify-center bg-no-repeat w-full"  style={{ 
              backgroundImage: `url("https://i.pinimg.com/originals/f1/dd/40/f1dd40d36b17542578727c3d6e863903.jpg")` 
            }}>
                <div className="text-3xl front-bold text-gray-100 overflow-ellipsis overflow-hidden mt-2 text-center">
                    BUY VFX TOKEN
                </div>
                <form onSubmit={submitForm2}>
                    <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                        <div className="mb-3 pt-0">
                            <input type="text" placeholder="USDT Amount" className="w-full text-center px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
                                value={value}
                                onChange={calculate}/>
                        </div>
                        <button disabled={err}
                            className={`${btncolor==='normal' ? 'bg-blue-500' : 'bg-gray-600'} ${btncolor==='normal' ? 'hover:bg-red-700' : 'hover:bg-gray-600'} w-full py-2 px-4 rounded-md text-white text-sm`}>Buy Token</button>
                    </div>
                </form>
                <div className="text-3xl front-bold text-red-500 text-center"> {message} </div>
                <div className="mt-16">
                  
                <p className="ml-3">You have <span className="front-bold text-green-400 mt-2">{web3.utils.fromWei(usdt_mnt, 'ether')} </span>USDT</p>
                <p className="ml-3">You have VFX Token <span className="front-bold text-green-400 mt-2">{vfx_mnt} </span>Tokens</p>
                <p className="ml-3">You are buying <span className="front-bold text-green-400 mt-2">{bvalue}</span> Tokens</p>
                <p className="ml-3">VFX total brough <span className="front-bold text-green-400 mt-2">{web3.utils.fromWei(total, 'ether')}</span> Tokens</p>
                <p className="ml-3">Your hash is <span className="front-bold text-green-400 mt-2">{txhash}</span></p>
                </div>
            </div>
        );
    };
    export default App;
