import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCe6Fe_CkUdE_0wffoqsqL3oYz-a9saSVg",
    authDomain: "learning-firebase-88072.firebaseapp.com",
    projectId: "learning-firebase-88072",
    storageBucket: "learning-firebase-88072.appspot.com",
    messagingSenderId: "333025109396",
    appId: "1:333025109396:web:7e533eaafe4459e9dc1b81"
}

//init firebase app
initializeApp(firebaseConfig)


//init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

//get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
        .then(() => {
            addBookForm.reset()
        })
})

//deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
})