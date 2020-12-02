import React, { createContext, useContext, useEffect, useState } from 'react';
import * as ackeeTracker from 'ackee-tracker';

const AckeeContext = createContext(undefined);

export const useAckee = () => useContext(AckeeContext);

export function Ackee(props) {
  const [ackee] = useState(
    process.env.GATSBY_ACKEE_SERVER && process.env.GATSBY_ACKEE_DOMAIN_ID ? ackeeTracker.create({
      server: process.env.GATSBY_ACKEE_SERVER,
      domainId: process.env.GATSBY_ACKEE_DOMAIN_ID,
    }, {
      ignoreLocalhost: process.env.GATSBY_ACKEE_IGNORE_LOCALHOST !== 'false',
      detailed: process.env.GATSBY_ACKEE_DETAILED !== 'false',
    }) : undefined,
  );

  const [record, setRecord] = useState();

  const navigate = (path) => {
    if (record) {
      record.stop();
    }
    if (ackee) {
      setRecord(ackee.record({
        siteLocation: `${window.location.origin}${path}`,
      }));
    }
  };

  useEffect(() => {
    // first record
    if (ackee) {
      setRecord(ackee.record());
    }
    return () => {
      if (record) {
        record.stop();
      }
    }
  }, [ackee]);

  return (
    <AckeeContext.Provider value={navigate} {...props}/>
  )
}
