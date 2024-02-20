import { useEffect, useRef, useState } from "react";
import api from "../../services/api.service"
import { user } from "../../util/types"

export const Admin = () => {
  const [userData, setUserData] = useState<user>();
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      fetchData();
    }
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/users/1'); 
      setUserData(response.data.user);
      console.log('Data received:', response);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  
  return (
    <div>Admins Home page <br />
      {/* Show the list of users */}
      Showing user details <br />
      {userData?.username} <br />
      {userData?.email}
    </div>
  )
}
