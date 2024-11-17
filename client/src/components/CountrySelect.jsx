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
import { useEffect, useMemo, useState } from "react";

const Dropdown = ({
  label,
  value,
  options,
  onChange,
  setQuery,
  changeDetails,
}) => (
  <div className="flex flex-col justify-between items-start gap-y-1 w-full">
    <p className="font-semibold text-sm">{label}</p>
    <Combobox
      value={value}
      onChange={onChange}
      onClose={() => setQuery("")}
      disabled={!changeDetails}
    >
      <div className="relative w-full">
        <ComboboxInput
          className={clsx(
            "w-full rounded-md bg-gray-100 px-2 py-1 border-2 border-gray-400",
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

const CountrySelect = ({
  handleSetLocation,
  changeDetails,
  country: paramCountry,
  state: paramState,
  city: paramCity,
}) => {
  const countryList = Country.getAllCountries();
  const [location, setLocation] = useState({
    country: null,
    state: null,
    city: null,
  });
  const [query, setQuery] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    let selectedCountry = null;
    if (changeDetails) {
      if (query) {
        selectedCountry =
          countryList.find((eachCountry) =>
            eachCountry.name.toLowerCase().includes(query.toLowerCase())
          ) || null;
      } else {
        selectedCountry =
          countryList.find(
            (eachCountry) => eachCountry.name === paramCountry
          ) || null;
      }
    } else {
      selectedCountry =
        countryList.find((eachCountry) => eachCountry.name === paramCountry) ||
        null;
    }
    setLocation((prev) => ({
      ...prev,
      country: selectedCountry,
      state: null,
      city: null,
    }));
  }, [countryList, paramCountry, changeDetails]);

  useEffect(() => {
    if (location?.country) {
      const states = State.getStatesOfCountry(location?.country?.isoCode) || [];
      setStatesList(states);
      setQuery("");
    }
  }, [location.country]);

  useEffect(() => {
    let selectedState = null;
    if (changeDetails) {
      if (query) {
        selectedState =
          statesList.find((eachState) =>
            eachState.name.toLowerCase().includes(query.toLowerCase())
          ) || null;
      } else {
        selectedState =
          statesList.find((eachState) => eachState.name === paramState) || null;
      }
    } else {
      selectedState =
        statesList.find((eachState) => eachState.name === paramState) || null;
    }
    setLocation((prev) => ({ ...prev, state: selectedState }));
  }, [statesList, paramState, changeDetails]);

  useEffect(() => {
    if (location?.state) {
      const cities =
        City.getCitiesOfState(
          location.country?.isoCode,
          location.state?.isoCode
        ) || [];
      setQuery("");
      setCitiesList(cities);
      setLocation((prev) => ({ ...prev, city: null }));
    }
  }, [location.country, location.state]);

  useEffect(() => {
    let selectedCity = null;
    if (changeDetails) {
      if (query) {
        selectedCity =
          citiesList.find((eachCity) =>
            eachCity.name.toLowerCase().includes(query.toLowerCase())
          ) || null;
      } else {
        selectedCity =
          citiesList.find((eachCity) => eachCity.name === paramCity) || null;
      }
    } else {
      selectedCity =
        citiesList.find((eachCity) => eachCity.name === paramCity) || null;
    }
    setLocation((prev) => ({ ...prev, city: selectedCity }));
  }, [citiesList, paramCity, changeDetails]);

  useEffect(() => {
    if (location?.country && location?.state && location?.city) {
      handleSetLocation(
        location.country?.name,
        location.state?.name,
        location.city?.name
      );
    }
  }, [location]);

  const filteredCountries = useMemo(
    () =>
      query
        ? countryList.filter((country) =>
            country.name.toLowerCase().includes(query.toLowerCase())
          )
        : countryList,
    [countryList, query]
  );

  const filteredStates = useMemo(
    () =>
      query
        ? statesList.filter((state) =>
            state.name.toLowerCase().includes(query.toLowerCase())
          )
        : statesList,
    [statesList, query]
  );

  const filteredCities = useMemo(
    () =>
      query
        ? citiesList.filter((city) =>
            city.name.toLowerCase().includes(query.toLowerCase())
          )
        : citiesList,
    [citiesList, query]
  );

  return (
    <>
      <Dropdown
        label="Country"
        value={location.country}
        options={filteredCountries}
        onChange={(country) => setLocation((prev) => ({ ...prev, country }))}
        setQuery={setQuery}
        changeDetails={changeDetails}
      />
      <Dropdown
        label="State"
        value={location.state}
        options={filteredStates}
        onChange={(state) => setLocation((prev) => ({ ...prev, state }))}
        setQuery={setQuery}
        changeDetails={changeDetails}
      />
      <Dropdown
        label="City"
        value={location.city}
        options={filteredCities}
        onChange={(city) => setLocation((prev) => ({ ...prev, city }))}
        setQuery={setQuery}
        changeDetails={changeDetails}
      />
    </>
  );
};

export default CountrySelect;