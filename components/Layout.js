import Head from "next/head";
import moment from "moment/moment";
import Link from "next/link";
import Navbar from "./Navbar";


function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

moment.locale('zh-cn', {
  weekdays: '周日_周一_周二_周三_周四_周五_周六'.split('_')
})

const Layout = ({ children, title }) => {
  return (
    <div className="px-4">
      <Head>
        <title>{title}</title>
      </Head>
      
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 sm:px-6">
        {children}
      </div>
    </div >
  )
}

export default Layout

