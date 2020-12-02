import { useState, useEffect } from 'react';

const useScrollToAnchor = () => {
  const [scrollMark, setScrollMark] = useState(null);
  // this function takes CSSSelector and callback which
  // is being executed as soon as passed selector matches DOM element
  const whenElementAvailable = elementSelector => cb =>
    document.querySelector(elementSelector)
      ? cb(document.querySelector(elementSelector))
      : setTimeout(() => whenElementAvailable(elementSelector)(cb), 100);

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    setScrollMark(location.hash);

    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)(el =>
        // no smooth scroll needed
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 25,
        })
      );
    }
  }, [scrollMark]);
};

export default useScrollToAnchor;
