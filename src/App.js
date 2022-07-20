import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs,addDoc, updateDoc,doc,deleteDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [newuser, setNewuser] =useState({});
  const [user, setUser] = useState([]);
  const userCollection = collection(db, 'users');

  useEffect(() =>{
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      //console.log(data.docs.map((doc) =>({...doc.data(), id:doc.id})));
      setUser(data.docs.map((doc) =>({...doc.data(), id:doc.id})))
    }
    getUsers();
});

  const addUser = async ()=>{
    await addDoc(userCollection, {Name:newuser.Name, Age:Number(newuser.Age)});

  }

  const updateInfo = async (id,age)=>{
    console.log(id,age);
    const userDoc = doc(db,"users", id);
    const newFields = {Age: age+1};
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id)=>{
    const userDoc = doc(db,"users", id);
    await deleteDoc(userDoc);
  }
  return (
    <div className="App">
      <input type="text" placeholder="Name..." onChange={(event)=>setNewuser({Name:event.target.value, Age:newuser.Age})}/>
      <input type="number" placeholder="Age..." onChange={(event)=>setNewuser({Age:event.target.value, Name:newuser.Name})}/>
      <button onClick={addUser}>Add User</button>
      {user.map((elm) =>{return <div key={elm.id}>
        <h1>name : {elm.Name}</h1>
        <h1>age : {elm.Age}</h1>
        <button onClick={()=>updateInfo(elm.id,elm.Age)}>Update</button>
        <button onClick={()=>deleteUser(elm.id)}>Delete</button>
      </div>})}
    </div>
  );
}

export default App;
