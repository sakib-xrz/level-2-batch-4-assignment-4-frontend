export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export function generateQueryString(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  const isEmpty = Object.values(params).every(
    (value) => value === "" || value === null || value === undefined,
  );

  if (isEmpty) {
    return "";
  }

  const queryString = Object.entries(params)
    .filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_key, value]) => value !== "" && value !== null && value !== undefined,
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");

  return `?${queryString}`;
}

export function sanitizeParams<T extends Record<string, unknown>>(
  params: T,
): Partial<T> {
  const sanitizedObj: Partial<T> = {};

  for (const key in params) {
    if (
      params[key] !== "" &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      sanitizedObj[key] = params[key];
    }
  }

  return sanitizedObj;
}

export const productCategoriesOptions = [
  {
    key: "1",
    label: "BMX",
    value: "BMX",
  },
  {
    key: "2",
    label: "Electric",
    value: "Electric",
  },
  {
    key: "3",
    label: "Hybrid",
    value: "Hybrid",
  },
  {
    key: "4",
    label: "Mountain",
    value: "Mountain",
  },
  {
    key: "5",
    label: "Road",
    value: "Road",
  },
];

export const productBrandsOptions = [
  {
    key: "1",
    label: "CycleWorld",
    value: "CycleWorld",
  },
  {
    key: "2",
    label: "EcoWheel",
    value: "EcoWheel",
  },
  {
    key: "3",
    label: "GearUp",
    value: "GearUp",
  },
  {
    key: "4",
    label: "GreenRide",
    value: "GreenRide",
  },
  {
    key: "5",
    label: "ProCycle",
    value: "ProCycle",
  },
  {
    key: "6",
    label: "RockRider",
    value: "RockRider",
  },
  {
    key: "7",
    label: "Speedster",
    value: "Speedster",
  },
  {
    key: "8",
    label: "TrailMaster",
    value: "TrailMaster",
  },
  {
    key: "9",
    label: "Trickster",
    value: "Trickster",
  },
  {
    key: "10",
    label: "VoltX",
    value: "VoltX",
  },
];
