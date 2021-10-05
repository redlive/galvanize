const yup = require('yup');

module.exports.productSchema = yup.object().shape({
  name: yup.string().required('Error in product name'),
  price: yup.number().required('Error in product price').min(0),
  description: yup.string('Error in product description').required(),
});