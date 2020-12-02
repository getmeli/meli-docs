import { useEffect, useState } from 'react';

const useLandmark = (deps = []) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const headings = document.querySelectorAll('h2');
    let data = [];
    headings.forEach(heading => {
      data.push({
        title: heading.innerText,
        path: heading.id,
      });
    });
    setLinks(data);
  }, deps);
  return links;
};

export default useLandmark;
