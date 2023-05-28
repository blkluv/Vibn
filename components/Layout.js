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
    <div className="bg-[#EEE8AA] min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="max-w-6xl mx-auto px-6 md:px-10 sm:px-0 py-16 md:py-18 sm:py-24 slide-enter-content">
        {children}
      </div>
      
    </div>
  )
}

export default Layout

