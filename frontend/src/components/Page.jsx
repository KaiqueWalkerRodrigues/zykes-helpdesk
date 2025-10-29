import { useEffect } from "react";

export default function Page({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
