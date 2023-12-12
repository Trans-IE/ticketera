import { MuiTelInputContinent } from '../constants/continents';
import { MuiTelInputCountry } from '../constants/countries';
type FilterCountriesOptions = {
    onlyCountries?: readonly MuiTelInputCountry[];
    excludedCountries?: readonly MuiTelInputCountry[];
    preferredCountries?: readonly MuiTelInputCountry[];
    continents?: readonly MuiTelInputContinent[];
};
export declare function getCallingCodeOfCountry(isoCode: MuiTelInputCountry): string;
export declare function getValidCountry(country?: MuiTelInputCountry): MuiTelInputCountry;
export declare function sortedPreferredCountries(countries: readonly MuiTelInputCountry[], preferredCountries: readonly MuiTelInputCountry[]): readonly MuiTelInputCountry[];
export declare function getCountriesOfContinents(continents: readonly MuiTelInputContinent[]): readonly MuiTelInputCountry[];
export declare function getOnlyCountries(countries: readonly MuiTelInputCountry[], onlyCountries: readonly MuiTelInputCountry[]): readonly MuiTelInputCountry[];
export declare function excludeCountries(countries: readonly MuiTelInputCountry[], excludedCountries?: readonly MuiTelInputCountry[]): readonly MuiTelInputCountry[];
export declare function filterCountries(countries: readonly MuiTelInputCountry[], options: FilterCountriesOptions): readonly MuiTelInputCountry[];
export declare function matchContinentsIncludeCountry(continents: MuiTelInputContinent[], isoCode: MuiTelInputCountry): boolean;
export declare function sortAlphabeticallyCountryCodes(countryCodes: readonly MuiTelInputCountry[], displayNames: Intl.DisplayNames): readonly MuiTelInputCountry[];
export {};
