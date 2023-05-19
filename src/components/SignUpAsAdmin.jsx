import { useState, useEffect } from 'react';
import { Db } from "../firebase";
import { toast } from 'react-toastify';
import { push, ref } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const initialState = {
    content: "",
}

const SignUpAsAdmin = () => {
    const [state, setState] = useState(initialState);
    const [ section, setSection ] = useState("");
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const{ content } = state;

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        if (name) {
          setState({...state, [name]: value});
        }
        if (e.target.id === "adminSection") {
          setSection(value);
        }
      };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    useEffect(() => {
        if(section === "welcome-introduction--image" || section === "welcome-aboutMe--image" ||
           section === "welcome-knowledgeAndSkills-table:frontEnd--images" ||
           section === "welcome-knowledgeAndSkills-table:backEnd--images" ||
           section === "welcome-aspire--image")
        {
            setShowFileUpload(true);
        } else {
            setShowFileUpload(false);
        }
    }, [section])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showFileUpload) {
          if (!selectedFile) {
            toast.error('Please select a file to upload');
          } else {
            const storage = getStorage();
            const storageReference = storageRef(storage, `${section}/${selectedFile.name}`);

            uploadBytes(storageReference, selectedFile)
              .then((snapshot) => {
                console.log('Uploaded a blob or file!');
                toast.success('Image uploaded successfully');
              })
              .catch((error) => {
                console.error(error);
                toast.error('Failed to upload image');
              });
          }
        } else {
          if (!content) {
            toast.error('Please provide value in each input field');
          } else {
            const contentRef = ref(Db, `${section}`);
            push(contentRef, state)
              .then(() => {
                toast.success('Content Added Successfully');
              })
              .catch((err) => {
                toast.error(err);
              });
          }
        }
      };

    return (

    <main id="login-container">
        <div className='
            container
            col-xl-4 p-xl-5
            col-lg-5 p-lg-3
            col-md-6 p-md-5
            col-sm-7 p-sm-4
            col-10 px-4 py-3'
        >
            <h1 id="LogIn-title" className='text-center pb-4'>Admin</h1>
            <form  onSubmit={handleSubmit}>

                <div class="form-group">
                    <label htmlFor="adminSection">Section</label>
                    <select
                        className="form-control"
                        id="adminSection"
                        onChange={handleInputChange}
                        value={section}
                    >
                        <option>welcome-introduction</option>
                        <option>welcome-introduction--image</option>
                        <option>welcome-aboutMe</option>
                        <option>welcome-aboutMe--image</option>
                        <option>welcome-knowledgeAndSkills-text</option>
                        <option>welcome-knowledgeAndSkills-table:frontEnd</option>
                        <option>welcome-knowledgeAndSkills-table:backEnd</option>
                        <option>welcome-knowledgeAndSkills-table:frontEnd--images</option>
                        <option>welcome-knowledgeAndSkills-table:backEnd--images</option>
                        <option>welcome-aspire-text</option>
                        <option>welcome-aspire--image</option>
                    </select>
                </div>

                {showFileUpload ? (
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                id="adminImage"
                                onChange={handleFileChange}
                            />
                            <label class="custom-file-label" htmlFor="adminImage">{selectedFile ? (`${selectedFile}`) : ( "Choose File" )}</label>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="email">Content</label>
                            <textarea
                                type="text"
                                value={content || ""}
                                onChange={handleInputChange}
                                className="form-control"
                                id="content"
                                name="content"
                                placeholder="Enter content..."
                            />
                            <small id="emailHelp" className="form-text">
                                {`This content will be put in the ${section} section`}
                            </small>
                        </div>
                    )
                }
                <button type="submit" className="btn btn-outline-success my-3">Approve</button>
            </form>
        </div>
    </main>
    )
}

export default SignUpAsAdmin;
