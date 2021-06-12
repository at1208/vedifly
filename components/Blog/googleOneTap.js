import { useEffect } from 'react';
import { one_tap_login,
         authenticate,
         isAuth} from '../../actions/auth';

const GoogleOneTap = () => {
  const handleOnetapResponse = (response) => {
    one_tap_login({ googleToken: response.credential, domain: process.env.NEXT_PUBLIC_DOMAIN_ID  })
      .then(result => {
        authenticate(result, () => {
           setIsAuthenticated(true)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
  if(!isAuth()){
      window.onload = function () {
         google.accounts.id.initialize({
           client_id:process.env.NEXT_PUBLIC_GOOGLE_CLIEND_ID,
           callback: handleOnetapResponse
         });
       }
  }
  }, [])
 return <>
        </>
}

export default GoogleOneTap;
