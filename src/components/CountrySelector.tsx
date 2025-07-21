import React from "react";
import styled from "styled-components";

interface CountrySelectorProps {
  countries: string[];
  selected: string;
  onSelect: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selected,
  onSelect,
}) => {
  return (
    <SelectorWrapper>
      {countries.map((country) => (
        <SelectorButton
          key={country}
          selected={selected === country}
          onClick={() => onSelect(country)}
        >
          {country.toUpperCase()}
        </SelectorButton>
      ))}
    </SelectorWrapper>
  );
};

const SelectorWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;

`;

const SelectorButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  border: 2px solid transparent;
  transition: background 0.2s, color 0.2s, border 0.2s;
  background: ${({ selected }) => (selected ? "#000" : "#f3f3f3")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border-color: ${({ selected }) => (selected ? "#000" : "transparent")};
  cursor: pointer;
  &:hover {
    background: ${({ selected }) => (selected ? "#000" : "#e5e5e5")};
  }
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

export default CountrySelector;
