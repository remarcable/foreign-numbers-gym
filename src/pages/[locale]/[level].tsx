import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { locale, level } = router.query;

  return (
    <>
      <p>
        {locale} - {level}
      </p>
    </>
  );
};

export default Home;
