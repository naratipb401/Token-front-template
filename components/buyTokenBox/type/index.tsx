interface buyTokenBoxProps {
  youPay: number
  youPayCurrentRate: number
  usdt: number
  usdtEstimate: number
  youReceive: number
  vfx: number
  usdtPerVFX: number
  vfxTotal: number
  summited: (e:number)=>void
}

export default buyTokenBoxProps
