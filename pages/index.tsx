import type { NextPage } from 'next'
import Header from '../components/layouts/header'
import BuyTokenBox from '../components/buyTokenBox'
import styles from '../styles/pages/home.module.scss'
import web3 from '../components/token/web3';
import React, {useEffect, useState} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import USDT from '../components/token/USDT';
import VFX from '../components/token/VFX';
//require('dotenv').config();
//import web3 from './web3';
//import MetamaskOnboarding from '@metamask/onboarding'
//import Web3 from 'web3';
var err = false;
const Home: NextPage = () => {
     //console.log(web3.version)
     const [usdt_mnt, setMnt] = useState(0);
     const [vfx_mnt, setvfxMnt] = useState('')
  useEffect(() => {
    

    //const [value, setValue] = useState('');
    //const [bvalue, bsetValue] = useState('');
    //const [message, setMessage] = useState('');
    //const [txhash, setTxhash] = useState('');
    //const [total, setTotal] = useState('');
    //const [btncolor, setColor] = useState('');

  const init = async () => {
    try{
    const accounts = await web3.eth.getAccounts();
    const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
    const vfx = await VFX.methods.balanceOf(accounts[0]).call();
    setvfxMnt(vfx);
    setMnt(usdt_mnt);
    }catch{


    }
  
   //console.log(web3)
         };
        init();
    },
    []
);
const summited = async (e:number) =>{
    console.log(e)
    let buy_amt = e*(10**6);
    const accounts = await web3.eth.getAccounts();
    await USDT.methods.approve("0xbE8a33128Bef7047f7d9c89c596664bbB20fDd86", buy_amt).send({from: accounts[0]});
    await VFX.methods.fundUSDT(buy_amt).send({from: accounts[0]}).on('transactionHash', (hash : any) => { // txhash=0;
      console.log(hash);
  });
    const usdt_mnt = await USDT.methods.balanceOf(accounts[0]).call();
    const vfx_mnt = await VFX.methods.balanceOf(accounts[0]).call();
    setMnt(usdt_mnt);
    setvfxMnt(vfx_mnt);
     
    //const data = new FormData(e.target);
    //console.log(String(data.get('usdt')));
}
  return (
    <div className="container homepage">
      <Header />
      <main>
        <div className="grid -d-6-6 -m-1">
          <div className={styles.info}>
            <h1 className={styles.title}>VENTUR EEFFECT</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
          </div>
          <BuyTokenBox
            youPay={usdt_mnt}
            youPayCurrentRate={usdt_mnt}
            usdt={0}
            usdtEstimate={0}
            youReceive={0}
            vfx={1}
            usdtPerVFX={0}
            vfxTotal={Number(vfx_mnt)}
            summited={summited}
          />
        </div>
      </main>
      <div className="circle small"></div>
      <div className="circle large"></div>
    </div>
  )
}

export default Home
