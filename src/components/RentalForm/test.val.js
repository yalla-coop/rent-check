const yup = require('yup');
const moment = require('moment');

const schema = yup.object({
  isBig: yup.date(),
  count: yup.date().min(yup.ref('isBig')),
  // count: yup.date().when('isBig', {
  //   is: val => {
  //     console.log('val', val);
  //     return val == moment().toDate();
  //   },
  //   then: yup.date().min(yup.ref('isBig')),
  //   // otherwise: yup.number().min(0),
  // }),
});

const validate1 = async () => {
  try {
    const shit = await schema.validate({
      isBig: '2019-11-11',
      count: '2019-11-12',
    });
    console.log('hi', shit);
  } catch (errs) {
    console.log('errs', errs);
  }
};

validate1();
