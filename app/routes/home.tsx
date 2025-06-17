import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ben's Profile | 1965 Edition" },
    { name: "description", content: "A 1965 version of Ben's profile, inspired by the 1965 Newport Folk Festival." },
  ];
}

export default function Home() {
  return <Welcome />;
}
