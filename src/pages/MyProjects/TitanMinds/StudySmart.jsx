import './TitanMinds.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y, EffectCreative } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getStorage, ref as imageRef, listAll, getDownloadURL } from "firebase/storage";

const TitanMinds = () => {

  // get text from real-time databse in firebase
  const [dataProjectsTitanMindsText,setDataProjectsTitanMindsText] = useState({});
  const [dataProjectsTitanMindsDetails,setDataProjectsTitanMindsDetails] = useState({});

  useEffect(() => {
      onValue(firebaseRef(Db, 'project-TitanMinds-text'), (snapshot) => {
          if(snapshot.val() !== null) {
            setDataProjectsTitanMindsText({...snapshot.val()})
          } else {
              setDataProjectsTitanMindsText({});
          }
          // setAboutMeTextLoaded(true);
      });

      onValue(firebaseRef(Db, 'project-TitanMinds-details'), (snapshot) => {
          if(snapshot.val() !== null) {
            setDataProjectsTitanMindsDetails({...snapshot.val()})
          } else {
              setDataProjectsTitanMindsDetails({});
          }
          // setAboutMeTextLoaded(true);
      });

      return () => {
        setDataProjectsTitanMindsText({})
        setDataProjectsTitanMindsDetails({})
      }
  }, [])

  // retrieve multiple images from firebase storage in firebase
  const [TitanMindsImages, setTitanMindsImages] = useState([]);

  const storage = getStorage();
  const TitanMindsImagesRef = imageRef(storage, 'project-TitanMinds--images');

  useEffect(() => {
    listAll(TitanMindsImagesRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
        Promise.all(promises).then((urls) => {
          setTitanMindsImages(urls);
        });
      })
      .catch((error) => {
        console.log(error);
      });
      //setLoaded(true)
  }, []);


  // if (dataLoaded === false) {
  //     return <></>;
  // }



  return (
    <div id="TitanMinds-container" className="d-flex justify-content-between align-items-center">
      <div id="TitanMinds-text">
        <h3>TitanMinds</h3>
        <p>
          {Object.keys(dataProjectsTitanMindsText).map((id) => {
            return (
                <motion.p
                  // animate={welcomeTextAnimation}
                  // ref={ref}
                  // key={id}
                >
                  {dataProjectsTitanMindsText[id].content}
                </motion.p>
            );
          })}
        </p>

        <div>
          {Object.keys(dataProjectsTitanMindsDetails).map((id, index) => {
            if (index === 0) {
              return (<p key={index} className="m-0"><strong>Duration: </strong>{dataProjectsTitanMindsDetails[id].content}</p>)}
            if (index === 1) {
              return (<p key={index} className="m-0"><strong>Livelink: </strong><a className="text-light" href={dataProjectsTitanMindsDetails[id].content} target='_blank'>{dataProjectsTitanMindsDetails[id].content}</a></p>)}
            if (index === 2) {
              return (<p key={index} className="m-0"><strong>Github code: </strong><a className="text-light" href={dataProjectsTitanMindsDetails[id].content} target='_blank'>{dataProjectsTitanMindsDetails[id].content}</a></p>)}
          })}
        </div>
      </div>
      <Swiper
        id="TitanMinds-swiperSlide"
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[Autoplay, Navigation, Pagination, A11y, EffectCreative]}
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
        {Array.isArray(TitanMindsImages) && TitanMindsImages.map((url) => (
            <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${url})`}}/>
        ))}
      </Swiper>
    </div>
  )
}

export default TitanMinds
