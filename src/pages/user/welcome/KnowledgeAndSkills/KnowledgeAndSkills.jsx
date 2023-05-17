import './KnowledgeAndSkills.css';
import { Db } from '../../../../firebase';
import { onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

const KnowledgeAndSkills = ({ loading, setLoading}) => {

  const [dataWelcomeKandS,setDataWelcomeKandS] = useState({});

    useEffect(() => {
        onValue(ref(Db, 'welcome-knowledgeAndSkills-text'), (snapshot) => {
            if(snapshot.val() !== null) {
                setDataWelcomeKandS({...snapshot.val()})
            } else {
                setDataWelcomeKandS({});
            }
            setLoading(false);
        });

        return () => {
            setDataWelcomeKandS({})
        }
    }, [])

    if (loading === true) {
        return <></>;
    }

  return (
    <div id="KnowledgeAndSkills-container" className="d-flex flex-column text-right">
        <h3>My Knowledge and Skills</h3>
        <div>
            {Object.keys(dataWelcomeKandS).map((id) => {
                return (
                    <p key={id}>
                    {dataWelcomeKandS[id].content}
                    </p>
                );
            })}

        </div>

    </div>
  )
}

export default KnowledgeAndSkills
