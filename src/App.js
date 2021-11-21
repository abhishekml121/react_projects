import React, {useState} from 'react';
import AddUser from './components/UI/Users/AddUser';
import UsersList from './components/UI/Users/UsersList';


function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (user_name, user_age) => {
    setUsersList((prevUsersList)=>{
      return [{name:user_name, age:user_age, id:Math.random().toString()}, ...prevUsersList];
    });

  }
  
  return (
    <>
    <AddUser onAddUser={addUserHandler}/>
    <UsersList users={usersList} />
    </>
  );
}

export default App;
