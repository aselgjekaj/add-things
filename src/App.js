import logo from './logo.svg';
import './App.css';
import firebase, {auth, provider} from './Components/Firebase/Firebase.js'

import {useState, useEffect, useRef, React} from 'react'
import swal from 'sweetalert';

function App() {


  const [currentItem, setCurrentItem] = useState('')
  const [currentUsername, setCurrentUsername] = useState('')
  /* const [showPopup, setShowPop] = useState(false) */
  const[items, setItems] = useState([])
  const[user, setUser] = useState(null)


  //UseRef
  const refName = useRef(null)

  const handleSubmit = e => {
    e.preventDefault();
    let value = refName.current.value
  console.log("User: " + value)

  const itemsRef = firebase.database().ref('items');
  const item = {
    title: currentItem,
    user: value
  }
  console.log("Item: " + currentItem + "   " + value)
  try
  {
    itemsRef.push(item);
    swal({
      title: "Item Added!",
      text: "",
      icon: "success",
      button: "OK"
    });
  }
  catch(error)
  {
    console.log("Errori:  " + error)
    swal({
      title: "Item Not added!",
      text: "",
      icon: "error",
      button: "OK"
    });
  }
  setCurrentItem('')
  setCurrentUsername('')
  }

  useEffect(() => {
   /*  auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({user});
      } 
    }); */
    const itemsRef = firebase.database().ref("items")
    itemsRef.on('value', (snapshot) =>
    {
    let items = snapshot.val()
    let newItems = []
    for(let item in items)
    {
      newItems.push(
        {
          id: item,
          title: items[item].title,
          user: items[item].user
        }
      )
    }
    setItems(newItems)
    })
  }, [])

const login = () =>
{
  auth.signInWithPopup(provider) 
  .then((result) => {
    const user = result.user;
    setUser(user)
  });
}
const logout = () =>
{

  auth.signOut()
    .then(() => {
      setUser(null)
    });
}
  function removeItem(vlera){
   
    let itemId = vlera
    console.log("Item: " + itemId)
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    try{

      itemRef.remove();
      swal({
        title: "Item removed!",
        text: "",
        icon: "success",
        button: "OK"
      });
    }
    catch(error)
    {
      console.log("Error")
      swal({
        title: "Item Not removed!",
        text: "error: " + error,
        icon: "error",
        button: "OK"
      });
    }

  }
  return (
    <div className="App">
       
     <header>
            <div className='wrapper'>
              <h1>List Things</h1>
              {user ?        
              <button onClick={logout}>Log Out</button>
              :
              <button onClick={login}>Log In</button> 
              }
            </div>
    </header>
      { user ?
        <div className='container'>
        <section className='add-item'>
            <form onSubmit={handleSubmit}>
              <input type="text" name="user_name" ref={refName} placeholder="What's your name?" onChange={e => setCurrentUsername(e.target.value)} value={user.displayName || user.email || currentUsername}/>
              <input type="text" name="currentItem" placeholder="What is your item?"onChange={e => setCurrentItem(e.target.value)} value={currentItem} />
              <button>Add Item</button>
              
            </form>
        </section>
        </div>
        :
        <div>
       User not logged in
        </div>
      }
     
          {
          user ?
         
         <div className='container'>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
              {items.map((item) => {
                    return (
                      <li key={item.id} >
                        <h3>Title: {item.title}</h3>
                        <p>User: {item.user}
                        {item.user === user.displayName || item.user === user.email ?
                   <button onClick={() => removeItem(item.id)}>Remove Item</button> : null}
                        </p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </section>
          
          </div>
          :
          <div>
          You must be logged in
          </div>
          }
          

    </div>
  );
}

export default App;
