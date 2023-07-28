import PropTypes from 'prop-types';
import { useOrientation } from '@uidotdev/usehooks';

export default function EnsureLandscape({ children }) {
  const { type } = useOrientation();

  if (type === 'UNKNOWN' || type.startsWith('landscape')) {
    return children;
  } else {
    return (
      <div className="d-flex w-100 h-100 justify-content-center align-items-center bg-secondary">
        <h1 className="display-3 text-light sr-loader-heading">
          Rotate Your Device
        </h1>
      </div>
    );
  }
}

EnsureLandscape.propTypes = {
  children: PropTypes.node.isRequired
};
