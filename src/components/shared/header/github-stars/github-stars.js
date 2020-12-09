import React, { useEffect, useState } from "react";
import styles from './github-stars.module.scss';
import classNames from 'classnames';

export function GithubStars({ className }) {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    fetch('https://api.github.com/repos/getmeli/meli')
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        return res.json();
      })
      .then(repo => {
        setStarCount(repo.stargazers_count);
      })
      .catch(console.error)
  }, []);

  return (
    <div className={classNames(styles.count, className)}>
      {starCount}
    </div>
  )
}
