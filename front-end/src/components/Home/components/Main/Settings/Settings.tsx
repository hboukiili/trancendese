import './Settings.scss'
import GradienBox from '../../../../../tools/GradienBox'
import image from './image.svg'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
const BackHome = () => {
    return (
        <svg width="0.938rem" height="0.938rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.26941 0.309043C4.10711 0 5.15474 0 7.25 0C9.34526 0 10.3929 0 11.2306 0.309043C12.6029 0.815313 13.6847 1.89711 14.191 3.26941C14.5 4.10711 14.5 5.15474 14.5 7.25C14.5 9.34526 14.5 10.3929 14.191 11.2306C13.6847 12.6029 12.6029 13.6847 11.2306 14.191C10.3929 14.5 9.34526 14.5 7.25 14.5C5.15474 14.5 4.10711 14.5 3.26941 14.191C1.89711 13.6847 0.815313 12.6029 0.309044 11.2306C0 10.3929 0 9.34526 0 7.25C0 5.15474 0 4.10711 0.309044 3.26941C0.815313 1.89711 1.89711 0.815313 3.26941 0.309043ZM7.10515 5.08259C7.39804 4.78969 7.39804 4.31482 7.10514 4.02193C6.81225 3.72904 6.33737 3.72904 6.04448 4.02194L3.34681 6.71966C3.05392 7.01255 3.05392 7.48742 3.34681 7.78031L6.04449 10.478C6.33738 10.7709 6.81225 10.7709 7.10515 10.478C7.39804 10.1851 7.39804 9.71022 7.10515 9.41733L5.6878 7.99998H10.6213C11.0355 7.99998 11.3713 7.6642 11.3713 7.24998C11.3713 6.83577 11.0355 6.49998 10.6213 6.49998H5.68778L7.10515 5.08259Z" fill="#F9C690" />
        </svg>

    )
}
const Pen = () => {
    return (<svg width="1.938rem" height="1.938rem" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.642 7.2809C17.7388 6.18414 19.517 6.18414 20.6138 7.2809L22.6467 9.31381C23.7435 10.4106 23.7434 12.1888 22.6467 13.2855L12.7368 23.1954C12.5613 23.3709 12.3232 23.4696 12.0749 23.4696H7.39415C6.87713 23.4696 6.45801 23.0505 6.45801 22.5334V17.8527C6.45801 17.6044 6.55664 17.3663 6.7322 17.1907L16.642 7.2809ZM19.2899 8.60481C18.9243 8.23922 18.3315 8.23922 17.966 8.60481L17.304 7.94286L17.966 8.60481L8.3303 18.2405V21.5973H11.6871L21.3228 11.9616C21.6884 11.596 21.6884 11.0033 21.3228 10.6377L19.2899 8.60481L19.9518 7.94286L19.2899 8.60481Z" fill="white" />
    </svg>
    )
}
const IconName = () => {
    return (
        <svg width="1.125rem" height="1.375rem" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4.75C4 2.12665 6.12665 0 8.75 0C11.3734 0 13.5 2.12665 13.5 4.75C13.5 7.37335 11.3734 9.5 8.75 9.5C6.12665 9.5 4 7.37335 4 4.75Z" fill="white" />
            <path d="M5.7 12C2.55198 12 0 14.552 0 17.7V17.7C0 19.7987 1.70132 21.5 3.8 21.5H13.7C15.7987 21.5 17.5 19.7987 17.5 17.7V17.7C17.5 14.552 14.948 12 11.8 12H5.7Z" fill="white" />
        </svg>
    )
}
const Password = () => (
    <svg width="1.188rem" height="1.188rem" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.5 2.32434e-07L9.47562 1.13225e-07C8.85601 -4.23791e-06 8.35617 -7.75459e-06 7.94864 0.0255004C7.52978 0.051717 7.15852 0.106945 6.80406 0.240353C5.79338 0.620747 4.99575 1.41838 4.61535 2.42906C4.48195 2.78352 4.42672 3.15478 4.4005 3.57364C4.37499 3.98117 4.375 4.48101 4.375 5.10062V5.125V5.43614C3.88692 5.49872 3.49829 5.60368 3.15279 5.77972C2.40014 6.16322 1.78822 6.77514 1.40472 7.52779C0.96875 8.38344 0.96875 9.50354 0.96875 11.7438V12.5063C0.96875 14.7465 0.96875 15.8666 1.40472 16.7222C1.78822 17.4749 2.40014 18.0868 3.15279 18.4703C4.00844 18.9062 5.12854 18.9062 7.36875 18.9062H11.6313C13.8715 18.9062 14.9916 18.9062 15.8472 18.4703C16.5999 18.0868 17.2118 17.4749 17.5953 16.7222C18.0312 15.8666 18.0312 14.7465 18.0312 12.5063V11.7438C18.0312 9.50354 18.0312 8.38344 17.5953 7.52779C17.2118 6.77514 16.5999 6.16322 15.8472 5.77972C15.5017 5.60368 15.1131 5.49872 14.625 5.43614V5.125V5.10064C14.625 4.48102 14.625 3.98118 14.5995 3.57364C14.5733 3.15478 14.5181 2.78352 14.3846 2.42906C14.0043 1.41838 13.2066 0.620747 12.1959 0.240353C11.8415 0.106945 11.4702 0.051717 11.0514 0.0255004C10.6438 -7.75459e-06 10.144 -4.23791e-06 9.52438 1.13225e-07L9.5 2.32434e-07ZM13.125 5.35072V5.125C13.125 4.47532 13.1247 4.02248 13.1024 3.66734C13.0806 3.31819 13.0397 3.11386 12.9808 2.95744C12.7526 2.35103 12.274 1.87245 11.6676 1.64421C11.5111 1.58534 11.3068 1.54442 10.9577 1.52257C10.6025 1.50034 10.1497 1.5 9.5 1.5C8.85032 1.5 8.39748 1.50034 8.04234 1.52257C7.69319 1.54442 7.48886 1.58534 7.33244 1.64421C6.72603 1.87245 6.24745 2.35103 6.01921 2.95744C5.96034 3.11386 5.91942 3.31819 5.89757 3.66734C5.87534 4.02248 5.875 4.47532 5.875 5.125V5.35072C6.31093 5.34375 6.80428 5.34375 7.36875 5.34375H11.6312C12.1957 5.34375 12.6891 5.34375 13.125 5.35072ZM9.5 10.5938C9.86244 10.5938 10.1562 10.8876 10.1562 11.25V13C10.1562 13.3624 9.86244 13.6562 9.5 13.6562C9.13756 13.6562 8.84375 13.3624 8.84375 13V11.25C8.84375 10.8876 9.13756 10.5938 9.5 10.5938Z" fill="white" />
    </svg>

)
const Email = () => (
    <svg width="1.375rem" height="1.25rem" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.73005 0.544967C3.79961 0 5.19974 0 8 0H13.5C16.3003 0 17.7004 0 18.77 0.544967C19.7108 1.02433 20.4757 1.78924 20.955 2.73005C21.5 3.79961 21.5 5.19974 21.5 8V11.5C21.5 14.3003 21.5 15.7004 20.955 16.77C20.4757 17.7108 19.7108 18.4757 18.77 18.955C17.7004 19.5 16.3003 19.5 13.5 19.5H8C5.19974 19.5 3.79961 19.5 2.73005 18.955C1.78924 18.4757 1.02433 17.7108 0.544967 16.77C0 15.7004 0 14.3003 0 11.5V8C0 5.19974 0 3.79961 0.544967 2.73005C1.02433 1.78924 1.78924 1.02433 2.73005 0.544967ZM5.16603 5.12596C4.82138 4.8962 4.35573 4.98933 4.12596 5.33397C3.8962 5.67862 3.98933 6.14427 4.33397 6.37404L5.33397 7.0407L5.45034 7.11829L5.45034 7.1183C6.94864 8.11738 7.84026 8.71194 8.80274 9.00192C10.0727 9.38456 11.4273 9.38456 12.6973 9.00192C13.6597 8.71194 14.5514 8.11738 16.0496 7.1183L16.0497 7.11829L16.166 7.0407L17.166 6.37404C17.5107 6.14427 17.6038 5.67862 17.374 5.33397C17.1443 4.98933 16.6786 4.8962 16.334 5.12596L15.334 5.79263C13.6837 6.89281 12.9867 7.34812 12.2645 7.56569C11.2768 7.8633 10.2232 7.8633 9.23547 7.56569C8.51334 7.34812 7.8163 6.89281 6.16603 5.79263L6.16597 5.79259L5.16603 5.12596Z" fill="white" />
    </svg>

)
const Edit = () => {
    return (
        <svg width="1.313rem" height="1.313rem" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.8787 0.878679C14.0503 -0.292895 15.9497 -0.292891 17.1213 0.878681L19.2929 3.05025C20.4645 4.22183 20.4645 6.12132 19.2929 7.29289L11.7071 14.8787C11.5196 15.0662 11.2652 15.1716 11 15.1716H6C5.44772 15.1716 5 14.7239 5 14.1716V9.17157C5 8.90636 5.10536 8.652 5.29289 8.46447L12.8787 0.878679ZM15.7071 2.29289C15.3166 1.90237 14.6834 1.90237 14.2929 2.29289L7 9.58579V13.1716H10.5858L17.8787 5.87868C18.2692 5.48815 18.2692 4.85499 17.8787 4.46447L15.7071 2.29289L16.2283 1.77173L15.7071 2.29289ZM5 2.17157C3.34315 2.17157 2 3.51472 2 5.17157V15.1716C2 16.8284 3.34315 18.1716 5 18.1716H15C16.6569 18.1716 18 16.8284 18 15.1716V12.1716C18 11.6193 18.4477 11.1716 19 11.1716C19.5523 11.1716 20 11.6193 20 12.1716V15.1716C20 17.933 17.7614 20.1716 15 20.1716H5C2.23858 20.1716 0 17.933 0 15.1716V5.17157C0 2.41015 2.23858 0.171574 5 0.171574H8C8.55228 0.171574 9 0.619289 9 1.17157C9 1.72386 8.55228 2.17157 8 2.17157H5Z" fill="white" fillOpacity="0.5" />
        </svg>
    )

}
function Settings() {
    const Admin = useSelector((state: any) => state.admin);
    const [LinkGoogle, setLinkGoogle] = useState(true);
    const [isOff, setisOff] = useState(false);

    const handleChange = (event: any) => {
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
        } else {
            console.log('⛔️ Checkbox is NOT checked');
        }
        setLinkGoogle(current => !current);
    };
    console.log(Admin);
    return (
        <div className="settings-Container">
            <div className="header-settings">
                <h1>Settings</h1>
                <div className='backHome-cont'>
                    <Link to='/' className="backHome">
                        <BackHome />
                        <p>Back to home</p>
                    </Link>
                </div>
            </div>
            <GradienBox mywidth="1201px" myheight="365px" myborder="40px">
                <div className="AccountSettings">
                    <h2>Account</h2>
                    <div className="account-set">
                        <div style={{ backgroundImage: "url(" + Admin.avatar + ')' }} className="image-pro-settings">
                            <button className="editAv">EDIT<br />AVATAR</button>
                            <button className='Pen'><div className="penC"><Pen /></div></button>
                        </div>
                        <div className="edit-NEP">
                            <div className="input-settings">
                                <GradienBox mywidth="59px" myheight="59px" myborder="25px">
                                    <div className="icon-edit">
                                        <IconName />
                                    </div>
                                </GradienBox>
                                <GradienBox mywidth="480px" myheight="59px" myborder="25px">
                                    <div className="inputContent"><input placeholder={Admin.login} type="text" /><button><Edit /></button></div>

                                </GradienBox>
                            </div>
                            <div className="input-settings">
                                <GradienBox mywidth="59px" myheight="59px" myborder="25px">
                                    <div className="icon-edit">
                                        <Password />
                                    </div>
                                </GradienBox>
                                <GradienBox mywidth="480px" myheight="59px" myborder="25px">
                                    <div className="inputContent"><input placeholder='**********' type="password" /><button><Edit /></button></div>

                                </GradienBox>
                            </div>
                            <div className="input-settings">
                                <GradienBox mywidth="59px" myheight="59px" myborder="25px">
                                    <div className="icon-edit">
                                        <Email />
                                    </div>
                                </GradienBox>
                                <GradienBox mywidth="480px" myheight="59px" myborder="25px">
                                    <div className="inputContent"><input placeholder='tehsusrhist@gmail.com' type="text" /><button><Edit /></button></div>

                                </GradienBox>
                            </div>
                        </div>
                    </div>
                </div>
            </GradienBox>
            <div className="con-act">
                <GradienBox mywidth="559px" myheight="338px" myborder="40px">
                    <div className="con-act-cont">
                        <h1>Account Connectivity</h1>
                        <div className="center-cont-act">
                            <h2>Link Account with Google</h2>
                            <label className="switch" htmlFor="checkbox">
                                <input onChange={handleChange} className='toogleInput' type="checkbox" id="checkbox" />
                                <div className="slider round"></div>
                            </label>
                        </div>
                        <div className="bottom-cont bottom-update">
                            <h2>Default Status</h2>
                            <div className="button-switch">
                                <div className={!isOff ? "switch-back offline-active-btn" : 'switch-back online-active-btn'} />
                                <button onClick={() => !isOff && setisOff(true)} className='online-btn'>Offline</button>
                                <button onClick={() => isOff && setisOff(false)} className='offline-btn'>Online</button>
                            </div>
                        </div>
                    </div>
                </GradienBox>
                <GradienBox mywidth="559px" myheight="338px" myborder="40px">
                    <div className="con-act-cont">
                        <h1>Account Management</h1>
                        <div className="center-cont-act">
                            <h2>Blocked Accounts</h2>
                            <button className="showListC">
                                <div className='showlist' style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>Show list</div>
                            </button>
                        </div>
                        <div className="bottom-cont">
                            <button className="deleteAccount">
                                <div className="deleteAcountU">Delete Account</div>
                            </button>
                        </div>
                    </div>
                </GradienBox>
            </div>
        </div>
    )
}
export default Settings;