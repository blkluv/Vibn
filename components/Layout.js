import Head from "next/head";
import moment from "moment/moment";


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Layout = ({ children, title }) => {
  return (
    <div className="px-4">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-6xl mx-auto mt-4 sm:mt-16 mb-16 border border-teal-800">
        <div className="border-b border-b-teal-800 px-4 sm:px-8 py-4">
          <div className="text-sm sm:text-base flex flex-row justify-between">
            <div>
              耿越
            </div>
            <div>
              {moment().format('dddd')}, {moment().format('YYYY年MM月DD日')}
            </div>
            <div>
              <span className="hidden sm:block">Yantai No.1 Middle School</span>
              <span className="block sm:hidden">YTYZ</span>
            </div>
          </div>
        </div>
        <div className="text-sm sm:text-base px-4 sm:px-8 py-8">
          {children}
        </div>
        <p className="text-xs sm:text-sm px-4 sm:px-8 mb-6 opacity-75">[免责声明]：本世界观纯属虚构，所用图片均来自网络，如有雷同，<span className="text-teal-600">纯属巧合</span>。</p>
        <div className="text-center text-sm sm:text-base border-t border-t-teal-800 px-4 sm:px-8 py-4">
          <p>中国是个大国，上面居住着许多中国人</p>
          <p>— 夏尔·戴高乐</p>
        </div>
      </div>

    </div >
  )
}

export default Layout

