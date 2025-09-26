import "primeicons/primeicons.css";

export const menuItems = [
  {
    label: "Trang chu",
    icon: "pi pi-home",
    src: "/",
  },
  {
    label: "Dich",
    icon:"pi pi-language",
    src: "/translate",
  },
  {
    label: "Thi Thu",
    icon:"pi pi-clipboard",
    src: "/test",
  },
  {
    label: "So tay",
    icon:"pi pi-book",
    src: "/handbook",
  }
];

export const caro = [
  {
    id: 1,
    image: "/1753695879380-hanzii_vi_1083x300.png",
  },
  {
    id: 2,
    image: "/1752658220597-banner_hanki_x_hanzii_h_p_t_c_chi_n_l_c.jpg",
  },
];
export const itemsList = [
  {
    label: "Từ Vựng",
    cont: "tu_vung",
  },
  { label: "Hán tự", cont: "han_tu" },
  { label: "Ví dụ", cont: "vi_du" },
  {
    label: "Ngữ pháp",
    cont: "ngu_phap",
  },
  {
    label: "Trung Trung",
    cont: "trung_trung",
  },
  {
    label: "Trung Anh",
    cont: "trung_anh",
  },
];//cbi bo
export const volcapList = [
  {
    label: "HSK 1",
  },
  {
    label: "HSK 2",
  },
];

export const testList = [
  {
    group: "HSK",
    levels: [
      {
        label: "HSK 1",
        test: [
          { lab: "Test 1", cont: "40 câu - 40 phút - Nghe, Đọc" },
          { lab: "Test 2", cont: "40 câu - 40 phút - Nghe, Đọc" },
        ],
      },
      {
        label: "HSK 2",
        test: [
          { lab: "Test 1-hsk2", cont: "40 câu - 40 phút - Nghe, Đọc" },
          { lab: "Test 2-hsk2", cont: "40 câu - 40 phút - Nghe, Đọc" },
        ],
      },
    ],
  },
  {
    group: "TOCFL",
    levels: [
      {
        label: "Novice",
        test: [{ lab: "Test 1", cont: "50 câu - 50 phút - Nghe, Đọc" }],
      },
    ],
  },
  {
    group: "D4",
    levels: [
      {
        label: "D4",
        test: [
          { lab: "Test 1", cont: "50 câu - 60 phút - Đọc" },
          { lab: "Test 2", cont: "50 câu - 60 phút - Đọc" },
        ],
      },
    ],
  },
  {
    group: "HSKK",
    levels: [
      {
        label: "Sơ cấp",
        test: [
          { lab: "Test 1", cont: "27 câu - 28 phút - Nói" },
          // ...
        ],
      },
    ],
  },
];
export const testTips = [
  {
    label: "HSK 3",
    cont: [
      { child: " Nên quan sát ảnh trước khi nghe nhé! " },
      { child: " Chỉ cần nghe hiểu cuộc đối thoại, chọn ảnh phù hợp. " },
    ],
  },
  {
    label: "HSK 4",
    cont: [
      { child: '  Chú ý xem trong câu xuất hiện "了" hay không.  ' },
      { child: "  Cẩu không có động từ, chú ý hình dung từ.  " },
    ],
  },
];
