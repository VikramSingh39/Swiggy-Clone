import { useEffect, useState } from "react";

function UseOnlineStatus(){
  const [onlineStatus, setOnlineStatus] = useState(true);
  useEffect( ()=>{
      window.addEventListener('offline', ()=>{
            setOnlineStatus(false);
      });
      window.addEventListener('online', ()=>{
            setOnlineStatus(true);
      });
  }, []);

  return onlineStatus;
}
export default UseOnlineStatus;