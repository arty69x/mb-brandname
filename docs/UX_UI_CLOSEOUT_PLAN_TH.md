# UX/UI Close-out Plan (TH)

อัปเดตล่าสุด: 2026-03-26

## สรุปสั้น
งาน UX/UI ยังไม่ถือว่า “จบแบบสมบูรณ์” เพราะยังมีจุดที่ไม่ตรงสเปกหลักเรื่องโครง layout, grid policy, spacing system, และ interaction/accessibility consistency

## สิ่งที่ต้องเพิ่ม/ปรับปรุงเพื่อปิดงาน

### 1) บังคับโครงหน้าให้เหมือนกันทุกหน้า (Priority: P0)
**เป้าหมาย:** ทุก page ต้องเป็น `main > section > div.container.mx-auto.px-4` เสมอ

**สถานะตอนนี้:**
- หน้า Home มี section ที่ใช้ `w-full md:container md:mx-auto md:px-4` และ `w-full lg:container lg:mx-auto lg:px-4` ซึ่งไม่ตรงข้อกำหนดแบบตรงตัว

**งานที่ต้องทำ:**
- ปรับ Home ให้ใช้ `container mx-auto px-4` ตั้งแต่ mobile
- ล็อก pattern เดียวกันให้ทุก section ที่เหลือ

---

### 2) ปรับ Product Grid ให้ตรง policy ทุกจุด (Priority: P0)
**เป้าหมาย:**
- Mobile: `grid-cols-2`
- Tablet: `md:grid-cols-3`
- Desktop: `lg:grid-cols-4`

**สถานะตอนนี้:**
- `ProductGrid` ยังมี default เป็น 5 คอลัมน์ desktop (`desktopColumns = 5`) และ class `lg:grid-cols-5`

**งานที่ต้องทำ:**
- เปลี่ยน default เป็น 4
- เพิ่ม `md:grid-cols-3` ใน grid หลัก
- ตรวจทุกจุดที่เรียก `ProductGrid` ให้ไม่หลุด policy

---

### 3) ปรับรูปสินค้าให้เป็น 1:1 ทั้งระบบ (Priority: P0)
**เป้าหมาย:** Product image ต้องเป็น square ratio (1:1)

**สถานะตอนนี้:**
- `ProductCard` ใช้ `aspect-[3/4]`

**งานที่ต้องทำ:**
- เปลี่ยนเป็น `aspect-square`
- ทบทวน `sizes` ของ `next/image` ให้เหมาะกับ 2/3/4 columns

---

### 4) Normalize spacing ให้เป็น Base-8 (Priority: P1)
**เป้าหมาย:** ใช้ spacing token ตามระบบ (`gap-2/4/6/8/12/16` ฯลฯ) แบบสม่ำเสมอ

**สถานะตอนนี้:**
- มีการใช้ spacing หลากหลายและผสมระดับ (`py-10`, `px-6`, `px-8`, `mt-3`, ฯลฯ)

**งานที่ต้องทำ:**
- ทำ spacing token audit ทั้ง pages/components
- จัด baseline spacing สำหรับ section/card/content block ให้ตรงกัน

---

### 5) เพิ่ม interaction states ให้ครบทุก control (Priority: P1)
**เป้าหมาย:** ปุ่ม/ลิงก์ที่ interactive ต้องมี `hover`, `focus-visible`, `active`, `disabled` ที่ชัดเจน

**สถานะตอนนี้:**
- บางจุดมี `focus-visible` แล้ว แต่หลายปุ่มยังไม่มี state ที่ครบ

**งานที่ต้องทำ:**
- สร้าง state pattern กลาง (button/link/input)
- ไล่ใส่ให้ครบทั้ง Cart/Checkout/Wishlist/Product Detail/Home CTA

---

### 6) Blueprint parity pass ทีละหน้า (Priority: P0)
**เป้าหมาย:** ทำ pixel-accurate ตามภาพต้นฉบับใน `/public/blueprint`

**งานที่ต้องทำ:**
- เทียบหน้า `/`, `/new-arrivals`, `/bags`, `/accessories`, `/product/[slug]`, `/cart`, `/checkout`
- ตรวจ typography, spacing, radius, border, shadow, visual hierarchy
- ทำ before/after screenshot ต่อหน้าเพื่อ sign-off

---

### 7) สร้าง reusable UI blocks เพื่อลด drift (Priority: P2)
**เป้าหมาย:** ลดการเขียนซ้ำ และ lock visual consistency

**งานที่ต้องทำ:**
- แยก component pattern ที่ใช้ซ้ำ เช่น
  - SectionHeader
  - CTAButton variants
  - FormField
  - SummaryCard
  - ProductGallery
- ระบุ prop API ชัดเจน + class preset ตาม design tokens

---

### 8) Accessibility + QA gate ก่อนปิดงาน (Priority: P0)
**เป้าหมาย:** ผ่านทั้ง functional และ visual QA

**งานที่ต้องทำ:**
- Keyboard flow: tab order / focus ring / skip consistency
- Empty/loading/error state ต้องแสดงผลถูกต้องทุกหน้าที่มี async/data
- ตรวจ build + lint + typecheck ผ่านทั้งหมด

---

## Definition of Done (DoD) สำหรับงาน UX/UI
ถือว่างาน “ปิดได้” เมื่อครบทั้งหมด:
1. ทุกหน้าใช้โครง `main > section > div.container.mx-auto.px-4`
2. Product grid เป็น 2/3/4 columns ตาม breakpoint ทุก listing
3. Product image เป็น 1:1 ทุก card/gallery ที่เป็นภาพสินค้า
4. spacing เป็น Base-8 อย่างสม่ำเสมอ
5. Interactive states ครบ (`hover/focus-visible/active/disabled`)
6. เทียบ blueprint แล้วผ่าน pixel match ในจุดสำคัญ
7. มีหลักฐาน screenshot + QA checklist + build/lint/typecheck ผ่าน

## แผนลงมือ (แนะนำ)
1. ปรับโครง Home + Grid + Card ratio (งานแกนหลัก)
2. ทำ blueprint parity ของหน้า catalog และ product detail
3. ปิด Cart/Checkout forms + interaction/a11y
4. ทำ spacing/token normalization รอบสุดท้าย
5. เก็บหลักฐาน screenshot และปิด QA report
