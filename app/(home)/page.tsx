import Banner from './_components/Banner/index';
import Aboutus from './_components/Aboutus/index';
import Dedicated from './_components/Dedicated/index';
import Digital from './_components/Digital/index';
import Beliefs from './_components/Beliefs/index';
import Wework from './_components/Wework/index';
import Ourteam from './_components/Ourteam/index';
import Featured from './_components/Featured/index';
import Manage from './_components/Manage/index';
import FAQ from './_components/FAQ/index';
import Testimonials from './_components/Testimonials/index';
import Articles from './_components/Articles/index';
import Joinus from './_components/Joinus/index';
import Insta from './_components/Insta/index';


export default function Home() {
  return (
    <main>
      <Banner />
      <Aboutus />
      <Dedicated />
      <Digital />
      <Beliefs />
      <Wework />
      <Ourteam />
      <Featured />
      {/* <Manage /> */}
      <FAQ />
      <Testimonials />
      {/* <Articles /> */}
      <Joinus />
      {/* <Insta /> */}
    </main>
  )
}
