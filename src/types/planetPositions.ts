export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ReadingPayload {
  longitude: number;
  latitude: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface PlanetPosition {
  planet: string;
  sign: string;
  house: string;
}

export interface ReadingResult {
  dynamicTexts: PlanetPosition[];
}
