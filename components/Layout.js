import Head from "next/head";
import moment from "moment/moment";

import Blur from './Blur'
import Footer from "./Footer";


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

moment.locale('zh-cn', {
  weekdays: '周日_周一_周二_周三_周四_周五_周六'.split('_')
})

const Layout = ({ children, title }) => {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
      </Head>
      <Blur />
    
      <div className="max-w-[40rem] mx-auto px-6 md:px-0 sm:px-0 py-12 md:py-16 sm:py-24 slide-enter-content">
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout

