import Image from 'next/image'
import buyTokenBoxProps from './type'
import { useState, useEffect } from 'react'

const buyTokenBox = (props: buyTokenBoxProps) => {
  const [usdtvalue, setusdtvalue] = useState(0)
  const [vfxvalue, setvfxvalue] = useState(0)
  const onclickHandlere = (e: any) => {
    //console.log(e.target.id);
    const selected_percent = e.target.id
    switch (selected_percent) {
      case '1':
        setusdtvalue(Math.floor(0.25 * props.youPay))
        setvfxvalue(Math.floor(0.25 * props.youPay))
        break
      case '2':
        setusdtvalue(Math.floor(0.5 * props.youPay))
        setvfxvalue(Math.floor(0.5 * props.youPay))

        break
      case '3':
        setusdtvalue(Math.floor(0.75 * props.youPay))
        setvfxvalue(Math.floor(0.75 * props.youPay))
        break
      case '4':
        setusdtvalue(Math.floor(props.youPay))
        setvfxvalue(Math.floor(props.youPay))

        break
    }
  }

  useEffect(() => {}, [usdtvalue])

  return (
    <div className="buytoken-wrapper-position">
      <div className="buytokenwrapper">
        <div className="flex end small-row-gap">
          <small className="primary-font">USDT Balance</small>
        </div>
        <div className="flex space-between small-row-gap">
          <span className="title">YOU PAY</span>
          <span className="number-primary-color">{props.youPay / 1000000}</span>
        </div>
        <div className="flex end small-row-gap">
          <small className="soft">({props.youPayCurrentRate}$)</small>
        </div>
        <div className="flex align-center space-between gray-box">
          <span className="title-small primary-font">USDT</span>
          <input
            type="number"
            id="usdt"
            className="number-primary-color bolder"
            onChange={(e) => setusdtvalue(parseFloat(e.target.value))}
            value={usdtvalue || 0}
          />
        </div>
        <div className="flex end">
          <small className="normal-font-size soft">
            (estimate {props.usdtEstimate}$)
          </small>
        </div>
        <div className="flex space-between">
          <div className="percent-box" id="1" onClick={onclickHandlere}>
            25%
          </div>
          <div className="percent-box" id="2" onClick={onclickHandlere}>
            50%
          </div>
          <div className="percent-box" id="3" onClick={onclickHandlere}>
            75%
          </div>
          <div className="percent-box" id="4" onClick={onclickHandlere}>
            100%
          </div>
        </div>
        <div className="line"></div>
        <div className="flex justify-center medium-row-gap">
          <Image src="/arrow_down.svg" width="24" height="27" />
        </div>
        <div className="flex end">
          <small className="primary-font">VFX Balance</small>
        </div>
        <div className="flex space-between">
          <span className="title">YOU RECEIVE</span>
          <span className="number-primary-color">
            {Math.floor(vfxvalue / 1000000)}
          </span>
        </div>
        <div className="flex space-between large-row-gap">
          <span className="title-small black soft">
            1 USDT PER {props.vfx} VFX
          </span>
          <span className="title-small black soft">({props.usdtPerVFX}$)</span>
        </div>
        <div className="flex end">
          <small className="primary-font">TOKEN</small>
        </div>
        <div className="flex align-center space-between large-row-gap -m-no-gap">
          <span className="title-small primary-font">VFX total bought</span>
          <span className="number-primary-color">{props.vfxTotal}</span>
        </div>
        <div className="hidden-m">
          <button
            onClick={() => props.summited(usdtvalue)}
            className="primary-button medium-row-gap"
          >
            BUY TOKEN
          </button>
          <div className="flex space-between">
            <small className="gray-text primary-font">Read Agreement</small>
            <small className="gray-text primary-font">VFX 2.1</small>
          </div>
        </div>
      </div>
      <div className="show-m -m-mobile-button">
        <button
          onClick={() => props.summited(usdtvalue)}
          className="primary-button"
        >
          BUY VFX
        </button>
        <div className="flex space-between">
          <small className="gray-text primary-font">Read Agreement</small>
          <small className="gray-text primary-font">VFX 2.1</small>
        </div>
      </div>
    </div>
  )
}

export default buyTokenBox
