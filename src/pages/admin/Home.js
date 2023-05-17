import './Home.css';
import { useState, useEffect } from 'react';
import { Db } from '../firebase';
import { onValue, ref, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const [data,setData] = useState({});

    useEffect(() => {
        onValue(ref(Db, 'contacts'), (snapshot) => {
            if(snapshot.val() !== null) {
                setData({...snapshot.val()})
            } else {
                setData({});
            }
        });

        return () => {
            setData({})
        }
    }, [])


    return (
      <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
          <tr id="first-row">
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        <tbody>
        {Object.keys(data).map((id, index) => {
            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                </tr>
            )
        })}
        </tbody>
      </table>
    </div>
    )
}

export default Home
