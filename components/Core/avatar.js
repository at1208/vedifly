import React from 'react';
import { Avatar } from '@material-ui/core';

export const avatarStyle = (index) => {
  if (index % 5 === 0) {
    return {
      backgroundColor: '#FCF0EF',
      width: '60px',
      fontSize:"25px",
      textTransform:"capitalize",
      height: '60px',
      margin:"0px 3px 0px 3px",
      color: '#E66E68',
      borderRadius: '30px',
    };
  } else if (index % 3 === 0) {
    return {
      backgroundColor: '#FFFABB',
      width: '60px',
      fontSize:"25px",
      textTransform:"capitalize",
      height: '60px',
      margin:"0px 3px 0px 3px",
      color: '#FFD502',
      borderRadius: '30px',
    };
  } else if (index % 2 === 0) {
    return {
      backgroundColor: '#CAFFE6',
      width: '60px',
      fontSize:"25px",
      textTransform:"uppercase",
      height: '60px',
      margin:"0px 3px 0px 3px",
      color: '#34F89C',
      borderRadius: '30px',
    };
  } else if (index % 1 === 0) {
    return {
      backgroundColor: '#CAF0FF',
      width: '60px',
      fontSize:"25px",
      margin:"0px 3px 0px 3px",
      textTransform:"capitalize",
      height: '60px',
      color: '#3BC8FF',
      borderRadius: '30px',
    };
  }
};



const AvatarContainer = ({ name, src }) => {
  let naam = name.split(" ");
  if(name){
    return <>
            <Avatar style={avatarStyle(name.length)} variant="square" src={src}>
              {naam[0][0]}{naam[1][0]}
            </Avatar>
           </>
  }else{
    return <>
          </>
  }

}

export default AvatarContainer;
