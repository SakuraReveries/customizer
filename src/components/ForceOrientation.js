import PropTypes from 'prop-types';
import { useOrientation } from '@uidotdev/usehooks';

export default function ForceOrientation({
  children,
  allowPortrait = false,
  allowLandscape = false
}) {
  const { type } = useOrientation();

  if (
    type === 'UNKNOWN' ||
    (type.startsWith('portrait') && allowPortrait) ||
    (type.startsWith('landscape') && allowLandscape)
  ) {
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

ForceOrientation.propTypes = {
  children: PropTypes.node.isRequired,
  allowPortrait: PropTypes.bool,
  allowLandscape: PropTypes.bool
};
