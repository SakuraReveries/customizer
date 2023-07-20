import PropTypes from 'prop-types';

import { cerakoteColors, cncHousingFinishes, heatshrinkColors } from 'utils';
import useModel from 'hooks/useModel';

export default function CableConnector({
  model,
  finish,
  cerakoteColor,
  innerHeatshrink,
  innerHeatshrinkHostColor,
  innerHeatshrinkDeviceColor,
  /* eslint-disable no-unused-vars */
  collarHeatshrink,
  collarHeatshrinkColor,
  collarAccent,
  collarAccentColor,
  /* eslint-enable no-unused-vars */
  ...props
}) {
  const nodes = useModel({
    path: `./connectors/${model}.3mf`
  });

  return (
    <group {...props}>
      {innerHeatshrink && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink_R.geometry}>
          <meshPhysicalMaterial
            color={
              heatshrinkColors.find(
                (color) => color.id === innerHeatshrinkDeviceColor
              ).hex
            }
            roughness={0.7}
            transparent={innerHeatshrinkDeviceColor === 'clear'}
            opacity={innerHeatshrinkDeviceColor === 'clear' ? 0.4 : 1}
          />
        </mesh>
      )}
      <mesh castShadow receiveShadow geometry={nodes.Connector.geometry}>
        <meshPhysicalMaterial
          color={
            finish === 'Cerakote'
              ? cerakoteColors.find((color) => color.id === cerakoteColor).hex
              : cncHousingFinishes[finish].hex
          }
          metalness={finish === 'Cerakote' ? 0.4 : 1}
          roughness={finish === 'Cerakote' ? 0.7 : 0.5}
        />
      </mesh>
      {innerHeatshrink && (
        <mesh castShadow receiveShadow geometry={nodes.Heatshrink_L.geometry}>
          <meshPhysicalMaterial
            color={
              heatshrinkColors.find(
                (color) => color.id === innerHeatshrinkHostColor
              ).hex
            }
            roughness={0.7}
            transparent={innerHeatshrinkHostColor === 'clear'}
            opacity={innerHeatshrinkHostColor === 'clear' ? 0.4 : 1}
          />
        </mesh>
      )}
    </group>
  );
}

CableConnector.propTypes = {
  model: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired,
  cerakoteColor: PropTypes.string,
  innerHeatshrink: PropTypes.bool.isRequired,
  innerHeatshrinkHostColor: PropTypes.string,
  innerHeatshrinkDeviceColor: PropTypes.string,
  collarHeatshrink: PropTypes.bool.isRequired,
  collarHeatshrinkColor: PropTypes.string,
  collarAccent: PropTypes.bool.isRequired,
  collarAccentColor: PropTypes.string
};
