export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flagUrl: string;
}

export const COUNTRIES: Country[] = [
  { name: "Nigeria", code: "NG", dialCode: "+234", flagUrl: "https://flagcdn.com/w80/ng.png" },
  { name: "United States", code: "US", dialCode: "+1", flagUrl: "https://flagcdn.com/w80/us.png" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flagUrl: "https://flagcdn.com/w80/gb.png" },
  { name: "Canada", code: "CA", dialCode: "+1", flagUrl: "https://flagcdn.com/w80/ca.png" },
  { name: "India", code: "IN", dialCode: "+91", flagUrl: "https://flagcdn.com/w80/in.png" },
  { name: "China", code: "CN", dialCode: "+86", flagUrl: "https://flagcdn.com/w80/cn.png" },
  { name: "Germany", code: "DE", dialCode: "+49", flagUrl: "https://flagcdn.com/w80/de.png" },
  { name: "France", code: "FR", dialCode: "+33", flagUrl: "https://flagcdn.com/w80/fr.png" },
  { name: "Japan", code: "JP", dialCode: "+81", flagUrl: "https://flagcdn.com/w80/jp.png" },
  { name: "Australia", code: "AU", dialCode: "+61", flagUrl: "https://flagcdn.com/w80/au.png" },
];