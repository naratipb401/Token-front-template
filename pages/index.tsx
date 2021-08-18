import type { NextPage } from 'next'
import Header from '../components/layouts/header'
import BuyTokenBox from '../components/buyTokenBox'
import styles from '../styles/pages/home.module.scss'

const Home: NextPage = () => {
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
            youPay={0}
            youPayCurrentRate={0}
            usdt={0}
            usdtEstimate={0}
            youReceive={0}
            vfx={0}
            usdtPerVFX={0}
            vfxTotal={0}
          />
        </div>
      </main>
      <div className="circle small"></div>
      <div className="circle large"></div>
    </div>
  )
}

export default Home
