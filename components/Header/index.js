import { useEffect, useState } from 'react';
import styles from '../../styles/Header.module.css';
import { isAuth, one_tap_login, authenticate } from '../../actions/auth';
import {  Grid } from '@material-ui/core';


const Header = ({ isAuthenticated }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


 useEffect(() => {
   if(isAuth()){
    setUser(isAuth())
   }
 }, [isAuthenticated])




  return <div className={styles.outercontainer}>
            <Grid container justify="space-between">
              <Grid item>
                 <img src="/vedifly.svg" className={styles.logo} alt="Vedifly"/>
                 <span className={styles.appname}>Vedifly</span>
              </Grid>
              <Grid item>

              </Grid>
            </Grid>
         </div>
}

export default Header;
