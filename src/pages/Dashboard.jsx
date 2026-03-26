import { useState } from "react"
import Practice from "../components/Practice"
import Posts from "../components/Posts"
import Exchange from "../components/Exchange"
import ReviewTable from "../components/ReviewTable"
import Modal from "../components/Modal"

function Dashboard() {
  const user = { name: 'John', age: "30" };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      {/* Parent controls open/close via isOpen and onClose */}
      <Modal
        title="Welcome!"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <p>This is the modal body. You can put <strong>anything</strong> here.</p>
        <p>Dashboard is the parent — it controls when this opens and closes.</p>
      </Modal>

      <Practice {...user} countrySelected={(selectedCountryId) => {
        alert(`i m here ${selectedCountryId}`)
      }}/>
      {/* <Posts /> */}
      <ReviewTable />
      <Exchange />
    </div>
  )
}

export default Dashboard
