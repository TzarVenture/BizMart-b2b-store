export const categories = [
  {
    id: 'cat-1',
    name: 'Industrial Equipment',
    slug: 'industrial-equipment',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Industrial+Equipment',
    subcategories: ['Industrial Pumps', 'Generators', 'Compressors'],
  },
  {
    id: 'cat-2',
    name: 'Electrical Products',
    slug: 'electrical-products',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Electrical+Products',
    subcategories: ['Switches', 'Cables', 'Lighting', 'Electrical Panels'],
  },
  {
    id: 'cat-3',
    name: 'Construction Material',
    slug: 'construction-material',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Construction+Material',
    subcategories: ['Cement', 'Steel', 'Bricks', 'Pipes'],
  },
  {
    id: 'cat-4',
    name: 'Machinery',
    slug: 'machinery',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Machinery',
    subcategories: ['Lathe Machines', 'CNC Machines', 'Packaging Machinery'],
  },
  {
    id: 'cat-5',
    name: 'Safety Products',
    slug: 'safety-products',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Safety+Products',
    subcategories: ['Safety Shoes', 'Helmets', 'Gloves', 'Fire Extinguishers'],
  },
  {
    id: 'cat-6',
    name: 'Tools & Hardware',
    slug: 'tools-hardware',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Tools+%26+Hardware',
    subcategories: ['Power Tools', 'Hand Tools', 'Fasteners', 'Adhesives'],
  },
  {
    id: 'cat-7',
    name: 'Packaging Material',
    slug: 'packaging-material',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Packaging+Material',
    subcategories: ['Corrugated Boxes', 'Bubble Wrap', 'Tapes', 'Pallets'],
  },
  {
    id: 'cat-8',
    name: 'Chemicals',
    slug: 'chemicals',
    image: 'https://placehold.co/600x400/f1f5f9/475569?text=Chemicals',
    subcategories: ['Industrial Chemicals', 'Adhesives', 'Lubricants', 'Solvents'],
  }
];

export const products = [
  {
    id: 'prod-1',
    name: 'Heavy Duty Centrifugal Pump 5HP',
    slug: 'heavy-duty-centrifugal-pump-5hp',
    category: 'Industrial Equipment',
    subcategory: 'Industrial Pumps',
    price: 15000,
    priceOnRequest: false,
    moq: 1,
    availability: 'In Stock',
    shortDescription: 'Highly efficient centrifugal pump for industrial water transfer.',
    description: 'Designed for heavy-duty industrial applications, this 5HP centrifugal pump provides excellent water transfer capabilities with maximum reliability and minimal maintenance. Built with robust cast iron and high-quality internal components.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=Centrifugal+Pump',
      'https://placehold.co/800x800/f8fafc/334155?text=Pump+Side+View'
    ],
    specifications: {
      'Material': 'Cast Iron',
      'Power': '5 HP',
      'Capacity': '500 L/min',
      'Application': 'Industrial Water Transfer',
      'Country of Origin': 'India'
    },
    brand: 'HydroFlow',
    code: 'PMP-500',
    featured: true,
    trending: true,
  },
  {
    id: 'prod-2',
    name: 'Industrial Three Phase Electric Motor 10HP',
    slug: 'industrial-three-phase-electric-motor-10hp',
    category: 'Electrical Products',
    subcategory: 'Electrical Panels',
    price: 0,
    priceOnRequest: true,
    moq: 5,
    availability: 'Made to Order',
    shortDescription: 'High-performance three-phase electric motor for heavy machinery.',
    description: 'Industrial grade three-phase electric motor designed for continuous operation in harsh environments. Features high energy efficiency, low noise operation, and excellent thermal dissipation.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=Electric+Motor',
    ],
    specifications: {
      'Type': 'Three Phase AC',
      'Power': '10 HP (7.5 kW)',
      'Speed': '1440 RPM',
      'Voltage': '415V',
      'Mounting': 'Foot Mount'
    },
    brand: 'ElectroMax',
    code: 'MOT-3PH-10',
    featured: true,
    trending: false,
  },
  {
    id: 'prod-3',
    name: 'PVC Insulated Copper Wire 1.5 sq mm',
    slug: 'pvc-insulated-copper-wire-1-5-sq-mm',
    category: 'Electrical Products',
    subcategory: 'Cables',
    price: 850,
    priceOnRequest: false,
    moq: 10,
    availability: 'In Stock',
    shortDescription: 'Premium quality PVC insulated house wire, 90m coil.',
    description: 'High conductivity copper wire with flame retardant PVC insulation. Ideal for residential and commercial wiring. Ensures safety and reduces energy loss.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=Copper+Wire', 
    ],
    specifications: {
      'Conductor': 'Bare Copper',
      'Insulation': 'FR PVC',
      'Size': '1.5 sq mm',
      'Length': '90 Meters',
      'Voltage Grade': '1100V'
    },
    brand: 'WireGuard',
    code: 'CBL-1.5-FR',
    featured: false,
    trending: true,
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Storage Tank 1000L',
    slug: 'stainless-steel-storage-tank-1000l',
    category: 'Industrial Equipment',
    subcategory: 'Storage',
    price: 45000,
    priceOnRequest: false,
    moq: 1,
    availability: 'In Stock',
    shortDescription: 'Food grade SS304 storage tank for chemicals and liquids.',
    description: 'Vertical storage tank made from SS304 stainless steel. Highly resistant to corrosion and suitable for food, pharmaceutical, and chemical industries.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=SS+Storage+Tank'
    ],
    specifications: {
      'Material': 'Stainless Steel 304',
      'Capacity': '1000 Liters',
      'Orientation': 'Vertical',
      'Thickness': '3mm',
      'Application': 'Food & Pharma'
    },
    brand: 'SteelTech',
    code: 'TNK-SS-1000',
    featured: true,
    trending: true,
  },
  {
    id: 'prod-5',
    name: 'Safety Helmet with Visor',
    slug: 'safety-helmet-with-visor',
    category: 'Safety Products',
    subcategory: 'Helmets',
    price: 450,
    priceOnRequest: false,
    moq: 50,
    availability: 'In Stock',
    shortDescription: 'Industrial grade safety helmet with clear polycarbonate visor.',
    description: 'High-density polyethylene (HDPE) helmet with integrated clear visor. Provides excellent head and face protection against impact, flying debris, and chemical splashes.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=Safety+Helmet'
    ],
    specifications: {
      'Material': 'HDPE',
      'Visor': 'Polycarbonate',
      'Standard': 'IS 2925',
      'Suspension': '6-point plastic',
      'Color': 'Yellow'
    },
    brand: 'SafeGuard',
    code: 'HLM-V-YEL',
    featured: false,
    trending: true,
  },
  {
    id: 'prod-6',
    name: 'CNC Milling Machine VMC 850',
    slug: 'cnc-milling-machine-vmc-850',
    category: 'Machinery',
    subcategory: 'CNC Machines',
    price: 0,
    priceOnRequest: true,
    moq: 1,
    availability: 'Made to Order',
    shortDescription: 'High precision Vertical Machining Center for metal parts.',
    description: 'State-of-the-art Vertical Machining Center designed for high-speed, high-precision milling, drilling, and tapping operations. Ideal for automotive, aerospace, and general engineering components.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=CNC+Machine'
    ],
    specifications: {
      'Table Size': '1000 x 500 mm',
      'Spindle Speed': '10000 RPM',
      'Tool Capacity': '24 Tools ATC',
      'Control System': 'Fanuc / Siemens',
      'Weight': '4500 Kg'
    },
    brand: 'MechPro',
    code: 'VMC-850',
    featured: true,
    trending: false,
  },
  {
    id: 'prod-7',
    name: 'TMT Steel Bars 12mm',
    slug: 'tmt-steel-bars-12mm',
    category: 'Construction Material',
    subcategory: 'Steel',
    price: 65,
    priceOnRequest: false,
    moq: 1000,
    availability: 'In Stock',
    shortDescription: 'High strength TMT bars for construction.',
    description: 'Thermo Mechanically Treated (TMT) steel bars offering high yield strength, superior weldability, and excellent ductility for safe building construction.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=TMT+Steel+Bars'
    ],
    specifications: {
      'Grade': 'Fe 500D',
      'Diameter': '12 mm',
      'Length': '12 Meters',
      'Application': 'Construction',
    },
    brand: 'BuildStrong',
    code: 'TMT-12',
    featured: true,
    trending: true,
  },
  {
    id: 'prod-8',
    name: 'Portland Pozzolana Cement',
    slug: 'portland-pozzolana-cement',
    category: 'Construction Material',
    subcategory: 'Cement',
    price: 350,
    priceOnRequest: false,
    moq: 100,
    availability: 'In Stock',
    shortDescription: 'High grade PPC cement in 50kg bags.',
    description: 'PPC cement suitable for all general construction purposes, offering high compressive strength and durability against harsh environments.',
    images: [
      'https://placehold.co/800x800/f8fafc/334155?text=Cement+Bag'
    ],
    specifications: {
      'Type': 'PPC',
      'Packaging Size': '50 Kg',
      'Packaging Type': 'HDPE Bag',
      'Application': 'Construction',
    },
    brand: 'UltraBuild',
    code: 'Cem-PPC-50',
    featured: false,
    trending: true,
  }
];

export const heroSlides = [
  {
    id: 1,
    title: 'Discover Industrial Excellence',
    subtitle: 'Source top-quality equipment and machinery directly from the manufacturer.',
    image: 'https://placehold.co/1600x600/0f172a/ffffff?text=Industrial+Equipment+Banner',
    cta: 'Explore Products',
    link: '/products'
  },
  {
    id: 2,
    title: 'Reliable Electrical Solutions',
    subtitle: 'From industrial cables to heavy-duty panels, we power your business.',
    image: 'https://placehold.co/1600x600/0f172a/ffffff?text=Electrical+Solutions+Banner',
    cta: 'View Category',
    link: '/categories/electrical-products'
  },
  {
    id: 3,
    title: 'Bulk Requirements? We Deliver.',
    subtitle: 'Get customized quotes and preferential pricing on bulk orders.',
    image: 'https://placehold.co/1600x600/0f172a/ffffff?text=Bulk+Requirements+Banner',
    cta: 'Request Quote',
    link: '/request-quote'
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Premium Quality',
    description: 'All our products undergo rigorous testing to ensure industry-leading reliability and performance.',
    icon: 'ShieldCheck'
  },
  {
    id: 2,
    title: 'Vast Catalogue',
    description: 'Explore thousands of products across multiple categories for all your industrial needs.',
    icon: 'Layers'
  },
  {
    id: 3,
    title: 'Direct from Manufacturer',
    description: 'No middlemen. Get the best pricing and direct support straight from the source.',
    icon: 'Factory'
  },
  {
    id: 4,
    title: 'Fast Delivery',
    description: 'Extensive logistics network ensuring timely delivery across the country.',
    icon: 'Truck'
  }
];
