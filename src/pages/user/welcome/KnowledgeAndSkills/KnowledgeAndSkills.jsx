import './KnowledgeAndSkills.css';
import { Db } from '../../../../firebase';
import { onValue, ref as fireBaseRef} from 'firebase/database';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getStorage, ref as imageRef, listAll, getDownloadURL } from "firebase/storage";

const KnowledgeAndSkills = ({ loading, setLoading}) => {

    const {ref, inView} = useInView();
    const KandSTextAnimation = useAnimation();
    const KandSTableAnimation = useAnimation();

    useEffect(() => {
        if(inView && !loading){
          console.log(inView)
          KandSTextAnimation.start({
            opacity: 1,
            x: "0%",
            transition: {
              type: 'spring', duration: 1, bounce: 0.3
            }
          })
          KandSTableAnimation.start({
            opacity: 1,
            x: "0%",
            transition: {
              type: 'spring', duration: 1, delay: 0.3, bounce: 0.3
            }
          })
        } else {
            KandSTextAnimation.start({
            opacity: 0,
            x: "-100%",
            transition: {
              type: 'ease-out', duration: 0.5, bounce: 0.3
            }
          })
          KandSTableAnimation.start({
            opacity: 0,
            x: "-100%",
            transition: {
              type: 'ease-out', duration: 0.5, bounce: 0.3
            }
          })
        }
      }, [inView, loading]);

    const [dataWelcomeKandS,setDataWelcomeKandS] = useState({});
    const [dataWelcomeKandSFrontend,setDataWelcomeKandSFrontend] = useState({});
    const [dataWelcomeKandSBackend,setDataWelcomeKandSBackend] = useState({});
    const [frontEndImageUrlsById, setFrontEndImageUrlsById] = useState({});
    const [backEndImageUrlsById, setBackEndImageUrlsById] = useState({});

    const storage = getStorage();
    const frontEndImagesRef = imageRef(storage, 'welcome-knowledgeAndSkills-table:frontEnd--images');
    const backEndImagesRef = imageRef(storage, 'welcome-knowledgeAndSkills-table:backEnd--images');

    useEffect(() => {
        onValue(fireBaseRef(Db, 'welcome-knowledgeAndSkills-text'), (snapshot) => {
        if(snapshot.val() !== null) {
            setDataWelcomeKandS({...snapshot.val()})
        } else {
            setDataWelcomeKandS({});
        }
        });

        onValue(fireBaseRef(Db, 'welcome-knowledgeAndSkills-table:frontEnd'), (snapshot) => {
        if(snapshot.val() !== null) {
            setDataWelcomeKandSFrontend({...snapshot.val()})
        } else {
            setDataWelcomeKandSFrontend({});
        }
        });

        onValue(fireBaseRef(Db, 'welcome-knowledgeAndSkills-table:backEnd'), (snapshot) => {
        if(snapshot.val() !== null) {
            setDataWelcomeKandSBackend({...snapshot.val()})
        } else {
            setDataWelcomeKandSBackend({});
        }
        setLoading(false);
        });

        listAll(frontEndImagesRef)
        .then((res) => {
            const urlsById = {};
            res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
                const rowId = itemRef.name.split('-')[0];
                console.log(rowId);
                if (!urlsById[rowId]) {
                urlsById[rowId] = [];
                }
                urlsById[rowId].push(url);
                setFrontEndImageUrlsById(urlsById);
                console.log(frontEndImageUrlsById);
            });
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        listAll(backEndImagesRef)
        .then((res) => {
            const urlsById = {};
            res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
                const rowId = itemRef.name.split('-')[0];
                console.log(rowId);
                if (!urlsById[rowId]) {
                urlsById[rowId] = [];
                }
                urlsById[rowId].push(url);
                setBackEndImageUrlsById(urlsById);
                console.log(backEndImageUrlsById);
            });
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error(error);
        });

        return () => {
        setDataWelcomeKandS({})
        setDataWelcomeKandSFrontend({})
        setDataWelcomeKandSBackend({})
        }
    }, [])

    if (loading === true) {
        return <></>;
    }

  return (
    <div id="KnowledgeAndSkills-container">
        <motion.div
            ref={ref}
            animate={KandSTextAnimation}
        >
            <h3>My Knowledge and Skills</h3>
            {Object.keys(dataWelcomeKandS).map((id) => {
            return (
                <p key={id}>
                {dataWelcomeKandS[id].content}
                </p>
            );
            })}
        </motion.div>
        <motion.div
            ref={ref}
            animate={KandSTableAnimation}
            className='d-flex'
        >
            <table>
                <thead>
                    <tr>
                    <th>Frontend</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(dataWelcomeKandSFrontend).map((id, index) => {
                        return (
                            <tr key={id}>
                                <td>
                                    {(frontEndImageUrlsById[index + 1] || []).map((url) => (
                                    <img src={url} alt={id} class="KandS-table-images"/>
                                    ))}
                                    {dataWelcomeKandSFrontend[id].content}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>


            </table>
            <table>
            <thead>
                <tr>
                <th>Backend</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(dataWelcomeKandSBackend).map((id, index) => {
                return (
                    <tr key={id}>
                        <td>
                            {(backEndImageUrlsById[index + 1] || []).map((url) => (
                                <img src={url} alt={id} class="KandS-table-images"/>
                            ))}
                            {dataWelcomeKandSBackend[id].content}
                        </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </motion.div>
    </div>
  )
}

export default KnowledgeAndSkills
