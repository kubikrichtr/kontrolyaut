import { useEffect, useState } from "react";

const ENDPOINT =
  "https://ajafqafoonxoubbhcxnk.supabase.co/functions/v1/public-blocked-dates";

export const useBlockedDates = (site: "stavbaterie" | "kontrolyaut") => {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  useEffect(() => {
    let active = true;
    fetch(`${ENDPOINT}?site=${site}`)
      .then((r) => r.json())
      .then((d) => {
        if (active && Array.isArray(d?.dates)) setBlockedDates(d.dates);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [site]);
  return blockedDates;
};
