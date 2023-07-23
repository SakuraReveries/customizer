import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';

import SidebarPane from 'components/SidebarPane';
import ObjectOptions from 'components/ObjectOptions';
import ColorPicker from 'components/ColorPicker';
import {
  cableTypes,
  mdpcxColors,
  techFlexColors,
  opalColors,
  sleeveTypes,
  alignmentDotColors
} from 'utils';

export default function CablePane() {
  const { values, setFieldValue, setValues } = useFormikContext();

  const innerSleeveColors =
    values.cable.innerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;
  const outerSleeveColors =
    values.cable.outerSleeveType === 'TechFlex' ? techFlexColors : mdpcxColors;

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
          <Form.Label className="text-light">Outer Sleeve</Form.Label>
          <Form.Switch
            className="text-light ms-3"
            label={sleeveTypes[values.cable.outerSleeveType]}
            onChange={(event) =>
              setValues((values) => ({
                ...values,
                cable: {
                  ...values.cable,
                  outerSleeveType: event.target.checked ? 'MDPC_X' : 'TechFlex',
                  outerSleeveColor: event.target.checked
                    ? mdpcxColors[0].id
                    : techFlexColors[0].id
                }
              }))
            }
            checked={values.cable.outerSleeveType === 'MDPC_X'}
          />
        </Form.Group>
        {values.cable.outerSleeveType === 'TechFlex' && (
          <Form.Group className="mb-2">
            <Form.Switch
              className="text-light ms-3"
              label="Opal Sleeve?"
              onChange={(event) =>
                setValues((values) => ({
                  ...values,
                  cable: {
                    ...values.cable,
                    opalSleeve: event.target.checked,
                    opalSleeveColor: event.target.checked
                      ? opalColors[0].id
                      : null
                  }
                }))
              }
              checked={values.cable.opalSleeve}
            />
          </Form.Group>
        )}
        {values.cable.opalSleeve && (
          <Form.Group className="mb-2">
            <Form.Label className="text-light">Opal Sleeve Color</Form.Label>
            <ColorPicker
              colors={opalColors}
              onChange={(color) =>
                setFieldValue('cable.opalSleeveColor', color)
              }
              value={values.cable.opalSleeveColor}
            />
          </Form.Group>
        )}
        <Form.Group className="mb-2">
          <Form.Label className="text-light">Outer Sleeve Color</Form.Label>
          <ColorPicker
            colors={outerSleeveColors}
            onChange={(color) => setFieldValue('cable.outerSleeveColor', color)}
            value={values.cable.outerSleeveColor}
          />
        </Form.Group>
        {values.cable.outerSleeveType === 'TechFlex' && (
          <Form.Group>
            <Form.Label className="text-light">Inner Sleeve Color</Form.Label>
            <ColorPicker
              colors={innerSleeveColors}
              onChange={(color) =>
                setFieldValue('cable.innerSleeveColor', color)
              }
              value={values.cable.innerSleeveColor}
            />
          </Form.Group>
        )}
      </Form>
    </SidebarPane>
  );
}
