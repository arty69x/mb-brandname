import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function AboutPage() {
  const loading = false;
  const error = '';
  const empty = false;

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-[#e5e5e5] px-4 py-20 text-center sm:px-8">
            {loading ? <LoadingUI label="about" /> : null}
            {empty ? <EmptyUI label="about" /> : null}
            {error ? <ErrorUI message={error} /> : null}
            <h1 className="text-4xl uppercase">About us</h1>
            <p className="mx-auto mt-8 max-w-3xl text-3xl">100% AUTHENTIC BRANDED ITEMS FROM JAPAN</p>
            <p className="mx-auto mt-6 max-w-4xl text-xl text-black/70">
              CAREFULLY SELECTED AND IMPORTED DIRECTLY FROM JAPAN. WITH OVER 10 YEARS OF EXPERIENCE IN AUTHENTIC SECONDHAND BRANDED GOODS, WE GUARANTEE GENUINE QUALITY.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
