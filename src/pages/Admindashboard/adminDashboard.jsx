import React, {useState, useEffect} from "react";
import axios from "axios";
import { getToken } from "../../../utils/tokenService";
import { BaseUrl } from "../../../Baseconfig";

const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");
import { Mode } from '../../AppContext'
import { useContext } from 'react'

const AdminDashboard = () => {

    const externalToken = sessionStorage.getItem("token");

const [dashboardData, setDashboardData] = useState({
  users: [],
  posts: [],
  messages: [],
  comments: []
});

   useEffect(() => {
  const fetchAdminData = async () => {
    try {
      const token = getToken();

      const res = await axios.get(
        `${API_BASE}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboardData(res.data); // store response
      console.log(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchAdminData();
}, []);

        const LoginStatus = useContext(Mode);
    
        if(!externalToken){
          LoginStatus.setIsLoggedin(false);
        }else {
          LoginStatus.setIsLoggedin(true);
        };
    

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
         <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-2xl mt-2">{dashboardData.users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Total Posts</h2>
        <p className="text-2xl mt-2">{dashboardData.posts.length}</p>
       </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-2xl mt-2">{dashboardData.messages.length}</p>
        </div>
      </div>

            <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">User Messages</h2>

                {dashboardData.messages.length === 0 ? (
                <p>No messages yet</p>
                ) : (
                dashboardData.messages.map((msg) => (
                  <div key={msg.id} className="border-b py-3">
                    <p className="font-semibold">{msg.fullName}</p>
                    <p className="text-gray-600">{msg.email}</p>
                    <p className="mt-2">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

    </div>

  );
};

export default AdminDashboard;