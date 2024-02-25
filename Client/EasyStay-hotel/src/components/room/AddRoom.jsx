import React from 'react'
import { addRoom  } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'

const AddRoom = () => {
  const[newRoom,setNewRoom] = useState({
    photo : null,
    roomType : "",
    roomPrice : ""
  }) 

  const[imagePreview,setImagePreview] = useState("")
  const[successMessage,setsuccessMessage] = useState("")
  const[errorMessage,seterrorMessage] = useState("")

  const handleRoomInputChange = (e) =>{
const name = e.target.name
let value = e.target.value
if(name === "roomPrice")
{
  if(!isNaN(value))
  {
  value.parseInt(value)
}
else{
  value = ""
}
}
setNewRoom({...newRoom,[name]: value})
  }

const handleImageChange = (e) =>{
  const selectedImage = e.target.files[0]
  setNewRoom({...newRoom,Photo:selectedImage})
  setImagePreview(URL.createObjectURL(selectedImage))

}

const handleSubmit = async(e) =>{
  e.preventDefault()
  try{
    const success = await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)

    if(success !== undefined){
      setsuccessMessage("A new room was added to the database")
      setNewRoom({photo:null,roomType:"",roomPrice:""})
      setImagePreview("")
      seterrorMessage("")
    }else{
      seterrorMessage("Error adding room")
    }
  }catch(error){
    seterrorMessage(error.message)

  }

}

return (
<>

<section className = "container,mt-5 mb-5">
   <div className="row justify-content-center">
    <div className = "col-md-8 col-lg-6">
      <h2 className = "mt-5 mb-2">Add a new Room</h2>
     <form onSubmit={handleSubmit}>
      <div className = "mb-3">
        <label htmlFor="roomType" className="form-lable">Room Type</label>
      <div>
        <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
      </div>
        </div>

        <div className = "mb-3">
        <label htmlFor="roomPrice" className="form-lable">Room Price</label>
        <input
        className="form-control"
        required
        id = "roomPrice"
        type='number'
        name="roomPrice"
        value={newRoom.roomPrice}
        onChange={handleRoomInputChange}
        />
        </div>   

        <div className = "mb-3">
        <label htmlFor="photo" className="form-lable">Room Photo</label>
        <input

        required
        id = "photo"
        name="photo"
        type='file'
        className="form-control"
        onChange={handleRoomInputChange}
        />
        {imagePreview && (
        <img src ={imagePreview} alt = "Preview Room Photo"
        style={{maxWidth:"400px",maxHeight: "400px"}}
        className="mb-3"/>)}

        </div> 
        <div className="d-grid d-flex mt-2">
          <button className = "btn btn-outline-primary ml-5">Save Room</button>
        </div>
     </form>
    </div>
  </div>
</section>

</>


  )
}

export default AddRoom