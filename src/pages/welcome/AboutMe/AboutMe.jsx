import './AboutMe.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';

const AboutMe = ({ dataLoaded, setNumberOfDataLoaded }) => {
    const [aboutMeImagesLoaded, setAboutMeImagesLoaded] = useState(false);
    const [aboutMeTextLoaded, setAboutMeTextLoaded] =useState(false);

    useEffect(() => {
        if(aboutMeImagesLoaded && aboutMeTextLoaded){
          setNumberOfDataLoaded(prevState => prevState + 1);
        }
      }, [aboutMeImagesLoaded, aboutMeTextLoaded]);

    //transition in view
    const {ref, inView} = useInView();
    const welcomeImageAnimation = useAnimation();
    const welcomeTextAnimation = useAnimation();
    const welcomeBubbleAnimation = useAnimation();
    useEffect(() => {
      if(inView && dataLoaded){
        welcomeTextAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
        welcomeImageAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, delay: 0.4, bounce: 0.3
          }
        })
        welcomeBubbleAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, delay: 0.6, bounce: 0.3
          }
        })
      } else {
        welcomeTextAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
        welcomeImageAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
        welcomeBubbleAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
      }
    }, [inView, dataLoaded]);

    // get text from real-time databse in firebase
    const [dataWelcomeAboutMe,setDataWelcomeAboutMe] = useState({});

    useEffect(() => {
        onValue(firebaseRef(Db, 'welcome-aboutMe'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeAboutMe({...snapshot.val()})
            } else {
                setDataWelcomeAboutMe({});
            }
            setAboutMeTextLoaded(true);
        });

        return () => {
            setDataWelcomeAboutMe({})
        }
    }, [])

    // get image from firebase storage in firebase
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
      const storage = getStorage();
      const storageReference = storageRef(storage, 'welcome-aboutMe--image/sleekpfp.png');

      getDownloadURL(storageReference)
        .then((url) => {
          setImageUrl(url);
          setAboutMeImagesLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    if (dataLoaded === false) {
        return <></>;
    }

  return (
    <div id="aboutMe-container">
        <div
          id="aboutMe-image-container"
        >
            <motion.div ref={ref} animate={welcomeBubbleAnimation} className="rounded-circle" id="circle-1"></motion.div>
            <motion.div ref={ref} animate={welcomeBubbleAnimation} className="rounded-circle" id="circle-2"></motion.div>
            <motion.div ref={ref} animate={welcomeBubbleAnimation} className="rounded-circle" id="circle-3"></motion.div>
            <motion.div ref={ref} animate={welcomeBubbleAnimation} className="rounded-circle" id="circle-4"></motion.div>
            <motion.img
                src={imageUrl}
                alt="Walter's picture"
                ref={ref}
                animate={welcomeImageAnimation}
                exit={{ x: window.innerWidth, transition: {duration: 0.7}}}
            />
        </div>
        <div id="aboutMe-text-container">
          <motion.h3
            animate={welcomeTextAnimation}
            ref={ref}
          >
            About Me
          </motion.h3>

          {Object.keys(dataWelcomeAboutMe).map((id) => {
            return (
                <motion.p
                  animate={welcomeTextAnimation}
                  ref={ref}
                  key={id}
                >
                  {dataWelcomeAboutMe[id].content}
                </motion.p>
            );
          })}
        </div>
    </div>
  )
}

export default AboutMe
