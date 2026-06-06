import { useEffect, useState } from "react";

const ExpiryTimer = ({ expiry_at }) => {
  const [timeLeft, setTimeLeft] = useState(``)
  const [showTimer, setShowTimer] = useState(false)
  useEffect(() => {
    if (!expiry_at) {
      return;
    }
    const calculateTimeLeft = () => {
      const difference = new Date(expiry_at) - new Date()
      if (difference <= 0) {
        setTimeLeft("Expired")
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(difference / (1000 * 60 * 60) % 24)
      const minutes = Math.floor(difference / (1000 * 60) % 60)
      setTimeLeft(`${days} days,${hours} hours, ${minutes} minutes`)
      setShowTimer(true)
    }
    const timer = setInterval(calculateTimeLeft, 30000)
    return () => clearInterval(timer)
  }, [expiry_at])
  return <span>{showTimer && <span>Expires in {timeLeft}  </span>}</span>
}

export default ExpiryTimer
