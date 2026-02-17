import Sidebar from "./Sidebar";

function HallTable() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h2>Hall List</h2>

        <table>
          <thead>
            <tr>
              <th>Hall Name</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hall A</td>
              <td>40</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HallTable;
