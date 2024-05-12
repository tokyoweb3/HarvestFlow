import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import firstPage from "@assets/images/Top/start.png";

function RedPage() {
  const [fade, setFade] = useState(false);
  const navigation = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (pageRef.current && !pageRef.current.contains(event.target)) {
        setFade(true);
        setTimeout(() => {
          navigation("/En");
        }, 1000);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = () => {
    setFade(true);
    setTimeout(() => {
      navigation("/En");
    }, 1000);
  };

  return (
    <div ref={pageRef} className={`first-page ${fade ? "fade-out" : ""}`}>
      <img src={firstPage} style={{ width: "100%" }} onClick={handleClick} />
    </div>
  );
}

export default RedPage;
