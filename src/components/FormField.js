import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import HelpTooltip from 'components/HelpTooltip';

export default function FormField({
  children,
  label,
  help,
  show = true,
  ...props
}) {
  if (!show) {
    return null;
  }

  return (
    <Form.Group {...props} className="mb-2">
      {Boolean(label) && (
        <Form.Label className="text-light">
          {label}
          {Boolean(help) && <HelpTooltip text={help} />}
        </Form.Label>
      )}
      {children}
    </Form.Group>
  );
}

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  show: PropTypes.boolean
};
