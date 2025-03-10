import {useReducer, useEffect, useState}  from 'react';
import {projectFirestore,timestamp} from '../firebase/config';

let initialState = {
    document:null,
    isPending:false,
    error:null,
    success:null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
      case "IS_PENDING":
        return {success: false, isPending: true, error: null, document: null}
      case "ERROR":
        return {success: false, isPending: false, error: action.payload, document: null}
      case "ADDED_DOCUMENT":
        return {success: true, isPending: false, error: null, document: action.payload}
      case "DELETED_DOCUMENT":
            return {success: true, isPending: false, error: null, document: action.payload}
      case "UPDATED_DOCUMENT":
        return {isPending:false,success:true,error:null,document:action.payload}
      default:
        return state
    }
  }

  export const useFireStore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(collection)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
      if (!isCancelled) {
        dispatch(action)
      }
    }

    // add a document
    const addDocument = async (doc) => {
      dispatch({ type: "IS_PENDING" })

      try {
        const createdAt = timestamp.fromDate(new Date())
        const addedDocument = await ref.add({...doc, createdAt })
        dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
      }
      catch (err) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
      }

    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({type:"IS_PENDING"})

        try {
            const deletedDocument = await ref.doc(id).delete();
            dispatchIfNotCancelled({type:"DELETED_DOCUMENT",payload:deletedDocument})
        } catch (error) {
            dispatchIfNotCancelled({type:"ERROR",payload:"could not delete"})
        }
    }

    // update a document

    const updateDocument = async (id,updates)=>{
        dispatch({type:"IS_PENDING"})

        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({type:'UPDATED_DOCUMENT',payload:updatedDocument})
            return updatedDocument

        } catch (error) {
            dispatchIfNotCancelled({type:'ERROR',payload:error.message})
            return null;

        }
    }


    useEffect(() => {
      return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument,updateDocument, response }

  }
