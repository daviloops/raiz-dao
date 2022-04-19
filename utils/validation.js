const _ = require('lodash');

const validate = (errors, val) => errors && (val ? !_.isEmpty(errors[val]) : !_.isEmpty(errors));

export default validate;
