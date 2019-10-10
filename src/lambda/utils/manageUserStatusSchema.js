import * as yup from 'yup';
import { statusEnum } from '../../constants/users';
import isMongoId from './isValidMongoID';

const manageUserStatusSchema = yup.object().shape({
  user: yup
    .string()
    .test('isMongoId', 'userId is not valid mongoId', function test(value) {
      return isMongoId(value);
    })
    .required('Required'),
  action: yup
    .string()
    .oneOf(['approve', 'reject'], 'must be reject or approve')
    .required('Required'),
  userStatus: yup
    .string()
    .oneOf(statusEnum, 'must be valid user status')
    .required('Required'),
});

export default manageUserStatusSchema;
