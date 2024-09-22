/* eslint-disable react/prop-types */
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { City, Country, State } from "country-state-city";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Dropdown = ({
  label,
  value,
  options,
  onChange,
  setQuery,
  changeDetails,
}) => (
  <div className="flex flex-col justify-between items-start gap-y-1 w-full">
    <p className="font-semibold">{label}</p>
    <Combobox
      value={value}
      onChange={onChange}
      onClose={() => setQuery("")}
      disabled={changeDetails}
    >
      <div className="relative w-full">
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg bg-gray-100 p-2 border-2 border-gray-400",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={(item) => item?.name}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronUpDownIcon className="size-6 fill-gray-400 hover:fill-gray-600" />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] bg-gray-50 mt-2 [--anchor-gap:var(--spacing-1)] border-2 border-gray-400 rounded-md empty:invisible h-[250px]",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {options.map((option) => (
          <ComboboxOption
            key={option.name}
            value={option}
            className="group flex items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-gray-300 cursor-pointer"
          >
            <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
            <div className="text-sm/6 text-black">{option.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  </div>
);

const CountrySelect = ({ handleSetLocation }) => {
  const countryList = Country.getAllCountries();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [query, setQuery] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    setStatesList(State.getStatesOfCountry(country?.isoCode));
    setQuery("");
  }, [country]);

  useEffect(() => {
    setState(statesList[0]);
  }, [statesList]);

  useEffect(() => {
    if (country?.isoCode && state?.isoCode) {
      setCitiesList(City.getCitiesOfState(country.isoCode, state.isoCode));
      setQuery("");
    }
  }, [country?.isoCode, state?.isoCode]);

  useEffect(() => {
    setCity(citiesList[0]);
  }, [citiesList]);

  useEffect(() => {
    if (city && country && state) {
      handleSetLocation(country.name, state.name, city.name);
    }
  }, [city, country, state, handleSetLocation]);

  const filteredCountries = query
    ? countryList.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : countryList;

  const filteredStates = query
    ? statesList.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : statesList;

  const filteredCities = query
    ? citiesList.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      )
    : citiesList;

  return (
    <>
      <Dropdown
        label="Country"
        value={country}
        options={filteredCountries}
        onChange={setCountry}
        query={query}
        setQuery={setQuery}
      />
      {country && (
        <Dropdown
          label="State"
          value={state}
          options={filteredStates}
          onChange={setState}
          query={query}
          setQuery={setQuery}
        />
      )}
      {state && (
        <Dropdown
          label="City"
          value={city}
          options={filteredCities}
          onChange={setCity}
          query={query}
          setQuery={setQuery}
        />
      )}
    </>
  );
};

export default CountrySelect;
