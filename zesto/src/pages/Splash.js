import { useEffect } from 'react';
import './Splash.css';
import { useNavigate } from 'react-router-dom';

function Splash() {
    const navigate = useNavigate();


    useEffect(() => {
        const metaTag = document.querySelector('meta[name="theme-color"]');
        if (metaTag) {
          metaTag.setAttribute('content', '#005EB8');
        }
      // Redirect to /home after 2 seconds
    const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);
  
      // Cleanup the timer
      return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="Splash">
            <div className="text">
                <div>
                    <div className="logo">Zesto</div>
                    <div className="tagline">Aapka Business, Hamara Bharosa!</div>
                </div>
            </div>
        </div>
    );
}

export default Splash;