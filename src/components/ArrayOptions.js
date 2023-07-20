import PropTypes from 'prop-types';

export default function ArrayOptions({ array, keyKey, valueKey }) {
  return array.map(({ [keyKey]: key, [valueKey]: val }) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));
}

ArrayOptions.propTypes = {
  array: PropTypes.array.isRequired,
  keyKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired
};
