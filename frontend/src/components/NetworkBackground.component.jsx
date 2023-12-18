import NET from "vanta/dist/vanta.net.min";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

NetworkBackground.propTypes = {
    children: PropTypes.node
};

function NetworkBackground(props) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: backgroundRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3c62ae,
          backgroundColor: 0x000000,
          points: 15.0,
          maxDistance: 20.0,
          spacing: 15.0,
          // showDots: false
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={backgroundRef}
      className="vh-100 text-white"
      style={{ backgroundColor: "#070e18" }}
    >
      {/* style={{ backgroundImage: `url(${network})`, backgroundSize: 'cover', backgroundPosition: 'center' }} */}
      {props.children}
    </div>
  );
}

export default NetworkBackground;
