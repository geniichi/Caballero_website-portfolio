import Footer from '../../../shared/Footer';
import Header from '../../../shared/Header';
import './MyProject.css';
import ShiinChat from './ShiinChat/ShiinChat';
import StudySmart from './StudySmart/StudySmart';
import TitanMinds from './TitanMinds/TitandMinds';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Project = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [numberOfDataLoaded, setNumberOfDataLoaded] = useState(0)

  useEffect(() => {
      toast.loading("Loading...", { toastId: "loadingToast" });
      console.log("loading...")
  }, []);

  useEffect(() => {
    if (numberOfDataLoaded === 3) {
      setDataLoaded(true);
      toast.dismiss();
    } else {
      setDataLoaded(false);
    }
  }, [numberOfDataLoaded]);

  return (
    <>
      <Header dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
      <motion.main
          initial={{y: "-100%"}}
          animate={{y: "0%"}}
          transition={{type: 'spring', duration: 1, bounce: 0.3}}
          exit={{ x: window.innerWidth, transition: {duration: 0.7}}}
      >
          {dataLoaded ? <h2 id='project-heading'>My Projects</h2> : <></>}
          <StudySmart dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
          <TitanMinds dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
          <ShiinChat dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
      </motion.main>
      <Footer dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
    </>

  )
}

export default Project
