"use client";

import { SearchForm } from "@/components/molecules/SearchForm";
import { NewsList } from "@/components/organisms/NewsList/NewsList";

export default function Home() {
  return (
    <main>
      <SearchForm />
      <br />
      <NewsList />
    </main>
  );
}
