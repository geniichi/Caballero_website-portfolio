import './welcome.css';
import AboutMe from './AboutMe/AboutMe';
import KnowledgeAndSkills from './KnowledgeAndSkills/KnowledgeAndSkills';
import Introduction from './Introduction/Introduction';
import Aspire from './Aspire/Aspire';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Welcome = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      toast.loading('Loading..');
      console.log("loading");
    } else {
      toast.dismiss()
    }
  }, [loading]);

  return (
    <main className="d-flex flex-column align-items-center">
        <Introduction loading={loading} setLoading={setLoading}/>
        <AboutMe loading={loading} setLoading={setLoading}/>
        <KnowledgeAndSkills loading={loading} setLoading={setLoading}/>
        <Aspire loading={loading} setLoading={setLoading}/>
    </main>

  )
}

export default Welcome
