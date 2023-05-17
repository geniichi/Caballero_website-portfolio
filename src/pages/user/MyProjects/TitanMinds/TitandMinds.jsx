import './TitanMinds.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import StudySmart1 from '../../../../images/titanMindsPage/1.png';
import StudySmart2 from '../../../../images/titanMindsPage/2.png';
import StudySmart3 from '../../../../images/titanMindsPage/3.png';
import StudySmart4 from '../../../../images/titanMindsPage/4.png';
import StudySmart5 from '../../../../images/titanMindsPage/5.png';
import StudySmart6 from '../../../../images/titanMindsPage/6.png';
import StudySmart7 from '../../../../images/titanMindsPage/7.png';
import StudySmart8 from '../../../../images/titanMindsPage/8.png';
import StudySmart9 from '../../../../images/titanMindsPage/9.png';
import StudySmart10 from '../../../../images/titanMindsPage/10.png';
import StudySmart11 from '../../../../images/titanMindsPage/11.png';
const TitanMinds = () => {


  return (
    <div id="TitanMinds-container" className="d-flex justify-content-center align-items-center">
      <Swiper
        id="TitanMinds-swiperSlide"
        modules={[Autoplay, Navigation, Pagination, A11y]}
        loop={true}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart1})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart2})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart3})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart4})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart5})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart6})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart7})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart8})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart9})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart10})`}}/>
        <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${StudySmart11})`}}/>
      </Swiper>
      <div className="container" id="TitanMinds-text">
        <h3>TitanMinds</h3>
        <p>
            TitanMinds&trade; is an online library that offers customizable reading experiences, affordable subscription plans, and a
            vast collection of books in various formats. We curate books for the best reading experience and offer the option
            to track progress and set goals. Our mission is to inspire readers to explore the world of books and gain knowledge.
        </p>
        <div>
            <p className="m-0"><strong>Duration:</strong> 7 days</p>
            <p className="m-0"><strong>Livelink:</strong> https://geniichi.github.io/</p>
            <p className="m-0"><strong>Github code:</strong> https://github.com/geniichi/TitanMinds-website.git</p>
        </div>
      </div>
    </div>
  )
}

export default TitanMinds
