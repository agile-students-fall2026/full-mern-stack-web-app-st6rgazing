import { useState, useEffect } from 'react'
import axios from 'axios'
import './Messages.css'
import loadingIcon from './loading.gif'


/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [messages, setMessages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  const [title, setTitle] = useState('')
  const [paragraphs, setParagraphs] = useState([])
  const [imageUrl, setImageUrl] = useState('')

  const fetchAboutMe = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        let data = response.data
        // axios bundles up all response data in response.data property
        setTitle(data.title)
        setParagraphs(data.paragraphs)
        setImageUrl(data.imageUrl)

      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  /**
   * A nested function used to add a new message to the list of messages
   * @param {*} message The new message to add to the list
   */


  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchAboutMe()

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
        fetchAboutMe()
    }, 5000)

    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle)
    }
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  const paragraphs2 = []
for (let i = 0; i < paragraphs.length; i++) {
  paragraphs2.push(<p key={i}>{paragraphs[i]}</p>)
}

  return (
    <>
      <h1>{title}</h1>
        {paragraphs2}
    <img height="300" src={imageUrl} alt="me" />




    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
