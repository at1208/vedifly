import Image from 'next/image'
import Typography from '@material-ui/core/Typography';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from '../../../styles/BlogAuthor.module.css';
import Avatar from '../../Core/avatar';

const Author = ({ author }) => {
  if(author){
    return <div className="col-3 mb-3 col-sm-3">
             <div>
             <Avatar name={author.postedBy.full_name} src={author.postedBy.headshot_url} alt="" className={styles.authorImage}/>
             </div>
             <Typography  noWrap className={styles.authorname}>
              {author.postedBy.full_name}
            </Typography>
           </div>
  }else{
    return <>
           </>
  }

}
export default Author;
