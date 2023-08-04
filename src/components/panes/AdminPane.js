import { Form } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

import FormField from 'components/forms/FormField';
import SidebarPane from 'components/panes/SidebarPane';
import useAdminMode from 'hooks/useAdminMode';

export default function AdminPane() {
  const {
    adminMode,
    bgColor,
    innerSleeveColor,
    outerSleeveColor,
    outerSleeveOpacity,
    setBgColor,
    setInnerSleeveColor,
    setOuterSleeveColor,
    setOuterSleeveOpacity
  } = useAdminMode();

  if (!adminMode) {
    return null;
  }

  return (
    <SidebarPane title="Debug">
      <Form>
        <FormField label="Background Color">
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={bgColor}
            onChange={(color) => setBgColor(color.hex)}
          />
        </FormField>
        <FormField label="Inner Sleeve Color">
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={innerSleeveColor}
            onChange={(color) => setInnerSleeveColor(color.hex)}
          />
        </FormField>
        <FormField label="Outer Sleeve Color">
          <SketchPicker
            className="ms-3"
            disableAlpha
            presetColors={[]}
            color={outerSleeveColor}
            onChange={(color) => setOuterSleeveColor(color.hex)}
          />
        </FormField>
        <FormField label="Outer Sleeve Opacity">
          <Form.Range
            min={0}
            max={1.0}
            step={0.01}
            value={outerSleeveOpacity}
            onChange={(event) =>
              setOuterSleeveOpacity(parseFloat(event.target.value))
            }
          />
        </FormField>
      </Form>
    </SidebarPane>
  );
}
