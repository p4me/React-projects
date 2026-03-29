import { useState } from "react"
import Practice from "../components/Practice"
import Posts from "../components/Posts"
import Exchange from "../components/Exchange"
import ReviewTable from "../components/ReviewTable"
import Modal from "../components/Modal"
import ChipsList from "../components/ChipsList"

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
      <ChipsList chips={chips} max={6}></ChipsList>
      {/* <ChipsList ></ChipsList> */}
    </div>
  )
}

const chips = [
  {label: 23562153},
  {label: 23562153},
  {label: 4543},
  {label: 76657},
  {label: 1213},
  {label: 2122},
  {label: 23562153}
]
export default Dashboard
