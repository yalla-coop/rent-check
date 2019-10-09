import * as yup from 'yup';
import { statusEnum } from '../../constants/rentalRecords';
// import isMongoId from './isValidMongoID';

const manageUserStatusSchema = yup.object().shape({
  rentalId: yup
    .string()
    .test('isMongoId', 'rentalId is not a valid mongoId', function test(value) {
      // return isMongoId(value);
    })
    .required('Required'),

  newStatus: yup
    .string()
    .oneOf(statusEnum, 'must one of the accepted status values')
    .required('Required'),
});

export default manageUserStatusSchema;
