import PropTypes from 'prop-types';
import { useDetectGPU } from '@react-three/drei';

export default function ForceOrientation({ children }) {
  const gpu = useDetectGPU({
    failIfMajorPerformanceCaveat: true
  });

  if (gpu?.tier > 0) {
    return children;
  } else {
    return (
      <div className="d-flex w-100 h-100 justify-content-center align-items-center bg-secondary">
        <h1 className="display-3 text-light sr-loader-heading">
          Enable Hardware Acceleration
        </h1>
      </div>
    );
  }
}

ForceOrientation.propTypes = {
  children: PropTypes.node.isRequired
};
