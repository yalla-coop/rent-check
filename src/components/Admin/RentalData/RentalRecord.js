import React, { useState, useEffect } from 'react';
import moment from 'moment';

// common components
import Button from '../../Common/Button';

// Styling
import * as S from './RentalData.style';

// constants
import { status as constStatus } from '../../../constants/rentalRecords';

// custom hooks
import useWindowWidth from '../../../hooks/useWindowWidth';

function RentalRecord({ location, history }) {
  const [isTablet, setTablet] = useState(false);

  const { state } = location;
  const { rentalData } = state;
  const {
    additionalComments,
    address,
    annualRent,
    breakClauses,
    createdAt,
    landlord,
    landlordTenantsAct,
    lastRentReview,
    leaseLength,
    nextRentReview,
    postcode,
    priceSqFt,
    restricted,
    serviceCharge,
    specification,
    squareFeet,
    status,
    submittedBy,
    useClass,
  } = rentalData;

  const device = useWindowWidth();

  useEffect(() => {
    setTablet(device.isTablet);
  }, [device]);

  return (
    <>
      <S.TopSection>
        <S.GoBackBtn onClick={() => history.goBack()}>
          {'< Go Back'}
        </S.GoBackBtn>
        <S.BtnWrapper>
          {status && status !== constStatus.VERIFIED && (
            <Button
              text="Approve"
              type="outline"
              color="var(--green)"
              margin="0.5rem"
            />
          )}
          {status && status !== constStatus.REJECTED && (
            <Button
              text="Reject"
              type="outline"
              color="var(--red)"
              margin="0.5rem"
            />
          )}
        </S.BtnWrapper>
      </S.TopSection>
      {state && rentalData ? (
        <>
          <S.Summary>
            <S.Stat>
              <S.Title>Submitted by:</S.Title>
              <S.Data data={submittedBy.email}>
                {submittedBy.email || 'No data'}
              </S.Data>
            </S.Stat>
            <S.Stat>
              <S.Title>Status:</S.Title>
              <S.Data data={status} capitalize>
                {status || 'No data'}
              </S.Data>
            </S.Stat>
            <S.Stat>
              <S.Title>Date submitted:</S.Title>
              <S.Data data={createdAt}>
                {moment(createdAt).format('DD/MM/YYYY') || 'No data'}
              </S.Data>
            </S.Stat>
          </S.Summary>
          <S.MainSection>
            {isTablet ? (
              <S.StyledTable>
                <tbody>
                  <S.Row>
                    <S.TitleTD>Address:</S.TitleTD>
                    <S.DataTD data={address} capitalize>
                      {address || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Annual Rent:</S.TitleTD>
                    <S.DataTD data={annualRent}>
                      {annualRent ? `£${annualRent}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Postcode:</S.TitleTD>
                    <S.DataTD data={postcode}>{postcode || 'No data'}</S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Square Feet:</S.TitleTD>
                    <S.DataTD data={squareFeet}>
                      {squareFeet || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Lease length:</S.TitleTD>
                    <S.DataTD data={leaseLength}>
                      {leaseLength || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Price / sq ft:</S.TitleTD>
                    <S.DataTD data={priceSqFt}>
                      {priceSqFt ? `£${priceSqFt}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Landlord Tenants Act:</S.TitleTD>
                    <S.DataTD data={landlordTenantsAct}>
                      {landlordTenantsAct || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Service Charge:</S.TitleTD>
                    <S.DataTD data={serviceCharge}>
                      {serviceCharge ? `£${priceSqFt}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Date of last rent review:</S.TitleTD>
                    <S.DataTD data={lastRentReview}>
                      {moment(lastRentReview).format('DD/MM/YYYY') || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Use Class:</S.TitleTD>
                    <S.DataTD data={useClass}>{useClass || 'No data'}</S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Date of next rent review:</S.TitleTD>
                    <S.DataTD data={nextRentReview}>
                      {moment(nextRentReview).format('DD/MM/YYYY') || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Restricted:</S.TitleTD>
                    <S.DataTD data={restricted}>
                      {restricted || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Landlord name:</S.TitleTD>
                    <S.DataTD data={landlord} capitalize>
                      {landlord || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Break clauses:</S.TitleTD>
                    <S.DataTD data={breakClauses}>
                      {breakClauses || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Specification:</S.TitleTD>
                    <S.DataTD data={specification}>
                      {specification || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD colSpan={4}>Additional Comments:</S.TitleTD>
                  </S.Row>
                  <S.Row>
                    <S.DataTD colSpan={4} data={additionalComments} long>
                      {additionalComments || 'No comments'}
                    </S.DataTD>
                  </S.Row>
                </tbody>
              </S.StyledTable>
            ) : (
              <S.StyledTable>
                <tbody>
                  <S.Row>
                    <S.TitleTD>Address:</S.TitleTD>
                    <S.DataTD data={address} capitalize>
                      {address || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Annual Rent:</S.TitleTD>
                    <S.DataTD data={annualRent}>
                      {annualRent ? `£${annualRent}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Postcode:</S.TitleTD>
                    <S.DataTD data={postcode}>{postcode || 'No data'}</S.DataTD>
                    <S.TitleTD>Square Feet:</S.TitleTD>
                    <S.DataTD data={squareFeet}>
                      {squareFeet || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Lease length:</S.TitleTD>
                    <S.DataTD data={leaseLength}>
                      {leaseLength || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Price / sq ft:</S.TitleTD>
                    <S.DataTD data={priceSqFt}>
                      {priceSqFt ? `£${priceSqFt}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Landlord Tenants Act:</S.TitleTD>
                    <S.DataTD data={landlordTenantsAct}>
                      {landlordTenantsAct || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Service Charge:</S.TitleTD>
                    <S.DataTD data={serviceCharge}>
                      {serviceCharge ? `£${priceSqFt}` : 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Date of last rent review:</S.TitleTD>
                    <S.DataTD data={lastRentReview}>
                      {moment(lastRentReview).format('DD/MM/YYYY') || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Use Class:</S.TitleTD>
                    <S.DataTD data={useClass}>{useClass || 'No data'}</S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Date of next rent review:</S.TitleTD>
                    <S.DataTD data={nextRentReview}>
                      {moment(nextRentReview).format('DD/MM/YYYY') || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Restricted:</S.TitleTD>
                    <S.DataTD data={restricted}>
                      {restricted || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Landlord name:</S.TitleTD>
                    <S.DataTD data={landlord} capitalize>
                      {landlord || 'No data'}
                    </S.DataTD>
                    <S.TitleTD>Break clauses:</S.TitleTD>
                    <S.DataTD data={breakClauses}>
                      {breakClauses || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD>Specification:</S.TitleTD>
                    <S.DataTD data={specification}>
                      {specification || 'No data'}
                    </S.DataTD>
                  </S.Row>
                  <S.Row>
                    <S.TitleTD colSpan={4}>Additional Comments:</S.TitleTD>
                  </S.Row>
                  <S.Row>
                    <S.DataTD colSpan={4} data={additionalComments} long>
                      {additionalComments || 'No comments'}
                    </S.DataTD>
                  </S.Row>
                </tbody>
              </S.StyledTable>
            )}
          </S.MainSection>
        </>
      ) : (
        <S.MainSection>
          <h3>Sorry, no data found</h3>
        </S.MainSection>
      )}
    </>
  );
}

export default RentalRecord;
