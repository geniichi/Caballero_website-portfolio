import './StudySmart.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import StudySmart1 from '../../../../images/studySmartPage/1.png';
import StudySmart2 from '../../../../images/studySmartPage/2.png';
import StudySmart3 from '../../../../images/studySmartPage/3.png';
import StudySmart4 from '../../../../images/studySmartPage/4.png';
import StudySmart5 from '../../../../images/studySmartPage/5.png';
import StudySmart6 from '../../../../images/studySmartPage/6.png';
import StudySmart7 from '../../../../images/studySmartPage/7.png';
import StudySmart8 from '../../../../images/studySmartPage/8.png';
import StudySmart9 from '../../../../images/studySmartPage/9.png';
import StudySmart10 from '../../../../images/studySmartPage/10.png';
const StudySmart = () => {


  return (
    <div id="StudySmart-container" className="d-flex justify-content-center align-items-center">
      <div className="container" id="StudySmart-text">
        <h3>StudySmart</h3>
        <p>
          StudySmart&trade; is a project i made that utlizes nodejs. It is an online platform that provides high-quality,
          affordable online courses for learners of all ages and backgrounds. The platform supposedly is dedicated to helping
          students achieve their academic goals and unlocking their full potential through education. I worked on this for 4
          days with my knowledge on frontend tools such as basc html, css, and javascript
        </p>
        <div>
            <p className="m-0"><strong>Duration:</strong> 4 days</p>
            <p className="m-0"><strong>Livelink:</strong> https://geniichi.github.io/</p>
            <p className="m-0"><strong>Github code:</strong> https://github.com/geniichi/StudySmart-website.git</p>
        </div>
      </div>
      <Swiper
        id="StudySmart-swiperSlide"
        modules={[Autoplay, Navigation, Pagination, A11y]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart1})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart2})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart3})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart4})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart5})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart6})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart7})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart8})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart9})`}}/>
        <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${StudySmart10})`}}/>
      </Swiper>
    </div>
  )
}

export default StudySmart
