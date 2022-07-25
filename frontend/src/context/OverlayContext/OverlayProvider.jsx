/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';

const OverLayContext = React.createContext({});

function OverlayProvider(props) {
  const [loading, setLoading] = useState(false);

  const { children } = props;
  return (
    <OverLayContext.Provider
      value={{
        setLoading,
      }}
    >
      {loading && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-[#00000080] flex items-center justify-center z-[1301]">
          <div className="w-[100px] h-[100px] flex flex-col items-center">
            <BounceLoader color="#fff" loading={loading} size={50} />
          </div>
        </div>
      )}
      {children}
    </OverLayContext.Provider>
  );
}

OverlayProvider.propTypes = {
  children: PropTypes.any,
};

export { OverLayContext };
export default OverlayProvider;
