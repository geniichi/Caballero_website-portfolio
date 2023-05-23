import './TitanMinds.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y, EffectCreative } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getStorage, ref as imageRef, listAll, getDownloadURL } from "firebase/storage";

const TitanMinds = ({ dataLoaded, setNumberOfDataLoaded }) => {

    //validate if data is properly loaded
    const [titanMindsImagesLoaded, setTitanMindsImagesLoaded] = useState(false);
    const [titanMindsTextLoaded, settitanMindsTextLoaded] =useState(false);

    useEffect(() => {
        if(titanMindsImagesLoaded && titanMindsTextLoaded) {
            setNumberOfDataLoaded(prevState => prevState + 1);
        }
    }, [titanMindsImagesLoaded, titanMindsTextLoaded]);

    // get text from real-time database in firebase
    const [dataProjectsTitanMindsText,setDataProjectstitanMindsText] = useState({});
    const [dataProjectsTitanMindsDetails,setDataProjectstitanMindsDetails] = useState({});

    useEffect(() => {
        onValue(firebaseRef(Db, 'project-titanminds-text'), (snapshot) => {
            if(snapshot.val() !== null) {
              setDataProjectstitanMindsText({...snapshot.val()})
            } else {
                setDataProjectstitanMindsText({});
            }
        });

        onValue(firebaseRef(Db, 'project-titanminds-details'), (snapshot) => {
            if(snapshot.val() !== null) {
              setDataProjectstitanMindsDetails({...snapshot.val()})
            } else {
                setDataProjectstitanMindsDetails({});
            }
        });
        settitanMindsTextLoaded(true)
        return () => {
          setDataProjectstitanMindsText({})
          setDataProjectstitanMindsDetails({})
        }
    }, [])

    // retrieve multiple images from firebase storage in firebase
    const [titanMindsImages, setTitanMindsImages] = useState([]);

    const storage = getStorage();
    const titanMindsImagesRef = imageRef(storage, 'project-titanminds--images');

    useEffect(() => {
      listAll(titanMindsImagesRef)
        .then((res) => {
          const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
          Promise.all(promises).then((urls) => {
            setTitanMindsImages(urls);
          });
        })
        .catch((error) => {
          console.log(error);
        });
        setTitanMindsImagesLoaded(true)
    }, []);

    //transition in view
    const {ref, inView} = useInView();
    const titanMindsTextAnimation = useAnimation();
    const titanMindsImageAnimation = useAnimation();

    useEffect(() => {
      if(inView && dataLoaded){
        titanMindsTextAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'tween', duration: 0.5, bounce: 0.3
          }
        })
        titanMindsImageAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
      } else {
        titanMindsTextAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
        titanMindsImageAnimation.start({
          opacity: 0,
          x: "100%",
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
      <div id="TitanMinds-container" className="d-flex justify-content-between align-items-center">
        <motion.div
          ref={ref}
          animate={titanMindsImageAnimation}
          id="TitanMinds-swiperSlide-container"
        >
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
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {Array.isArray(titanMindsImages) && titanMindsImages.map((url) => (
                <SwiperSlide className='TitanMinds-carousel' style={{backgroundImage: `url(${url})`}}/>
            ))}
          </Swiper>
        </motion.div>
        <motion.div
            id="TitanMinds-text"
            ref={ref}
            animate={titanMindsTextAnimation}
        >
          <h3>TitanMinds</h3>
          <p>
            {Object.keys(dataProjectsTitanMindsText).map((id) => {
              return (
                  <p>{dataProjectsTitanMindsText[id].content}</p>
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
        </motion.div>
      </div>
    )
}

export default TitanMinds
