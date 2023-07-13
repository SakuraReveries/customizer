import PropTypes from 'prop-types';

export default function ObjectOptions({ object }) {
  return Object.entries(object).map(([key, val]) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));
}

ObjectOptions.propTypes = {
  object: PropTypes.object.isRequired
};
