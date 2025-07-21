"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CountrySelector from "@/components/CountrySelector";
import CountryDetails from "@/components/CountryDetails";

const COUNTRY_LIST = ["Canada", "Thailand", "Spain"];

interface CountryData {
  name: string;
  currencySymbol: string;
  currencyName: string;
  coatOfArms: string;
  flag: string;
}

export default function Home() {
  const [selected, setSelected] = useState<string>(COUNTRY_LIST[0]);
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountry() {
      setLoading(true);
      setError(null);
      setCountryData(null);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${selected.toLowerCase()}?fields=name,currencies,flags,coatOfArms`
        );
        if (!res.ok) throw new Error("Failed to fetch country data");
        const data = await res.json();
        const country = data[0];
        // Get currency info
        const currencyKey = country.currencies
          ? Object.keys(country.currencies)[0]
          : "";
        const currency = country.currencies
          ? country.currencies[currencyKey]
          : { symbol: "", name: "" };
        setCountryData({
          name: country.name.common,
          currencySymbol: currency.symbol || "",
          currencyName: currency.name || "",
          coatOfArms: country.coatOfArms?.png || "",
          flag: country.flags?.png || "",
        });
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchCountry();
  }, [selected]);

  return (
    <PageWrapper>
      {loading || !countryData ? (
        <LoadingText>Loading...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <CountrySelector
            countries={COUNTRY_LIST}
            selected={selected}
            onSelect={setSelected}
          />
          <ContentWrapper>
            <CountryDetails country={countryData} />
          </ContentWrapper>
        </>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 28rem;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`;

const LoadingText = styled.div`
  font-size: 1.125rem;
  color: #757575;
`;

const ErrorText = styled.div`
  color: #e53935;
`;
