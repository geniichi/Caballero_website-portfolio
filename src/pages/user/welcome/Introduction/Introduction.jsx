import './Introduction.css'
import Formalpfp from '../../../../images/welcomePage/formalpfp.png';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Db } from '../../../../firebase';
import { onValue, ref } from 'firebase/database';

const Introduction = ({ loading, setLoading}) => {
  const [dataWelcomeIntroduction,setDataWelcomeIntroduction] = useState({});

    useEffect(() => {
        onValue(ref(Db, 'welcome-introduction'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeIntroduction({...snapshot.val()})
            } else {
                setDataWelcomeIntroduction({});
            }
            setLoading(false);
        });

        return () => {
            setDataWelcomeIntroduction({})
        }
    }, [])

    if (loading === true) {
        return <></>;
    }

  return (
    <motion.div
          id="introduction-main-container"
          initial={{y: "-100%"}}
          animate={{y: "0%"}}
          transition={{type: 'spring', duration: 1, bounce: 0.3}}
          exit={{ x: window.innerWidth, transition: {duration: 0.7}}}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-5">
              <p id="introduction-caption">Hello everyone my name is:</p>
              <h1 id="introduction-title">Walter Arnold Janssen L. Caballero</h1>
              <ul className="list-unstyled d-flex justify-content-around">
                {Object.keys(dataWelcomeIntroduction).map((id, index) => {
                  return (
                    <>
                      <li key={id} className="introduction-link">
                        {dataWelcomeIntroduction[id].content}
                      </li>
                      {index < Object.keys(dataWelcomeIntroduction).length - 1 && <>&bull;</>}
                    </>
                  );
                })}
              </ul>

            </div>

            <div className="rounded-circle" id="introduction-image-container">
              <div>
                <img src={Formalpfp} alt="formal profile picture"/>
              </div>
            </div>
          </div>
        </motion.div>
  )
}

export default Introduction
