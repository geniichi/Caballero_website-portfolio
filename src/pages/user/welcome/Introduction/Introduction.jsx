import './Introduction.css'
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref as fireBaseRef} from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';

const Introduction = ({ dataLoaded, setNumberOfDataLoaded }) => {
    const [introImagesLoaded, setIntroImagesLoaded] = useState(false);
    const [introTextLoaded, setIntroTextLoaded] =useState(false);

    useEffect(() => {
        if(introImagesLoaded && introTextLoaded) {
            setNumberOfDataLoaded(prevState => prevState + 1);
        }
    }, [introImagesLoaded, introTextLoaded]);

    //transition in view
    const {ref, inView} = useInView();
    const introTextAnimation = useAnimation();
    const introImageAnimation = useAnimation();

    useEffect(() => {
      if(inView && dataLoaded){
        introTextAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
        introImageAnimation.start({
          opacity: 1,
          y: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
      } else {
        introTextAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
        introImageAnimation.start({
          opacity: 0,
          y: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
      }
    }, [inView, dataLoaded]);

    //get texts from database(real-time database)
    const [dataWelcomeIntroduction,setDataWelcomeIntroduction] = useState({});

    useEffect(() => {
        onValue(fireBaseRef(Db, 'welcome-introduction'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeIntroduction({...snapshot.val()})
            } else {
                setDataWelcomeIntroduction({});
            }
            setIntroTextLoaded(true);
        });

        return () => {
            setDataWelcomeIntroduction({})
        }
    }, [])

    // get image from database(firebase storage)
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
      const storage = getStorage();
      const storageReference = storageRef(storage, 'welcome-introduction--image/formalpfp.png');

      getDownloadURL(storageReference)
        .then((url) => {
          setImageUrl(url);
          setIntroImagesLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    //validate if data is properly loaded
    if (dataLoaded === false) {
      return <></>;
    }

  return (
      <motion.div id="introduction-main-container">
        <div className="d-flex justify-content-between align-items-center">
          <motion.div
              className="mr-5"
              ref={ref}
              animate={introTextAnimation}
          >
            <p id="introduction-caption">Hello everyone my name is:</p>
            <h1 id="introduction-title">Walter Arnold Janssen L. Caballero</h1>
            <ul className="list-unstyled d-flex justify-content-around">
              {Object.keys(dataWelcomeIntroduction).map((id, index) => {
                return (
                  <>
                    <li key={index} className="introduction-link">
                      {dataWelcomeIntroduction[id].content}
                    </li>
                    {index < Object.keys(dataWelcomeIntroduction).length - 1 && <>&bull;</>}
                  </>
                );
              })}
            </ul>

          </motion.div>

          <motion.div
              className="rounded-circle"
              id="introduction-image-container"
              ref={ref}
              animate={introImageAnimation}
          >
            <div>
              <img src={imageUrl} alt="formal profile picture"/>
            </div>
          </motion.div>
        </div>
      </motion.div>
  )
}

export default Introduction
