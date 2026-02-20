import { Product, Category, HeroSlide } from "@/types/api";

export const PRODUCTS: Product[] = [
  // ─── HERMÈS ───
  {
    id: "h1",
    name: "Birkin 30 Epsom Blue Electric",
    brand: "Hermès",
    category: "Bags",
    price: "680,500",
    image:
      "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "A pinnacle of equestrian-inspired luxury, the Birkin 30 in Blue Electric Epsom leather offers unparalleled structure and durability. Meticulously handcrafted by a single artisan, this piece features shimmering palladium-finish hardware that complements its vibrant hue. An iconic investment in pristine condition.",
      th: "ที่สุดของความหรูหราที่ได้รับแรงบันดาลใจจากมรดกการขี่ม้า Birkin 30 ในหนัง Epsom สี Blue Electric มอบโครงสร้างและความทนทานที่ไม่มีใครเทียบได้ รังสรรค์ด้วยมืออย่างพิถีพิถันโดยช่างฝีมือเพียงคนเดียว พร้อมอะไหล่แพลเลเดียมที่ส่องประกายรับกับเฉดสีสดใส เป็นการลงทุนที่สมบูรณ์แบบในสภาพไร้ที่ติสำหรับนักสะสมตัวจริง",
    },
    stock: 1,
    featured: true,
    condition: "Grade S — Pristine",
    dimensions: "30 x 22 x 16 cm",
    period: "2024 Series",
  },
  {
    id: "h2",
    name: "Kelly 25 Sellier Mauve Sylvestre",
    brand: "Hermès",
    category: "Bags",
    price: "720,000",
    image:
      "https://images.pexels.com/photos/1117468/pexels-photo-1117468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The architectural elegance of the Kelly 25 Sellier, presented in the rare and ethereal Mauve Sylvestre. Crafted from fine-pressed Epsom leather, its sharp lines are accentuated by warm gold-plated hardware. A modern masterpiece that transitions seamlessly from daylight events to evening galas.",
      th: "ความสง่างามทางสถาปัตยกรรมของ Kelly 25 Sellier ในสี Mauve Sylvestre ที่หายากและงามสง่าดั่งภาพฝัน รังสรรค์จากหนัง Epsom ลายละเอียด เส้นสายที่เฉียบคมถูกขับเน้นด้วยอะไหล่เคลือบทองคำแท้ มาสเตอร์พีซร่วมสมัยที่เปลี่ยนผ่านจากกิจกรรมกลางวันสู่งานกาล่ายามค่ำคืนได้อย่างไร้รอยต่อ",
    },
    stock: 1,
    newArrival: true,
    condition: "Grade S — Pristine",
    dimensions: "25 x 19 x 9 cm",
    period: "2024 Series",
  },
  {
    id: "h3",
    name: "Constance 18 Rose Sakura",
    brand: "Hermès",
    category: "Bags",
    price: "450,000",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The petite yet powerful Constance 18 in buttery-soft Swift leather. Bathed in the most coveted Rose Sakura pink, the bag is anchored by the signature oversized H clasp in high-polish palladium. A favorite among connoisseurs for its perfect balance of functionality and Parisian flair.",
      th: "Constance 18 ขนาดกะทัดรัดแต่เปี่ยมด้วยพลังในหนัง Swift ที่นุ่มละมุนดั่งเนย มาในสีชมพู Rose Sakura ที่เป็นที่ต้องการมากที่สุด โดดเด่นด้วยตัวล็อค H ขนาดใหญ่อันเป็นเอกลักษณ์ในวัสดุแพลเลเดียมขัดเงาสูง เป็นที่ชื่นชอบของเหล่านักสะสมด้วยความสมดุลที่ลงตัวระหว่างการใช้งานและเสน่ห์แบบปารีเซียง",
    },
    stock: 2,
    featured: true,
    condition: "Grade SA — Like New",
    dimensions: "18 x 15 x 4 cm",
    period: "2023 Series",
  },
  {
    id: "h4",
    name: "Lindy 26 Etoupe",
    brand: "Hermès",
    category: "Bags",
    price: "320,000",
    image:
      "https://images.pexels.com/photos/1036628/pexels-photo-1036628.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The Lindy 26 in classic Etoupe Clemence leather offers a relaxed yet sophisticated silhouette. Known for its versatility and unique opening mechanism, this bag is a testament to functional luxury.",
      th: "Lindy 26 ในหนัง Clemence สี Etoupe คลาสสิก มอบรูปทรงที่ผ่อนคลายแต่ยังคงความหรูหรา เป็นที่รู้จักในด้านความอเนกประสงค์และกลไกการเปิดที่เป็นเอกลักษณ์ กระเป๋าใบนี้เป็นเครื่องพิสูจน์ถึงความหรูหราที่ใช้งานได้จริง",
    },
    stock: 1,
    condition: "Grade A — Excellent",
    dimensions: "26 x 18 x 13 cm",
    period: "2023 Series",
  },
  {
    id: "h5",
    name: "Picotin Lock 18 Gold",
    brand: "Hermès",
    category: "Bags",
    price: "155,000",
    image:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Inspired by horse feed bags, the Picotin Lock 18 is a minimalist masterpiece. Crafted from Taurillon Clemence leather in the timeless Gold hue, it features a raw leather interior and the signature padlock closure.",
      th: "ได้รับแรงบันดาลใจจากถุงใส่อาหารม้า Picotin Lock 18 คือผลงานชิ้นเอกแนวมินิมอล รังสรรค์จากหนัง Taurillon Clemence ในสี Gold ที่ไร้กาลเวลา ภายในเป็นหนังดิบและปิดล็อคด้วยแม่กุญแจอันเป็นเอกลักษณ์",
    },
    stock: 3,
    newArrival: true,
    condition: "Grade S — Pristine",
    dimensions: "18 x 18 x 13 cm",
    period: "2024 Series",
  },

  // ─── CHANEL ───
  {
    id: "c1",
    name: "Classic Flap Medium Black Caviar",
    brand: "Chanel",
    category: "Bags",
    price: "385,000",
    image:
      "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The ultimate cornerstone of luxury. The Chanel Classic Flap in durable Black Caviar leather is a testament to the vision of Coco Chanel. Featuring the iconic diamond quilting, CC turn-lock, and interwoven gold-tone chain strap. This medium size is the golden standard for timeless femininity.",
      th: "ศิลาจารึกแห่งความหรูหราที่แท้จริง Chanel Classic Flap ในหนัง Caviar สีดำที่มีความทนทานสูง เป็นข้อพิสูจน์ถึงวิสัยทัศน์ของ Coco Chanel โดดเด่นด้วยลายควิลท์สี่เหลี่ยมข้าวหลามตัด ตัวล็อค CC และสายโซ่ร้อยหนังสีทอง ขนาด Medium นี้คือมาตรฐานทองคำสำหรับความเป็นผู้หญิงที่ไร้กาลเวลา",
    },
    stock: 3,
    featured: true,
    newArrival: true,
    condition: "Grade S — Pristine",
    dimensions: "25.5 x 15.5 x 6.5 cm",
    period: "2024 Collection",
  },
  {
    id: "c2",
    name: "Boy Bag Old Medium Ruthenium",
    brand: "Chanel",
    category: "Bags",
    price: "245,000",
    image:
      "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Defined by its boxy silhouette and bold ruthenium hardware, the Boy Bag offers a modern, edgy alternative to traditional luxury. Crafted from chevron-quilted calfskin, this 'Old Medium' size is perfect for the vanguard of fashion who values both heritage and rebellion.",
      th: "นิยามใหม่ด้วยรูปทรงกล่องและอะไหล่รูทีเนียมที่โดดเด่น Boy Bag มอบทางเลือกที่ทันสมัยและเฉี่ยวคมให้กับความหรูหราแบบดั้งเดิม รังสรรค์จากหนังลูกวัวลายควิลท์แบบเชฟรอน ขนาด 'Old Medium' นี้เหมาะสำหรับผู้นำแฟชั่นที่เห็นค่าในมรดกและการปฏิวัติสไตล์",
    },
    stock: 2,
    condition: "Grade A — Excellent",
    dimensions: "25 x 15 x 9 cm",
    period: "2023 Collection",
  },
  {
    id: "c3",
    name: "Chanel 19 Large Beige",
    brand: "Chanel",
    category: "Bags",
    price: "265,000",
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "A celebration of modern comfort and style, named after its launch year. The Chanel 19 in Large features pillowy-soft goatskin in a warm, versatile beige. Its oversized quilting and tri-tone hardware chain emphasize a relaxed yet undeniably sophisticated aesthetic.",
      th: "การเฉลิมฉลองความสบายและสไตล์ที่ทันสมัย ตั้งชื่อตามปีที่เปิดตัว Chanel 19 ขนาด Large รังสรรค์จากหนังแพะที่นุ่มละมุนในสีเบจที่อบอุ่นและหลากหลาย ลายควิลท์ขนาดใหญ่และสายโซ่อะไหล่สามกษัตริย์เน้นย้ำถึงสุนทรียภาพที่เรียบง่ายแต่มีความซับซ้อนอย่างปฏิเสธไม่ได้",
    },
    stock: 2,
    newArrival: true,
    condition: "Grade SA — Like New",
    dimensions: "30 x 20 x 10 cm",
    period: "2024 Series",
  },
  {
    id: "c4",
    name: "Chanel 22 Medium White",
    brand: "Chanel",
    category: "Bags",
    price: "230,000",
    image:
      "https://images.pexels.com/photos/1488507/pexels-photo-1488507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The Chanel 22 bag combines simplicity and comfort. In shiny calfskin, this white version exudes a casual chic vibe suitable for any occasion. The gold-tone metal lettering and medallion add a touch of glamour.",
      th: "กระเป๋า Chanel 22 ผสมผสานความเรียบง่ายและความสบาย ในหนังลูกวัวมันเงา รุ่นสีขาวนี้ให้อารมณ์ชิคแบบสบายๆ เหมาะสำหรับทุกโอกาส ตัวอักษรโลหะสีทองและเหรียญตราเพิ่มสัมผัสแห่งความหรูหรา",
    },
    stock: 1,
    condition: "Grade S — Pristine",
    dimensions: "39 x 42 x 8 cm",
    period: "2024 Collection",
  },
  {
    id: "c5",
    name: "Mini Square Pearl Crush",
    brand: "Chanel",
    category: "Bags",
    price: "215,000",
    image:
      "https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The highly coveted Mini Square with the adjustable 'Pearl Crush' ball. This ingenious mechanism allows for versatile wear, while the lambskin leather and antique gold hardware maintain classic Chanel appeal.",
      th: "Mini Square ที่เป็นที่ต้องการอย่างมากพร้อมลูกบอล 'Pearl Crush' ที่ปรับสายได้ กลไกอันชาญฉลาดนี้ช่วยให้สวมใส่ได้หลายแบบ ในขณะที่หนังแกะและอะไหล่ทองโบราณยังคงเสน่ห์แบบ Chanel คลาสสิก",
    },
    stock: 1,
    featured: true,
    condition: "Grade S — Pristine",
    dimensions: "17 x 13.5 x 8 cm",
    period: "2023 Collection",
  },

  // ─── LOUIS VUITTON ───
  {
    id: "l1",
    name: "Capucines BB Galet",
    brand: "Louis Vuitton",
    category: "Bags",
    price: "240,000",
    image:
      "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Named after the Rue des Capucines in Paris, this bag showcases the pinnacle of Louis Vuitton's leather craft. The full-grain Taurillon leather in 'Galet' beige offers a subtle, sandy elegance. Versatile and refined, it can be styled with the flap inside or out to reveal the golden LV initials.",
      th: "ตั้งชื่อตามถนน Rue des Capucines ในปารีส กระเป๋าใบนี้รังสรรค์ขึ้นจากจุดสูงสุดของงานหนัง Louis Vuitton หนัง Taurillon ลายละเอียดในสีเบจ 'Galet' มอบความหรูหราที่ละเอียดอ่อนและงามสง่า สามารถจัดสไตล์ได้ทั้งแบบปิดฝาหรือเปิดฝาเพื่อโชว์อักษรย่อ LV สีทอง",
    },
    stock: 1,
    featured: true,
    condition: "Grade S — Pristine",
    dimensions: "27 x 18 x 9 cm",
    period: "2024 Collection",
  },
  {
    id: "l2",
    name: "Speedy 25 Monogram",
    brand: "Louis Vuitton",
    category: "Bags",
    price: "62,500",
    image:
      "https://images.pexels.com/photos/3661622/pexels-photo-3661622.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The legendary companion that redefined the daily commute in the early 20th century. The Speedy 25 in iconic Monogram canvas features natural cowhide leather trim and polished brass hardware. A timeless piece of travel heritage that fits perfectly into the fast-paced modern lifestyle.",
      th: "เพื่อนร่วมทางระดับตำนานที่นิยามการเดินทางในชีวิตประจำวันใหม่ในช่วงต้นศตวรรษที่ 20 Speedy 25 ในลาย Monogram อันเป็นเอกลักษณ์ ตกแต่งด้วยหนังวัวธรรมชาติและอะไหล่ทองเหลืองขัดเงา ชิ้นส่วนมรดกแห่งการเดินทางที่เข้ากันได้อย่างลงตัวกับไลฟ์สไตล์สมัยใหม่ที่รวดเร็ว",
    },
    stock: 10,
    condition: "Grade A — Excellent",
    dimensions: "25 x 19 x 15 cm",
    period: "Archive Series",
  },
  {
    id: "l3",
    name: "Neverfull MM Damier Ebene",
    brand: "Louis Vuitton",
    category: "Bags",
    price: "72,000",
    image:
      "https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The Neverfull MM tote unites timeless design with heritage details. Crafted in Damier Ebene canvas with natural cowhide trim, it is roomy but not bulky, with side laces that cinch for a sleek allure or loosen for a casual look.",
      th: "กระเป๋าโท้ท Neverfull MM ผสานดีไซน์ไร้กาลเวลาเข้ากับรายละเอียดแห่งมรดก รังสรรค์ในลาย Damier Ebene พร้อมขอบหนังวัวธรรมชาติ กว้างขวางแต่ไม่เทอะทะ พร้อมเชือกข้างที่รูดเข้าเพื่อความโฉบเฉี่ยวหรือคลายออกเพื่อลุคสบายๆ",
    },
    stock: 5,
    newArrival: true,
    condition: "Grade SA — Like New",
    dimensions: "31 x 28 x 14 cm",
    period: "2024 Collection",
  },
  {
    id: "l4",
    name: "Petite Malle Monogram",
    brand: "Louis Vuitton",
    category: "Bags",
    price: "195,000",
    image:
      "https://images.pexels.com/photos/1936854/pexels-photo-1936854.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Every detail of the Petite Malle handbag is inspired by the history of Louis Vuitton trunks: the shape, the Monogram canvas, the gold-tone lock and fittings. A dedicated day-to-evening bag.",
      th: "ทุกรายละเอียดของกระเป๋าถือ Petite Malle ได้รับแรงบันดาลใจจากประวัติศาสตร์หีบเดินทางของ Louis Vuitton ทั้งรูปทรง ลาย Monogram ตัวล็อคสีทองและอุปกรณ์ประกอบ กระเป๋าที่เหมาะสำหรับทั้งกลางวันและกลางคืน",
    },
    stock: 1,
    condition: "Grade S — Pristine",
    dimensions: "20 x 12.5 x 5 cm",
    period: "2023 Collection",
  },

  // ─── DIOR ───
  {
    id: "d1",
    name: "Lady Dior Medium Black Cannage",
    brand: "Dior",
    category: "Bags",
    price: "235,000",
    image:
      "https://images.pexels.com/photos/1117468/pexels-photo-1117468.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    description: {
      en: "The quintessential Lady Dior in black Cannage lambskin with gold-finish DIOR charms. A timeless elegance defined by its architectural lines and metallic charms.",
      th: "Lady Dior ในหนังแกะลาย Cannage สีดำ พร้อมจี้ตัวอักษร DIOR สีทอง ความสง่างามที่ไร้กาลเวลาซึ่งนิยามโดยเส้นสายทางสถาปัตยกรรมและจี้โลหะ",
    },
    stock: 2,
    featured: true,
    condition: "Grade SA — Like New",
    dimensions: "24 x 20 x 11 cm",
    period: "2024 Collection",
  },
  {
    id: "d2",
    name: "Saddle Bag Blue Oblique",
    brand: "Dior",
    category: "Bags",
    price: "145,000",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    description: {
      en: "The iconic Saddle Bag in Blue Dior Oblique jacquard. Features magnetic 'D' stirrup closure and antique gold-finish hardware with the 'CD' signature on the strap.",
      th: "Saddle Bag ในลาย Jacquard Dior Oblique สีน้ำเงิน ตัวปิดล็อค 'D' แม่เหล็กและอะไหล่ทองโบราณ พร้อมสัญลักษณ์ 'CD' บนสายสะพาย",
    },
    stock: 3,
    newArrival: true,
    condition: "Grade A — Excellent",
    dimensions: "25.5 x 20 x 6.5 cm",
    period: "2024 Series",
  },
  {
    id: "d3",
    name: "Book Tote Medium Toile de Jouy",
    brand: "Dior",
    category: "Bags",
    price: "125,000",
    image:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Introduced by Maria Grazia Chiuri, the Dior Book Tote has become a staple of the Dior aesthetic. Fully embroidered with the blue Toile de Jouy motif, it is perfect for carrying all your daily essentials.",
      th: "แนะนำโดย Maria Grazia Chiuri กระเป๋า Dior Book Tote กลายเป็นหัวใจหลักของสุนทรียภาพแบบ Dior ปักลาย Toile de Jouy สีน้ำเงินทั้งใบ เหมาะสำหรับใส่ของใช้จำเป็นในชีวิตประจำวันทั้งหมดของคุณ",
    },
    stock: 4,
    condition: "Grade SA — Like New",
    dimensions: "36 x 27.5 x 16.5 cm",
    period: "2023 Collection",
  },

  // ─── ACCESSORIES & JEWELRY ───
  {
    id: "j1",
    name: "Cartier Love Bracelet 18K Yellow Gold",
    brand: "Cartier",
    category: "Accessories",
    price: "245,000",
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "A masterpiece of jewelry design, the Cartier Love Bracelet in solid 18K yellow gold. A symbol of eternal commitment requiring a screwdriver to open.",
      th: "กำไล Love จาก Cartier ในทองคำ 18K แท้ ผลงานการออกแบบระดับมาสเตอร์พีซ สัญลักษณ์แห่งพันธะสัญญาที่ต้องใช้ไขควงในการเปิด",
    },
    stock: 3,
    featured: true,
    condition: "Grade S — Pristine",
    dimensions: "Size 17",
    period: "Classic Collection",
  },
  {
    id: "j2",
    name: "VCA Vintage Alhambra Pendant",
    brand: "Van Cleef & Arpels",
    category: "Accessories",
    price: "105,000",
    image:
      "https://images.pexels.com/photos/10983780/pexels-photo-10983780.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The iconic Vintage Alhambra pendant in 18K yellow gold with Mother of Pearl. A timeless symbol of luck inspired by the clover leaf.",
      th: "สร้อยคอ Vintage Alhambra ในทองคำ 18K พร้อม Mother of Pearl สัญลักษณ์แห่งความโชคดีที่ไร้กาลเวลาซึ่งได้รับแรงบันดาลใจจากใบโคลเวอร์",
    },
    stock: 5,
    newArrival: true,
    condition: "Grade S — Pristine",
    dimensions: "Standard",
    period: "Classic Collection",
  },
  {
    id: "j3",
    name: "Hermès Kelly Watch",
    brand: "Hermès",
    category: "Accessories",
    price: "68,000",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The functional yet stylish Kelly Watch with black Epsom leather strap and gold-plated padlock case. Can be worn as a timepiece or attached to a bag.",
      th: "นาฬิกา Kelly สายหนัง Epsom สีดำ พร้อมตัวเรือนทรงแม่กุญแจเคลือบทอง สวยงามและใช้งานได้จริง สามารถสวมใส่เป็นนาฬิกาหรือห้อยกระเป๋าได้",
    },
    stock: 2,
    condition: "Grade A — Excellent",
    dimensions: "20 x 20 mm Case",
    period: "Archive Series",
  },
  {
    id: "j4",
    name: "Tiffany T Square Bracelet",
    brand: "Tiffany & Co.",
    category: "Accessories",
    price: "185,000",
    image:
      "https://images.pexels.com/photos/998521/pexels-photo-998521.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "The Tiffany T collection is a tangible reminder of the connections we feel but can't always see. This square bracelet in 18k rose gold features pavé diamonds.",
      th: "คอลเลกชัน Tiffany T คือเครื่องเตือนใจถึงความสัมพันธ์ที่เรารู้สึกแต่ไม่อาจมองเห็น กำไลข้อมือทรงเหลี่ยมในทองโรสโกลด์ 18k นี้ประดับเพชรแบบพาเว่",
    },
    stock: 1,
    condition: "Grade S — Pristine",
    dimensions: "Medium",
    period: "Modern Collection",
  },
  {
    id: "j5",
    name: "Chanel CC Logo Earrings",
    brand: "Chanel",
    category: "Accessories",
    price: "24,500",
    image:
      "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    description: {
      en: "Classic Chanel stud earrings featuring the interlocking CC logo encrusted with crystals in silver-tone metal. The perfect touch of everyday luxury.",
      th: "ต่างหูสตั๊ด Chanel คลาสสิกรูปโลโก้ CC ไขว้ ประดับคริสตัลในโลหะสีเงิน สัมผัสแห่งความหรูหราที่สมบูรณ์แบบสำหรับทุกวัน",
    },
    stock: 8,
    newArrival: true,
    condition: "Grade A — Excellent",
    dimensions: "1.5 cm Width",
    period: "Classic Collection",
  },
];

const CATEGORIES: Category[] = [
  {
    id: "c1",
    slug: "bags",
    name: { en: "Bags", th: "กระเป๋า" },
    image:
      "https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  },
  {
    id: "c2",
    slug: "accessories",
    name: { en: "Accessories", th: "เครื่องประดับ" },
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  },
];

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    video:
      "https://videos.pexels.com/video-files/4934444/4934444-uhd_2560_1440_25fps.mp4",
    title: { en: "The Art of Luxury", th: "ศิลปะแห่งความหรูหรา" },
    subtitle: {
      en: "Definitive Spring Collection",
      th: "คอลเลกชันฤดูใบไม้ผลิที่ชัดเจน",
    },
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    video:
      "https://videos.pexels.com/video-files/3205634/3205634-uhd_2560_1440_25fps.mp4",
    title: { en: "Tokyo Heritage", th: "มรดกจากโตเกียว" },
    subtitle: {
      en: "Curated from the Archive",
      th: "คัดสรรจากคลังสมบัติ",
    },
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    video:
      "https://videos.pexels.com/video-files/5699951/5699951-uhd_2560_1440_24fps.mp4",
    title: { en: "Timeless Elegance", th: "ความสง่างามที่ไร้กาลเวลา" },
    subtitle: {
      en: "Exquisite Craftsmanship",
      th: "งานฝีมืออันประณีต",
    },
  },
];

export class MockDB {
  // PRODUCTS
  static async getProducts(filter?: {
    category?: string;
    featured?: boolean;
    newArrival?: boolean;
    search?: string;
    brand?: string;
    sort?: "price_asc" | "price_desc" | "newest";
  }) {
    let result = [...PRODUCTS];
    if (filter?.category) {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === filter.category?.toLowerCase() ||
          p.id.startsWith(filter.category?.[0]?.toLowerCase() || ""),
      );
    }
    if (filter?.featured) result = result.filter((p) => p.featured);
    if (filter?.newArrival) result = result.filter((p) => p.newArrival);
    if (filter?.brand) result = result.filter((p) => p.brand === filter.brand);

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.en.toLowerCase().includes(q),
      );
    }

    // Sorting
    if (filter?.sort) {
      result.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/,/g, ""));
        const priceB = parseInt(b.price.replace(/,/g, ""));

        if (filter.sort === "price_asc") return priceA - priceB;
        if (filter.sort === "price_desc") return priceB - priceA;
        if (filter.sort === "newest") {
          // Mock logic for newest since we don't have created_at on all mock data
          // relying on newArrival flag or ID for simplicity if needed,
          // but let's assume New items are at the bottom or have 'newArrival'
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        }
        return 0;
      });
    }

    return result;
  }

  static async getProductById(id: string) {
    return PRODUCTS.find((p) => p.id === id) || null;
  }

  static async createProduct(product: Partial<Product>) {
    const newProduct = {
      id: "p" + Date.now(),
      ...product,
    } as Product;
    PRODUCTS.push(newProduct);
    return newProduct;
  }

  static async updateProduct(id: string, updates: Partial<Product>) {
    const index = PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) return null;
    PRODUCTS[index] = { ...PRODUCTS[index], ...updates };
    return PRODUCTS[index];
  }

  static async deleteProduct(id: string) {
    const index = PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) return false;
    PRODUCTS.splice(index, 1);
    return true;
  }

  // CATEGORIES
  static async getCategories() {
    return CATEGORIES;
  }

  static async createCategory(category: Partial<Category>) {
    const newCategory = {
      id: "c" + Date.now(),
      ...category,
    } as Category;
    CATEGORIES.push(newCategory);
    return newCategory;
  }

  static async updateCategory(id: string, updates: Partial<Category>) {
    const index = CATEGORIES.findIndex((c) => c.id === id);
    if (index === -1) return null;
    CATEGORIES[index] = { ...CATEGORIES[index], ...updates };
    return CATEGORIES[index];
  }

  static async deleteCategory(id: string) {
    const index = CATEGORIES.findIndex((c) => c.id === id);
    if (index === -1) return false;
    CATEGORIES.splice(index, 1);
    return true;
  }

  // HERO SLIDES
  static async getHeroSlides() {
    return HERO_SLIDES;
  }

  static async updateHeroSlide(id: number, updates: Partial<HeroSlide>) {
    const index = HERO_SLIDES.findIndex((s) => s.id === id);
    if (index === -1) return null;
    HERO_SLIDES[index] = { ...HERO_SLIDES[index], ...updates };
    return HERO_SLIDES[index];
  }

  // ORDERS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static ORDERS: any[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getOrders(userId?: string): Promise<any[]> {
    if (userId) {
      return this.ORDERS.filter((o) => o.userId === userId);
    }
    return this.ORDERS;
  }

  static async getOrderById(id: string) {
    return this.ORDERS.find((o) => o.id === id) || null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async createOrder(orderData: any) {
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 1000000).toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    this.ORDERS.unshift(newOrder); // Newest first
    return newOrder;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async updateOrder(id: string, updates: any) {
    const index = this.ORDERS.findIndex((o) => o.id === id);
    if (index === -1) return null;
    this.ORDERS[index] = { ...this.ORDERS[index], ...updates };
    return this.ORDERS[index];
  }
}
