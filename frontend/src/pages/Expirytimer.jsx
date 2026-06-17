import { useEffect, useState } from "react";

const ExpiryTimer = ({ expiry_at, pid }) => {
  const [timeLeft, setTimeLeft] = useState(``)
  const [showTimer, setShowTimer] = useState(false)
  useEffect(() => {
    if (!expiry_at) {
      return;
    }
    const calculateTimeLeft = async () => {
      if (expiry_at != null) {
        const difference = new Date(expiry_at) - new Date()
        if (difference <= 0) {
          setTimeLeft("Expired")
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vault/${pid}`, {
            method: "DELETE",
            credentials: "include"
          })
          const text = await response.text()
          window.location.reload()
          return;
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24)
        const minutes = Math.floor(difference / (1000 * 60) % 60)
        setTimeLeft(`${days} days,${hours} hours, ${minutes} minutes`)
        setShowTimer(true)
      }
      calculateTimeLeft()
      setShowTimer(true)
      const timer = setInterval(calculateTimeLeft, 10000)
      return () => clearInterval(timer)
    }
  }, [expiry_at])
  return <span>{showTimer && <span>Expires in {timeLeft}  </span>}</span>
}

export default ExpiryTimer
