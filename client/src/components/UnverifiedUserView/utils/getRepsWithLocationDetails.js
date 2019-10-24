import shortid from 'shortid';

export const getRepsWithLocationDetails = repsData => {
  return repsData
    .filter(rep => rep.companyName && rep.companyAddress)
    .map(rep => {
      return {
        key: shortid.generate(),
        name: rep.name,
        company: `${rep.companyName}, ${rep.companyAddress.addressLine1}`,
      };
    });
};
