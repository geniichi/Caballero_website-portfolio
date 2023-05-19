import './AboutMe.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';

const AboutMe = ({ loading, setLoading }) => {

  const {ref, inView} = useInView();
  const [imageUrl, setImageUrl] = useState();
  const welcomeImageAnimation = useAnimation();
  const welcomeTextAnimation = useAnimation();
  const welcomeBubbleAnimation = useAnimation();

  useEffect(() => {
    if(inView && !loading){
      console.log(inView)
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
  }, [inView, loading]);

    const [dataWelcomeAboutMe,setDataWelcomeAboutMe] = useState({});

    useEffect(() => {
        onValue(firebaseRef(Db, 'welcome-aboutMe'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeAboutMe({...snapshot.val()})
            } else {
                setDataWelcomeAboutMe({});
            }
            setLoading(false);
        });

        return () => {
            setDataWelcomeAboutMe({})
        }
    }, [])

    useEffect(() => {
      const storage = getStorage();
      const storageReference = storageRef(storage, 'welcome-aboutMe--image/sleekpfp.png');

      getDownloadURL(storageReference)
        .then((url) => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    if (loading === true) {
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
