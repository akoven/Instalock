import { NavLink } from 'react-router-dom'
import './DeveloperInfo.css'

function DeveloperInfo() {


    return (
        <div className="dev-info-container">
            <h3 style={{"color": "#8e8e8e"}}>Suggested Developers to Hire</h3>
            <div className='dev-info-box'>
                <div className="dev-title-info">
                    <div className="dev-photo-container">
                        <img src="https://i.imgur.com/vLoGlZ2.jpg" alt="Dev Profile Picture" />
                    </div>
                    <div className='dev-name'>Thomas Anton</div>
                </div>
                <div className="dev-info">
                    <a href='https://www.linkedin.com/in/thomasanton1224/' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/Lmo3dsG.png' alt='linked-in logo'/>
                        </div>
                    </a>
                    <a href='https://github.com/tanton1224' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/ElHz1vI.png' alt='github logo'/>
                        </div>
                    </a>
                </div>
            </div>
            <div className='dev-info-box'>
                <div className="dev-title-info">
                    <div className="dev-photo-container">
                        <img src="https://i.imgur.com/vLoGlZ2.jpg" alt="Dev Profile Picture" />
                    </div>
                    <div className='dev-name'>Waseem Alame</div>
                </div>
                <div className="dev-info">
                    <a href='https://www.linkedin.com/in/thomasanton1224/' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/Lmo3dsG.png' alt='linked-in logo'/>
                        </div>
                    </a>
                    <a href='https://github.com/tanton1224' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/ElHz1vI.png' alt='github logo'/>
                        </div>
                    </a>
                </div>
            </div>
            <div className='dev-info-box'>
                <div className="dev-title-info">
                    <div className="dev-photo-container">
                        <img src="https://i.imgur.com/7ulSNFn.jpg" alt="Dev Profile Picture" />
                    </div>
                    <div className='dev-name'>Calvin Lieu</div>
                </div>
                <div className="dev-info">
                    <a href='https://www.linkedin.com/in/calvin-lieu-3049b4228/' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/Lmo3dsG.png' alt='linked-in logo'/>
                        </div>
                    </a>
                    <a href='https://github.com/calvinlieu' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/ElHz1vI.png' alt='github logo'/>
                        </div>
                    </a>
                </div>
            </div>
            <div className='dev-info-box'>
                <div className="dev-title-info">
                    <div className="dev-photo-container">
                        <img src="https://i.imgur.com/vLoGlZ2.jpg" alt="Dev Profile Picture" />
                    </div>
                    <div className='dev-name'>Attiya Kovenburg</div>
                </div>
                <div className="dev-info">
                    <a href='https://www.linkedin.com/in/thomasanton1224/' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/Lmo3dsG.png' alt='linked-in logo'/>
                        </div>
                    </a>
                    <a href='https://github.com/tanton1224' target='_blank'>
                        <div className='dev-logo' >
                            <img src='https://i.imgur.com/ElHz1vI.png' alt='github logo'/>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default DeveloperInfo
