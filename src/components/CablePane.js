import { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import ObjectOptions from 'components/ObjectOptions';
import ColorPicker from 'components/ColorPicker';
import {
  cableTypes,
  mdpcxColors,
  techFlexColors,
  alignmentDotColors,
  mdpcxCarbonColors,
  mdpcxLiquidColors
} from 'utils';

export default function CablePane() {
  const { values, setFieldValue, setValues } = useFormikContext();

  const innerSleeveColors = useMemo(
    () => [...mdpcxColors, ...mdpcxCarbonColors],
    []
  );
  const outerSleeveColors = useMemo(
    () => [...techFlexColors, ...mdpcxLiquidColors],
    []
  );

  return (
    <SidebarPane
      title="Cable"
      showFocus
      onFocus={() => setFieldValue('scene.focusOn', 'center')}
    >
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Type</Form.Label>
          <Form.Select
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  model: event.target.value,
                  connector: {
                    ...values.cable.connector,
                    hostDotColor:
                      event.target.value !== 'Charger'
                        ? alignmentDotColors[0].id
                        : null,
                    deviceDotColor:
                      event.target.value !== 'Charger'
                        ? alignmentDotColors[1].id
                        : null
                  }
                }
              }))
            }
            value={values.cable.model}
          >
            <ObjectOptions object={cableTypes} />
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-light">Outer Sleeve?</Form.Label>
          <Form.Switch
            className="text-light ms-3"
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  outerSleeveType: event.target.checked ? 'TechFlex' : null,
                  outerSleeveColor: event.target.checked
                    ? techFlexColors[0].id
                    : null
                }
              }))
            }
            checked={Boolean(values.cable.outerSleeveType)}
          />
        </Form.Group>
        {values.cable.outerSleeveType === 'TechFlex' && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">Opal Sleeve?</Form.Label>
            <Form.Switch
              className="text-light ms-3"
              onChange={(event) =>
                setFieldValue('cable.opalSleeve', event.target.checked)
              }
              checked={values.cable.opalSleeve}
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Base Sleeve Color</Form.Label>
          <ColorPicker
            colors={innerSleeveColors}
            onChange={(color) => setFieldValue('cable.innerSleeveColor', color)}
            value={values.cable.innerSleeveColor}
          />
        </Form.Group>
        {values.cable.outerSleeveType !== null && (
          <Form.Group>
            <Form.Label className="text-light">Outer Sleeve Color</Form.Label>
            <ColorPicker
              colors={outerSleeveColors}
              onChange={(color) =>
                setFieldValue('cable.outerSleeveColor', color)
              }
              value={values.cable.outerSleeveColor}
            />
          </Form.Group>
        )}
      </Form>
    </SidebarPane>
  );
}
