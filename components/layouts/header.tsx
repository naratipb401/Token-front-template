import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <div className="logo-wrapper">
        <div className="hamberger-icon">
          <Image
            src="/hamberger_menu.png"
            alt="Hamburger menu"
            width={45}
            height={12}
          />
        </div>

        <Image src="/logo.png" alt="logo" width={165} height={21} />
      </div>
    </header>
  )
}

export default Header
