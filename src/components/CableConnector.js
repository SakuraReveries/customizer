import PropTypes from 'prop-types';

import { cerakoteColors, cncHousingFinishes, heatshrinkColors } from 'utils';
import useModel from 'hooks/useModel';

export default function CableConnector({
  model,
  finish,
  cerakoteColor,
  heatshrinkColor,
  ...props
}) {
  const nodes = useModel({
    path: `./connectors/${model}.3mf`
  });

  return (
    <group {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Heatshrink_R.geometry}>
        <meshPhysicalMaterial
          color={
            heatshrinkColors.find((color) => color.id === heatshrinkColor).hex
          }
          roughness={0.7}
        />
      </mesh>
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
      <mesh castShadow receiveShadow geometry={nodes.Heatshrink_L.geometry}>
        <meshPhysicalMaterial
          color={
            heatshrinkColors.find((color) => color.id === heatshrinkColor).hex
          }
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

CableConnector.propTypes = {
  model: PropTypes.string.isRequired,
  finish: PropTypes.string.isRequired,
  cerakoteColor: PropTypes.string,
  heatshrinkColor: PropTypes.string.isRequired
};
