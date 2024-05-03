import { useState } from "react";
import Employee from "./Employees";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [employeeToEdit, setEmployeeToEdit] = useState();

  useEffect(() => {
    setEmployees(Employee);
  }, []);

  //   delete
  const handleDelete = (id) => {
    let updatedEmployee = employees.filter((employee) => employee.id != id);
    setEmployees(updatedEmployee);
  };

  //   addemployee
  const handleAddEmployeeModal = () => {
    setShowAddModal(true);
  };
  const handleNameChange = (e) => {
    setNewEmployeeData({
      ...newEmployeeData,
      name: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    setNewEmployeeData({
      ...newEmployeeData,
      phone: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setNewEmployeeData({
      ...newEmployeeData,
      email: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setNewEmployeeData({
      ...newEmployeeData,
      address: e.target.value,
    });
  };

  const handleAddEmployee = () => {
    const id = uuidv4();
    const randomId = id.slice(0, 6);
    // Use spread operator and callback for proper update
    setEmployees((prevEmployees) => [
      ...prevEmployees, // Add existing employees
      { ...newEmployeeData, id: randomId }, // Include ID in new object
    ]);
    setShowAddModal(false);
  };

  // Edit
  const handleShowEditModal = (id) => {
    setShowEditModal(true);
    const employeeToFind = employees.find((employee) => employee.id == id);
    setEmployeeToEdit(employeeToFind);
    console.log(employeeToFind);
  };
  const handleEditNameChange = (e) => {
    setEmployeeToEdit({ ...employeeToEdit, name: e.target.value });
  };
  const handleEditPhoneChange = (e) => {
    setEmployeeToEdit({ ...employeeToEdit, phone: e.target.value });
    console.log(employeeToEdit);
  };
  const handleEditEmailChange = (e) => {
    setEmployeeToEdit({ ...employeeToEdit, email: e.target.value });
  };
  const handleEditAddressChange = (e) => {
    setEmployeeToEdit({ ...employeeToEdit, address: e.target.value });
  };
  const handleSaveChanges = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id == employeeToEdit.id ? employeeToEdit : emp
      )
    );

    setShowEditModal(false);
  };

  return (
    <div>
      <div className=" w-full fixed top-0 right-0 z-10 h-16 flex items-center justify-end pt-2 lg:pt-10 pr-2 lg:pr-10">
        <button
          onClick={handleAddEmployeeModal}
          className="bg-gradient-to-br from-gray-700 to-gray-600 px-5 py-2 rounded-full text-white text-xs lg:text-lg"
        >
          + Add Employee
        </button>
      </div> 

      <div className="mx-4 xl:mx-10 mt-16 lg:mt-20 overflow-auto">
        <table className="text-white text-xs xl:text-lg whitespace-nowrap w-full">
          <thead>
            <tr className="text-gray-400">
              <th className="px-4 py-6">ID</th>
              <th className="px-4 py-4">NAME</th>
              <th className="px-4 py-4">PHONE NUMBER</th>
              <th className="px-4 py-4">EMAIL ID</th>
              <th className="px-4 py-4">ADDRESS</th>
              <th className="px-4 py-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-500 transition duration-300 text-center`}
              >
                <td className="px-4 py-4 rounded-l-2xl">{item.id}</td>
                <td className="px-4 py-4 font-medium">{item.name}</td>
                <td className="px-4 py-4 text-indigo-300">{item.phone}</td>
                <td className="px-4 py-4 text-indigo-300">{item.email}</td>
                <td className="px-4 py-4 text-indigo-300">{item.address}</td>
                <td className="px-4 py-4 rounded-r-2xl">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        handleShowEditModal(item.id);
                      }}
                      className="bg-green-200 text-green-800 border border-green-700 px-5 py-1 rounded-full  transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                      className="bg-red-200 text-red-800 border border-red-700 px-5 py-1 rounded-full  transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* add employee modal */}
      {showAddModal ? (
        <>
          <div className="text-black flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-2xl">
            <div className="bg-white  rounded-lg shadow-lg px-10 py-12">
              <h3 className="text-3xl font-medium">Add Employee</h3>
              <form className="p-5">
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="block  font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newEmployeeData.name}
                    onChange={handleNameChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="phone"
                    className="block  font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={newEmployeeData.phone}
                    onChange={handlePhoneChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block  font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newEmployeeData.email}
                    onChange={handleEmailChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="address"
                    className="block  font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={newEmployeeData.address}
                    onChange={handleAddressChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
              </form>
              <div className="flex items-center justify-end gap-4 text-lg">
                <button
                  className="text-red-500 background-transparent font-bold uppercase"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white font-bold uppercase px-2 py-1 rounded-lg hover:bg-emerald-400 transition duration-300"
                  type="button"
                  onClick={handleAddEmployee}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* edit employee modal */}
      {showEditModal ? (
        <>
          <div className="text-black flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-2xl">
            <div className="bg-white  rounded-lg shadow-lg px-10 py-12">
              <h3 className="text-3xl font-medium">Edit Employee</h3>
              <form className="p-5">
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="block  font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    value={employeeToEdit.name}
                    onChange={handleEditNameChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="phone"
                    className="block  font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type=""
                    id="phone"
                    name="phone"
                    value={employeeToEdit.phone}
                    onChange={handleEditPhoneChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block  font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={employeeToEdit.email}
                    onChange={handleEditEmailChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="address"
                    className="block  font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={employeeToEdit.address}
                    onChange={handleEditAddressChange}
                    className="border border-gray-400 rounded-lg px-4 py-2"
                  />
                </div>
              </form>
              <div className="flex items-center justify-end gap-4 text-lg">
                <button
                  className="text-red-500 background-transparent font-bold uppercase"
                  type="button"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white font-bold uppercase px-2 py-1 rounded-lg hover:bg-emerald-400 transition duration-300"
                  type="button"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
