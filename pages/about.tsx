import { EmptyUI, ErrorUI, LoadingUI } from '@/components/PageState';

export default function AboutPage() {
  const loading = false;
  const error = '';
  const empty = false;

  return (
    <main>
      <section className="py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#F5F5F5] px-4 py-10 text-center sm:px-8">
            {loading ? <LoadingUI label="about" /> : null}
            {empty ? <EmptyUI label="about" /> : null}
            {error ? <ErrorUI message={error} /> : null}
            {!loading && !empty && !error ? (
              <>
                <h1 className="text-[28px] font-light tracking-[0.06em] sm:text-[32px] md:text-[40px] lg:text-[52px]">About us</h1>
                <p className="mx-auto mt-6 max-w-3xl text-[14px] text-[#6D6D6D]">100% authentic branded items from Japan. Curated and verified by experienced buyers.</p>
                <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-3">
                  <div><p className="text-[14px]">Fast Delivery</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Reliable shipping for every order.</p></div>
                  <div><p className="text-[14px]">Secure Payments</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Protected checkout and trusted providers.</p></div>
                  <div><p className="text-[14px]">Authenticity Guarantee</p><p className="mt-2 text-[14px] text-[#6D6D6D]">Every item is manually reviewed.</p></div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
