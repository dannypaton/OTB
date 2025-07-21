import React from "react";
import styled from "styled-components";

interface CountryData {
  name: string;
  currencySymbol: string;
  currencyName: string;
  coatOfArms: string;
  flag: string;
}

const CountryDetails: React.FC<{ country: CountryData | null }> = ({
  country,
}) => {
  if (!country) return <Placeholder>Select a country</Placeholder>;

  return (
    <DetailsFlex>
      <TopRow>
        <NameBox>{country.name}</NameBox>
        <CurrencyBox>
          <CurrencySymbol>{country.currencySymbol}</CurrencySymbol>
          <CurrencyName>{country.currencyName}</CurrencyName>
        </CurrencyBox>
      </TopRow>
      <BottomRow>
        <CoatBox>
          <CoatImage src={country.coatOfArms} alt="Coat of Arms" />
        </CoatBox>
        <FlagBox>
          <FlagImage src={country.flag} alt="Flag" />
        </FlagBox>
      </BottomRow>
    </DetailsFlex>
  );
};

const DetailsFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
  gap: 0.5rem;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
`;

const NameBox = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #fff;
  font-size: 3.3rem;
  font-weight: bold;
  border-radius: 0.5rem;
  min-height: 10rem;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const CurrencyBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  border-radius: 0.5rem;
  text-transform: uppercase;
  text-align: center;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
`;

const CoatBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  border-radius: 0.5rem;
`;

const CoatImage = styled.img`
  height: 7rem;
  object-fit: contain;
`;

const FlagBox = styled.div`
  flex: 2;
  display: flex;
`;

const FlagImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
`;

const CurrencySymbol = styled.span`
  font-size: 3.5rem;
  font-weight: bold;
`;

const CurrencyName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const Placeholder = styled.div`
  text-align: center;
  color: #bdbdbd;
`;

export default CountryDetails;
