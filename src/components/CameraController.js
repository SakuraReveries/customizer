import PropTypes from 'prop-types';
import { useBounds } from '@react-three/drei';
import { useEffect } from 'react';

export default function CameraController({ refs, focusOn }) {
  const bounds = useBounds();

  useEffect(() => {
    const ref = refs[focusOn];

    if (!ref.current) {
      return;
    }

    bounds.refresh(ref.current).clip().fit();
  }, [bounds, refs, focusOn]);

  return null;
}

CameraController.propTypes = {
  refs: PropTypes.object.isRequired,
  focusOn: PropTypes.string.isRequired
};
