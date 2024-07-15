import { useEffect, useState } from 'react'
import { Loader } from '../cmps/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toyService'


function getEmptyMsg() {
  return {
    txt: '',
  }
}

export function ToyDetails() {
  const [msg, setMsg] = useState(getEmptyMsg())
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      showErrorMsg('Cant load toy')
      navigate('/toy')
    }
  }

  function handleMsgChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setMsg((msg) => ({ ...msg, [field]: value }))
  }

  async function onSaveMsg(ev) {
    ev.preventDefault()
    const savedMsg = await toyService.addMsg(toy._id, msg.txt)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: [...(prevToy.msgs || []), savedMsg],
    }))
    setMsg(getEmptyMsg())
    showSuccessMsg('Msg saved!')
  }

  async function onRemoveMsg(msgId) {
    const removedMsgId = await toyService.removeMsg(toy._id, msgId)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
    }))
    showSuccessMsg('Msg removed!')
  }

  const { txt } = msg

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details" style={{ textAlign: 'center' }}>
      <h1>
        Toy name: <span>{toy.name}</span>
      </h1>
      <h1>
        Toy price: <span>${toy.price}</span>
      </h1>
      <h1>
        Labels: <span>{toy.labels.join(' ,')}</span>
      </h1>
      <h1 className={toy.inStock ? 'green' : 'red'}>
        {toy.inStock ? 'In stock' : 'Not in stock'}
      </h1>
      <img src={toy.imageUrl}/>
      <br />
      
      <ul>
        {toy.msgs &&
          toy.msgs.map((msg) => (
            <li key={msg.id}>
              By: {msg.by.fullname} - {msg.txt}
              <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                X
              </button>
            </li>
          ))}
      </ul>
      <form className="login-form-msg" onSubmit={onSaveMsg}>
        <input
          type="text"
          name="txt"
          value={txt}
          placeholder="your reply"
          onChange={handleMsgChange}
          required
          autoFocus
        />
        <button>Send</button>
      </form>
      <button>
        <Link to="/toy">Back</Link>
      </button>
    </section>
  )
}
