import { useEffect, useState } from 'react';
import styles from '../../styles/Header.module.css';
import { isAuth, signout } from '../../actions/auth';
import { Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';


const Header = ({ isAuthenticated }) => {
  const [user, setUser] = useState();

 useEffect(() => {
   if(isAuth()){
    setUser(isAuth())
   }
 }, [isAuthenticated])

  const menu = (
    <Menu>
      <Menu.Item key="0">
         <button className={styles.menuitem} onClick={() => signout(() => window.location.reload())}>Logout</button>
      </Menu.Item>
    </Menu>
  );



  return <div className={styles.outercontainer}>
            <div className="row">
              <div className="col-10 row col-md-10 col-sm-10">
               <img src="/vedifly.svg" className={styles.logo}/>
                <div>
                <h1 className={styles.appname}>Vedifly</h1>
                </div>
              </div>
              <div className="col-2 col-md-2 col-sm-2">
                  {user && <div className="row justify-content-end">
                     <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         <img src={user[0] && user[0].picture} className={styles.picture} alt="DP"  />
                        </a>
                      </Dropdown>
                  </div>}
              </div>
            </div>
         </div>
}

export default Header;
