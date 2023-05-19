import './Aspire.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref as firebaseRef } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage';

const Aspire = ({ loading, setLoading }) => {

    // background image (single image from firebase storage)
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
      const storage = getStorage();
      const storageReference = storageRef(storage, 'welcome-aspire--image/aspireImage.jpg');

      getDownloadURL(storageReference)
        .then((url) => {
          setImageUrl(url);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    // get text from real-time databse in firebase
    const [dataWelcomeAspire,setDataWelcomeAspire] = useState({});

    useEffect(() => {
        onValue(firebaseRef(Db, 'welcome-aspire-text'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeAspire({...snapshot.val()})
            } else {
                setDataWelcomeAspire({});
            }
            setLoading(false);
        });

        return () => {
            setDataWelcomeAspire({})
        }
    }, [])

    //transition in view
    const {ref, inView} = useInView();
    const aspireTextAnimation = useAnimation();

    useEffect(() => {
      if(inView && !loading){
        console.log(inView)
        aspireTextAnimation.start({
          opacity: 1,
          x: "0%",
          transition: {
            type: 'spring', duration: 1, bounce: 0.3
          }
        })
      } else {
        aspireTextAnimation.start({
          opacity: 0,
          x: "-100%",
          transition: {
            type: 'ease-out', duration: 0.001
          }
        })
      }
    }, [inView, loading]);

    //validate if data is properly loaded
    if (loading === true) {
        return <></>;
    }

    return (
        <section
            id="Aspire-container"
            style={{
              backgroundImage: `linear-gradient(to left, transparent, rgba(0,0,0,1)), url(${imageUrl})`
            }}
        >
            <motion.div ref={ref} animate={aspireTextAnimation}>
              <h3>What I aspire to be</h3>
              {Object.keys(dataWelcomeAspire).map((id) => {
                  return (
                      <motion.p
                        // animate={welcomeTextAnimation}
                        // ref={ref}
                        // key={id}
                      >
                        {dataWelcomeAspire[id].content}
                      </motion.p>
                  );
              })}
            </motion.div>
        </section>
    )
}

export default Aspire
