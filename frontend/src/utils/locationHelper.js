export const REAL_LOCATIONS = [
  "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "London, UK",
  "Remote", "Toronto, ON", "Berlin, Germany", "Singapore", "Sydney, AUS",
  "Boston, MA", "Chicago, IL", "Denver, CO", "Los Angeles, CA", "Miami, FL",
  "Remote - US", "Remote - EMEA", "Remote - APAC", "Atlanta, GA", "Dallas, TX"
];

export const getLocationForJob = (postingId) => {
  if (!postingId) return "Remote";
  // Use a simple hash to make it deterministic
  return REAL_LOCATIONS[postingId % REAL_LOCATIONS.length];
};
