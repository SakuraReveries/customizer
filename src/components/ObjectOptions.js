import PropTypes from 'prop-types';

export default function ObjectOptions({ object }) {
  return Object.entries(object).map(([key, val]) =>
    val?.name ? (
      <option key={key} value={key}>
        {val.name}
      </option>
    ) : (
      <option key={key} value={key}>
        {val}
      </option>
    )
  );
}

ObjectOptions.propTypes = {
  object: PropTypes.object.isRequired
};
