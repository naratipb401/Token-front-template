import Image from 'next/image'
import buyTokenBoxProps from './type'

const buyTokenBox = (props: buyTokenBoxProps) => {
  return (
    <div className="buytoken-wrapper-position">
      <div className="buytokenwrapper">
        <div className="flex end small-row-gap">
          <small className="primary-font">USDT Balance</small>
        </div>
        <div className="flex space-between small-row-gap">
          <span className="title">YOU PAY</span>
          <span className="number-primary-color">{props.youPay}</span>
        </div>
        <div className="flex end small-row-gap">
          <small className="soft">({props.youPayCurrentRate}$)</small>
        </div>
        <div className="flex align-center space-between gray-box">
          <span className="title-small primary-font">USDT</span>
          <span className="number-primary-color bolder">{props.usdt}</span>
        </div>
        <div className="flex end">
          <small className="normal-font-size soft">
            (estimate {props.usdtEstimate}$)
          </small>
        </div>
        <div className="flex space-between">
          <div className="percent-box">25%</div>
          <div className="percent-box">50%</div>
          <div className="percent-box">75%</div>
          <div className="percent-box">100%</div>
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
          <span className="number-primary-color">{props.youReceive}</span>
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
          <button className="primary-button medium-row-gap">BUY TOKEN</button>
          <div className="flex space-between">
            <small className="gray-text primary-font">Read Agreement</small>
            <small className="gray-text primary-font">VFX 2.1</small>
          </div>
        </div>
      </div>
      <div className="show-m -m-mobile-button">
        <button className="primary-button">BUY VFX</button>
        <div className="flex space-between">
          <small className="gray-text primary-font">Read Agreement</small>
          <small className="gray-text primary-font">VFX 2.1</small>
        </div>
      </div>
    </div>
  )
}

export default buyTokenBox
