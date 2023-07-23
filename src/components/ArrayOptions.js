import PropTypes from 'prop-types';

export default function ArrayOptions({
  array,
  keyKey = 'id',
  valueKey = 'name'
}) {
  return array.map(({ [keyKey]: key, [valueKey]: val }) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));
}

ArrayOptions.propTypes = {
  array: PropTypes.array.isRequired,
  keyKey: PropTypes.string,
  valueKey: PropTypes.string
};
