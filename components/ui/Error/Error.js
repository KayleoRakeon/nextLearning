/** @format */

import classes from './Error.module.css';

export default function Error(props) {
   return <div className={classes.Error}>{props.error}</div>;
}
