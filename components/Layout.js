import Head from "next/head";
import moment from "moment/moment";
import Link from "next/link";


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
    
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout

