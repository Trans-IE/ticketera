import React from 'react';
import { MuiTelInputContinent } from '../constants/continents';
import { MuiTelInputCountry } from '../constants/countries';
import { MuiTelInputInfo } from '../../index.types';
type UsePhoneDigitsParams = {
    value: string;
    onChange?: (value: string, info: MuiTelInputInfo) => void;
    defaultCountry?: MuiTelInputCountry;
    forceCallingCode?: boolean;
    disableFormatting?: boolean;
    excludedCountries?: MuiTelInputCountry[];
    onlyCountries?: MuiTelInputCountry[];
    continents?: MuiTelInputContinent[];
};
type State = {
    inputValue: string;
    isoCode: MuiTelInputCountry | null;
};
type GetInitialStateParams = {
    defaultCountry?: MuiTelInputCountry;
    initialValue: string;
    forceCallingCode?: boolean;
    disableFormatting?: boolean;
};
export declare function getInitialState(params: GetInitialStateParams): State;
export default function usePhoneDigits({ value, onChange, defaultCountry, onlyCountries, excludedCountries, continents, disableFormatting, forceCallingCode }: UsePhoneDigitsParams): {
    inputValue: string;
    isoCode: import("libphonenumber-js").CountryCode | null;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCountryChange: (newCountry: MuiTelInputCountry) => void;
    inputRef: React.RefObject<HTMLInputElement>;
};
export {};
