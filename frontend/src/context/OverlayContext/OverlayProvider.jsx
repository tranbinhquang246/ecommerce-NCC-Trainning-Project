import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BounceLoader from 'react-spinners/BounceLoader';
import { Loading, Spinner } from './styles';

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
        <Loading>
          <Spinner>
            <BounceLoader color="#fff" loading={loading} size={50} />
          </Spinner>
        </Loading>
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
