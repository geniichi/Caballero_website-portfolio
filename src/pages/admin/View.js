import './View.css';
import { useState, useEffect } from 'react';
import { fireDb } from '../firebase';
import { ref, get } from 'firebase/database';
import { useParams, Link } from 'react-router-dom';

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
      const contactRef = ref(fireDb, `contacts/${id}`);
      get(contactRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
    }, [id]);

    console.log("user", user);
    return (
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                  <p>User Contact Detail</p>
                </div>
                <div class="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>

                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br/>
                    <br/>

                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br/>
                    <br/>

                    <strong>Contact: </strong>
                    <span>{user.contact}</span>
                    <br/>
                    <br/>

                    <Link to="/">
                        <button className="btn btn-edit">Go Back</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default View
