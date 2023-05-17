import './AddEdit.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Db } from "../firebase";
import { toast } from 'react-toastify';
import { onValue, push, ref, set } from 'firebase/database';

const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddUsers = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const{name, email, contact} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        onValue(ref(Db, 'users'), (snapshot) => {
            if(snapshot.val() !== null) {
                setData({...snapshot.val()})
            } else {
                setData({});
            }
        });

        return () => {
            setData({})
        }
    }, [id])

    useEffect(() => {
        if(id) {
            setState({...data[id]});
        } else {
            setState({...initialState});
        }

        return () => {
            setState({...initialState});
        };
    }, [id, data])


    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !contact) {
          toast.error('Please provide value in each input field');
        } else {
            if(!id){
                const usersRef = ref(Db, 'users');
                push(usersRef, state)
                .then(() => {
                toast.success('Contact Added Successfully');
                })
                .catch((err) => {
                toast.error(err);
                });
            } else {
                const usersRef = ref(Db, `users/${id}`);
                set(usersRef, state)
                .then(() => {
                toast.success('Contact Updated Successfully');
                })
                .catch((err) => {
                toast.error(err);
                });
            }

            setTimeout(() => navigate('/'), 500);
        }
      };

    return (
        <div style={{marginTop: "100px"}}>
            <form
              style={{
                  margin: "auto",
                  padding: "15px",
                  maxWidth: "400px",
                  alignContent: "center"
              }}
              onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name..."
                    value={name || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email..."
                    value={email || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor="contact">Contact information</label>
                <input
                    type="number"
                    name="contact"
                    id="contact"
                    placeholder="Your contact Number..."
                    value={contact || ""}
                    onChange={handleInputChange}
                />

                <input type="submit" value={id ? "Update" : "Save"}/>
            </form>
        </div>
    )
}

export default AddUsers
