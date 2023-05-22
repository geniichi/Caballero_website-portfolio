import './StudySmart.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y, EffectCreative } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getStorage, ref as imageRef, listAll, getDownloadURL } from "firebase/storage";

const StudySmart = ({ dataLoaded, setNumberOfDataLoaded }) => {

  //validate if data is properly loaded
  const [studySmartImagesLoaded, setstudySmartImagesLoaded] = useState(false);
  const [studySmartTextLoaded, setstudySmartTextLoaded] =useState(false);

    useEffect(() => {
        if(studySmartImagesLoaded && studySmartTextLoaded) {
            setNumberOfDataLoaded(prevState => prevState + 1);
        }
    }, [studySmartImagesLoaded, studySmartTextLoaded]);

  // get text from real-time database in firebase
  const [dataProjectsStudySmartText,setDataProjectsStudySmartText] = useState({});
  const [dataProjectsStudySmartDetails,setDataProjectsStudySmartDetails] = useState({});

  useEffect(() => {
      onValue(firebaseRef(Db, 'project-studysmart-text'), (snapshot) => {
          if(snapshot.val() !== null) {
            setDataProjectsStudySmartText({...snapshot.val()})
          } else {
              setDataProjectsStudySmartText({});
          }
      });

      onValue(firebaseRef(Db, 'project-studysmart-details'), (snapshot) => {
          if(snapshot.val() !== null) {
            setDataProjectsStudySmartDetails({...snapshot.val()})
          } else {
              setDataProjectsStudySmartDetails({});
          }
      });
      setstudySmartTextLoaded(true)
      return () => {
        setDataProjectsStudySmartText({})
        setDataProjectsStudySmartDetails({})
      }
  }, [])

  // retrieve multiple images from firebase storage in firebase
  const [studySmartImages, setStudySmartImages] = useState([]);

  const storage = getStorage();
  const studySmartImagesRef = imageRef(storage, 'project-studysmart--images');

  useEffect(() => {
    listAll(studySmartImagesRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
        Promise.all(promises).then((urls) => {
          setStudySmartImages(urls);
        });
      })
      .catch((error) => {
        console.log(error);
      });
      setstudySmartImagesLoaded(true)
  }, []);

  //transition in view
  const {ref, inView} = useInView();
  const studySmartTextAnimation = useAnimation();
  const studySmartImageAnimation = useAnimation();

  useEffect(() => {
    if(inView && dataLoaded){
      studySmartTextAnimation.start({
        opacity: 1,
        x: "0%",
        transition: {
          type: 'tween', duration: 0.5, bounce: 0.3
        }
      })
      studySmartImageAnimation.start({
        opacity: 1,
        x: "0%",
        transition: {
          type: 'spring', duration: 1, bounce: 0.3
        }
      })
    } else {
      studySmartTextAnimation.start({
        opacity: 0,
        x: "100%",
        transition: {
          type: 'ease-out', duration: 0.001
        }
      })
      studySmartImageAnimation.start({
        opacity: 0,
        x: "-100%",
        transition: {
          type: 'ease-out', duration: 0.001
        }
      })
    }
  }, [inView, dataLoaded]);

  if (dataLoaded === false) {
      return <></>;
  }


  return (
    <div id="StudySmart-container" className="d-flex justify-content-between align-items-center">
      <motion.div
          id="StudySmart-text"
          ref={ref}
          animate={studySmartTextAnimation}
      >
        <h3>StudySmart</h3>
        <p>
          {Object.keys(dataProjectsStudySmartText).map((id) => {
            return (
                <p>{dataProjectsStudySmartText[id].content}</p>
            );
          })}
        </p>

        <div>
          {Object.keys(dataProjectsStudySmartDetails).map((id, index) => {
            if (index === 0) {
              return (<p key={index} className="m-0"><strong>Duration: </strong>{dataProjectsStudySmartDetails[id].content}</p>)}
            if (index === 1) {
              return (<p key={index} className="m-0"><strong>Livelink: </strong><a className="text-light" href={dataProjectsStudySmartDetails[id].content} target='_blank'>{dataProjectsStudySmartDetails[id].content}</a></p>)}
            if (index === 2) {
              return (<p key={index} className="m-0"><strong>Github code: </strong><a className="text-light" href={dataProjectsStudySmartDetails[id].content} target='_blank'>{dataProjectsStudySmartDetails[id].content}</a></p>)}
          })}
        </div>
      </motion.div>
      <motion.div
        ref={ref}
        animate={studySmartImageAnimation}
        id="StudySmart-swiperSlide-container"
      >
        <Swiper
          id="StudySmart-swiperSlide"
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
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {Array.isArray(studySmartImages) && studySmartImages.map((url) => (
              <SwiperSlide className='StudySmart-carousel' style={{backgroundImage: `url(${url})`}}/>
          ))}
        </Swiper>
      </motion.div>

    </div>
  )
}

export default StudySmart
