import './ShiinChat.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y, EffectCreative } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getStorage, ref as imageRef, listAll, getDownloadURL } from "firebase/storage";

const ShiinChat = ({ dataLoaded, setNumberOfDataLoaded }) => {

    //validate if data is properly loaded
    const [shiinChatImagesLoaded, setShiinChatImagesLoaded] = useState(false);
    const [shiinChatTextLoaded, setShiinChatTextLoaded] =useState(false);

      useEffect(() => {
          if(shiinChatImagesLoaded && shiinChatTextLoaded) {
              setNumberOfDataLoaded(prevState => prevState + 1);
          }
      }, [shiinChatImagesLoaded, shiinChatTextLoaded]);

    // get text from real-time database in firebase
    const [dataProjectsShiinChatText,setDataProjectsShiinChatText] = useState({});
    const [dataProjectsShiinChatDetails,setDataProjectsShiinChatDetails] = useState({});

    useEffect(() => {
        onValue(firebaseRef(Db, 'project-shiinchat-text'), (snapshot) => {
            if(snapshot.val() !== null) {
              setDataProjectsShiinChatText({...snapshot.val()})
            } else {
                setDataProjectsShiinChatText({});
            }
        });

        onValue(firebaseRef(Db, 'project-shiinchat-details'), (snapshot) => {
            if(snapshot.val() !== null) {
              setDataProjectsShiinChatDetails({...snapshot.val()})
            } else {
                setDataProjectsShiinChatDetails({});
            }
        });
        setShiinChatTextLoaded(true)
        return () => {
          setDataProjectsShiinChatText({})
          setDataProjectsShiinChatDetails({})
        }
    }, [])

    // retrieve multiple images from firebase storage in firebase
    const [shiinChatImages, setshiinChatImages] = useState([]);

    const storage = getStorage();
    const shiinChatImagesRef = imageRef(storage, 'project-shiinchat--images');

    useEffect(() => {
      listAll(shiinChatImagesRef)
        .then((res) => {
          const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
          Promise.all(promises).then((urls) => {
            setshiinChatImages(urls);
          });
        })
        .catch((error) => {
          console.log(error);
        });
        setShiinChatImagesLoaded(true)
    }, []);

    //transition in view
    const {ref, inView} = useInView();
    const shiinChatTextAnimation = useAnimation();
    const shiinChatImageAnimation = useAnimation();

    useEffect(() => {
      if(inView && dataLoaded){
        shiinChatTextAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'tween', duration: 0.5, bounce: 0.3
          }
        })
        shiinChatImageAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
      } else {
        shiinChatTextAnimation.start({
          opacity: 0,
          x: "100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
        shiinChatImageAnimation.start({
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
      <div id="ShiinChat-container" className="d-flex justify-content-between align-items-center">
        <motion.div
            id="ShiinChat-text"
            ref={ref}
            animate={shiinChatTextAnimation}
        >
          <h3>ShiinChat</h3>
          <p>
            {Object.keys(dataProjectsShiinChatText).map((id) => {
              return (
                  <p>{dataProjectsShiinChatText[id].content}</p>
              );
            })}
          </p>

          <div>
            {Object.keys(dataProjectsShiinChatDetails).map((id, index) => {
              if (index === 0) {
                return (<p key={index} className="m-0"><strong>Duration: </strong>{dataProjectsShiinChatDetails[id].content}</p>)}
              if (index === 1) {
                return (<p key={index} className="m-0"><strong>Livelink: </strong><a className="text-light" href={dataProjectsShiinChatDetails[id].content} target='_blank'>{dataProjectsShiinChatDetails[id].content}</a></p>)}
              if (index === 2) {
                return (<p key={index} className="m-0"><strong>Github code: </strong><a className="text-light" href={dataProjectsShiinChatDetails[id].content} target='_blank'>{dataProjectsShiinChatDetails[id].content}</a></p>)}
            })}
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          animate={shiinChatImageAnimation}
          id="ShiinChat-swiperSlide-container"
        >
          <Swiper
            id="ShiinChat-swiperSlide"
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
            {Array.isArray(shiinChatImages) && shiinChatImages.map((url) => (
                <SwiperSlide className='ShiinChat-carousel' style={{backgroundImage: `url(${url})`}}/>
            ))}
          </Swiper>
        </motion.div>
      </div>
    )
}

export default ShiinChat
