import './AboutMe.css';
import Sleekpfp from '../../../../images/welcomePage/sleekpfp.png'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';

const AboutMe = ({ loading, setLoading }) => {

  const {ref, inView} = useInView();
  const welcomeImageAnimation = useAnimation();
  const welcomeTextAnimation = useAnimation();

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
          type: 'spring', duration: 1, bounce: 0.3
        }
      })
    } else {
      welcomeTextAnimation.start({
        opacity: 0,
        x: "-100%",
        transition: {
          type: 'spring', duration: 0.5, bounce: 0.3
        }
      })
      welcomeImageAnimation.start({
        opacity: 0,
        x: "-100%",
        transition: {
          type: 'spring', duration: 0.5, bounce: 0.3, delay: 0.1
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

    if (loading === true) {
        return <></>;
    }

  return (
    <div id="aboutMe-container" className="d-flex justify-content-between align-items-center">
        <motion.img
          className=" mr-5"
          src={Sleekpfp}
          alt="Walter's picture"
          ref={ref}
          animate={welcomeImageAnimation}
          exit={{ x: window.innerWidth, transition: {duration: 0.7}}}
        />
        <div
          className="mb-0"
        >
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
                  className="m-0"
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
