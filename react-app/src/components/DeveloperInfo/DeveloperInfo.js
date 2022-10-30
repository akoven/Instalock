import "./DeveloperInfo.css";

function DeveloperInfo() {
  return (
    <div className="dev-info-container">
      <h3 style={{ color: "#8e8e8e" }}>Suggested Developers to Hire</h3>
      <div className="dev-info-box">
        <div className="dev-title-info">
          <div className="dev-photo-container">
            <img
              src="https://i.imgur.com/vLoGlZ2.jpg"
              alt="Dev Profile Picture"
            />
          </div>
          <div className="dev-name">Thomas Anton</div>
        </div>
        <div className="dev-info">
          <a
            href="https://www.linkedin.com/in/thomasanton1224/"
            target="_blank"
          >
            <div className="dev-logo-li">
              <i className="fa-brands fa-xl fa-linkedin"></i>
            </div>
          </a>
          <a href="https://github.com/tanton1224" target="_blank">
            <div className="dev-logo">
              <i className="fa-brands fa-xl fa-github"></i>
            </div>
          </a>
        </div>
      </div>
      <div className="dev-info-box">
        <div className="dev-title-info">
          <div className="dev-photo-container">
            <img
              src="https://i.imgur.com/vGgyK4n.jpg"
              alt="Dev Profile Picture"
            />
          </div>
          <div className="dev-name">Waseem Alame</div>
        </div>
        <div className="dev-info">
          <a href="https://www.linkedin.com/in/waseemalame/" target="_blank">
            <div className="dev-logo-li">
              <i className="fa-brands fa-xl fa-linkedin"></i>
            </div>
          </a>
          <a href="https://github.com/Waseemalame" target="_blank">
            <div className="dev-logo">
              <i className="fa-brands fa-xl fa-github"></i>
            </div>
          </a>
        </div>
      </div>
      <div className="dev-info-box">
        <div className="dev-title-info">
          <div className="dev-photo-container">
            <img
              src="https://i.imgur.com/7ulSNFn.jpg"
              alt="Dev Profile Picture"
            />
          </div>
          <div className="dev-name">Calvin Lieu</div>
        </div>
        <div className="dev-info">
          <a
            href="https://www.linkedin.com/in/calvin-lieu-3049b4228/"
            target="_blank"
          >
            <div className="dev-logo-li">
              <i className="fa-brands fa-xl fa-linkedin"></i>
            </div>
          </a>
          <a href="https://github.com/calvinlieu" target="_blank">
            <div className="dev-logo">
              <i className="fa-brands fa-xl fa-github"></i>
            </div>
          </a>
        </div>
      </div>
      <div className="dev-info-box">
        <div className="dev-title-info">
          <div className="dev-photo-container">
            <img
              src="https://i.imgur.com/j0pVWpF.jpg"
              alt="Dev Profile Picture"
            />
          </div>
          <div className="dev-name">Attiya Kovenburg</div>
        </div>
        <div className="dev-info">
          <a
            href="https://www.linkedin.com/in/attiya-kovenburg-166201129/"
            target="_blank"
          >
            <div className="dev-logo-li">
              <i className="fa-brands fa-xl fa-linkedin"></i>
            </div>
          </a>
          <a href="https://github.com/akoven" target="_blank">
            <div className="dev-logo">
              <i className="fa-brands fa-xl fa-github"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DeveloperInfo;
