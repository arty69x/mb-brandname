import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function AboutPage() {
  const loading = false;
  const error = '';
  const empty = false;

  return (
    <main>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? <LoadingUI label="about" /> : null}
          {empty ? <EmptyUI label="about" /> : null}
          {error ? <ErrorUI message={error} /> : null}
          {!loading && !empty && !error ? (
            <div className="bg-[#E6E6E6] px-4 py-16 text-center">
              <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[52px] tracking-[0.06em] font-light">About us</h1>
              <p className="mx-auto mt-8 max-w-[720px] text-[14px] text-[#6D6D6D]">100% AUTHENTIC BRANDED ITEMS FROM JAPAN. CAREFULLY SELECTED AND IMPORTED DIRECTLY FROM JAPAN.</p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
