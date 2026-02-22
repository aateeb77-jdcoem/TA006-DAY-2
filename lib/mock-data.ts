// Centralized mock data for CampusCart — based on user-provided seller dataset

export type MockSeller = {
  id: string
  fullName: string
  college: string
  department: string
  hostel: string
  trustScore: number
  itemsSold: number
  itemsBought: number
  co2Saved: number
  avatarUrl: string
}

export type MockItem = {
  id: string
  sellerId: string
  sellerName: string
  title: string
  description: string
  price: number
  category: "Electronics" | "Books" | "Furniture" | "Others"
  condition: "Brand New" | "Like New" | "Good" | "Fair"
  imageUrl: string
  pickupLocation: string
  status: "active" | "sold" | "reserved"
  fulfillment: string
  listedAt: string
  sideHustle: string
}

// ——— SELLERS ———
export const sellers: MockSeller[] = [
  { id: "s01", fullName: "Rohan Sharma", college: "IIT Delhi", department: "Computer Science", hostel: "Hostel Block A", trustScore: 4.8, itemsSold: 12, itemsBought: 3, co2Saved: 45, avatarUrl: "" },
  { id: "s02", fullName: "Priya Singh", college: "IIT Bombay", department: "Civil Engineering", hostel: "Hostel Block B", trustScore: 4.9, itemsSold: 8, itemsBought: 15, co2Saved: 30, avatarUrl: "" },
  { id: "s03", fullName: "Amit Patel", college: "BITS Pilani", department: "Mechanical Engineering", hostel: "Hostel Block C", trustScore: 4.5, itemsSold: 5, itemsBought: 7, co2Saved: 20, avatarUrl: "" },
  { id: "s04", fullName: "Neha Gupta", college: "IIT Madras", department: "Electrical Engineering", hostel: "Hostel Block A", trustScore: 4.7, itemsSold: 10, itemsBought: 4, co2Saved: 38, avatarUrl: "" },
  { id: "s05", fullName: "Vivek Kumar", college: "NIT Trichy", department: "Computer Science", hostel: "Hostel Block B", trustScore: 4.3, itemsSold: 3, itemsBought: 9, co2Saved: 12, avatarUrl: "" },
  { id: "s06", fullName: "Sanjana Iyer", college: "IIT Delhi", department: "Physics", hostel: "Hostel Block C", trustScore: 4.6, itemsSold: 6, itemsBought: 11, co2Saved: 25, avatarUrl: "" },
  { id: "s07", fullName: "Karan Desai", college: "IIT Bombay", department: "Computer Science", hostel: "Hostel Block A", trustScore: 4.9, itemsSold: 15, itemsBought: 2, co2Saved: 55, avatarUrl: "" },
  { id: "s08", fullName: "Aarti Verma", college: "BITS Pilani", department: "Design", hostel: "Hostel Block B", trustScore: 4.4, itemsSold: 7, itemsBought: 6, co2Saved: 18, avatarUrl: "" },
  { id: "s09", fullName: "Manoj Tiwari", college: "IIT Delhi", department: "Mechanical Engineering", hostel: "Hostel Block C", trustScore: 4.2, itemsSold: 4, itemsBought: 8, co2Saved: 15, avatarUrl: "" },
  { id: "s10", fullName: "Divya Nair", college: "IIT Madras", department: "Literature", hostel: "Hostel Block A", trustScore: 4.7, itemsSold: 9, itemsBought: 13, co2Saved: 35, avatarUrl: "" },
  { id: "s11", fullName: "Sachin Yadav", college: "NIT Trichy", department: "Commerce", hostel: "Hostel Block B", trustScore: 4.5, itemsSold: 6, itemsBought: 5, co2Saved: 22, avatarUrl: "" },
  { id: "s12", fullName: "Riya Choudhary", college: "IIT Bombay", department: "Mathematics", hostel: "Hostel Block C", trustScore: 4.8, itemsSold: 11, itemsBought: 7, co2Saved: 40, avatarUrl: "" },
  { id: "s13", fullName: "Gaurav Mehta", college: "IIT Delhi", department: "Computer Science", hostel: "Hostel Block A", trustScore: 4.6, itemsSold: 8, itemsBought: 3, co2Saved: 28, avatarUrl: "" },
  { id: "s14", fullName: "Simran Kaur", college: "BITS Pilani", department: "Design", hostel: "Hostel Block B", trustScore: 4.4, itemsSold: 5, itemsBought: 10, co2Saved: 16, avatarUrl: "" },
  { id: "s15", fullName: "Tarun Reddy", college: "IIT Madras", department: "Civil Engineering", hostel: "Hostel Block C", trustScore: 4.3, itemsSold: 4, itemsBought: 6, co2Saved: 14, avatarUrl: "" },
  { id: "s16", fullName: "Shreya Banerjee", college: "IIT Bombay", department: "History", hostel: "Hostel Block A", trustScore: 4.7, itemsSold: 7, itemsBought: 12, co2Saved: 32, avatarUrl: "" },
  { id: "s17", fullName: "Akshay Khanna", college: "NIT Trichy", department: "Mechanical Engineering", hostel: "Hostel Block B", trustScore: 4.5, itemsSold: 6, itemsBought: 4, co2Saved: 20, avatarUrl: "" },
  { id: "s18", fullName: "Deepika Rao", college: "IIT Delhi", department: "Fashion Design", hostel: "Hostel Block C", trustScore: 4.6, itemsSold: 9, itemsBought: 8, co2Saved: 27, avatarUrl: "" },
  { id: "s19", fullName: "Hemant Joshi", college: "IIT Bombay", department: "Computer Science", hostel: "Hostel Block A", trustScore: 4.8, itemsSold: 13, itemsBought: 2, co2Saved: 48, avatarUrl: "" },
  { id: "s20", fullName: "Kavita Menon", college: "BITS Pilani", department: "Design", hostel: "Hostel Block B", trustScore: 4.4, itemsSold: 5, itemsBought: 9, co2Saved: 17, avatarUrl: "" },
  { id: "s21", fullName: "Bhupendra Shah", college: "IIT Madras", department: "Electrical Engineering", hostel: "Hostel Block C", trustScore: 4.3, itemsSold: 3, itemsBought: 5, co2Saved: 10, avatarUrl: "" },
  { id: "s22", fullName: "Anjali Sen", college: "NIT Trichy", department: "Literature", hostel: "Hostel Block A", trustScore: 4.7, itemsSold: 8, itemsBought: 14, co2Saved: 33, avatarUrl: "" },
  { id: "s23", fullName: "Rajesh Bhatt", college: "IIT Delhi", department: "MBA", hostel: "Hostel Block B", trustScore: 4.5, itemsSold: 6, itemsBought: 7, co2Saved: 21, avatarUrl: "" },
  { id: "s24", fullName: "Manisha Sharma", college: "IIT Bombay", department: "Mathematics", hostel: "Hostel Block C", trustScore: 4.6, itemsSold: 7, itemsBought: 11, co2Saved: 26, avatarUrl: "" },
  { id: "s25", fullName: "Alok Srivastava", college: "BITS Pilani", department: "Computer Science", hostel: "Hostel Block A", trustScore: 4.2, itemsSold: 2, itemsBought: 8, co2Saved: 8, avatarUrl: "" },
  { id: "s26", fullName: "Tanvi Hegde", college: "IIT Madras", department: "Languages", hostel: "Hostel Block B", trustScore: 4.4, itemsSold: 4, itemsBought: 6, co2Saved: 15, avatarUrl: "" },
  { id: "s27", fullName: "Vijay Rathore", college: "NIT Trichy", department: "Civil Engineering", hostel: "Hostel Block C", trustScore: 4.3, itemsSold: 3, itemsBought: 4, co2Saved: 11, avatarUrl: "" },
  { id: "s28", fullName: "Kiran Jha", college: "IIT Delhi", department: "Political Science", hostel: "Hostel Block A", trustScore: 4.7, itemsSold: 10, itemsBought: 9, co2Saved: 36, avatarUrl: "" },
  { id: "s29", fullName: "Harsh Saxena", college: "IIT Bombay", department: "Computer Science", hostel: "Hostel Block B", trustScore: 4.5, itemsSold: 5, itemsBought: 7, co2Saved: 19, avatarUrl: "" },
  { id: "s30", fullName: "Meena Rege", college: "BITS Pilani", department: "Photography", hostel: "Hostel Block C", trustScore: 4.6, itemsSold: 8, itemsBought: 5, co2Saved: 24, avatarUrl: "" },
]

// ——— ITEMS ———
export const items: MockItem[] = [
  { id: "i01", sellerId: "s01", sellerName: "Rohan Sharma", title: "Used Laptop – 15\" Display", description: "15-inch display, 8GB RAM, 512GB SSD. Great for coding and everyday use.", price: 25000, category: "Electronics", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400", pickupLocation: "IIT Delhi Gate 1", status: "active", fulfillment: "Local Pickup/Shipping", listedAt: "2026-02-10", sideHustle: "Photography/Videography" },
  { id: "i02", sellerId: "s02", sellerName: "Priya Singh", title: "UPSC CSE Study Material", description: "Comprehensive UPSC prep set – all subjects covered with notes and previous year papers.", price: 500, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400", pickupLocation: "IIT Bombay Library", status: "active", fulfillment: "Digital Download", listedAt: "2026-02-20", sideHustle: "UPSC Coaching" },
  { id: "i03", sellerId: "s03", sellerName: "Amit Patel", title: "EGD Drawing Apron", description: "Durable canvas apron for engineering graphics. Adjustable straps, multiple pockets.", price: 800, category: "Others", condition: "Brand New", imageUrl: "/images/apron.png", pickupLocation: "BITS Pilani Workshop", status: "active", fulfillment: "Shipping", listedAt: "2026-02-15", sideHustle: "Photography" },
  { id: "i04", sellerId: "s04", sellerName: "Neha Gupta", title: "Sheesham Wood Study Table", description: "Solid Indian Sheesham wood study table. Sturdy build, perfect for hostel room.", price: 12000, category: "Furniture", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400", pickupLocation: "IIT Madras Hostel Area", status: "active", fulfillment: "Local Pickup", listedAt: "2026-01-25", sideHustle: "Online Tutoring" },
  { id: "i05", sellerId: "s05", sellerName: "Vivek Kumar", title: "Mythology & Ancient Texts", description: "Rare mythology and ancient Indian text collection. 8 books in good condition.", price: 1500, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", pickupLocation: "NIT Trichy Library", status: "active", fulfillment: "Shipping", listedAt: "2026-02-05", sideHustle: "Affiliate Marketing" },
  { id: "i06", sellerId: "s06", sellerName: "Sanjana Iyer", title: "IIT JEE Advanced Notes", description: "Exhaustive handwritten notes for Physics, Chemistry, and Maths.", price: 600, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400", pickupLocation: "IIT Delhi Academic Block", status: "active", fulfillment: "Shipping", listedAt: "2026-02-18", sideHustle: "Freelance Teaching" },
  { id: "i07", sellerId: "s07", sellerName: "Karan Desai", title: "MacBook Pro – M1 Chip", description: "High-performance MacBook Pro, M1 chip, 16GB RAM, 512GB SSD. Battery 92%.", price: 55000, category: "Electronics", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", pickupLocation: "IIT Bombay CS Dept", status: "active", fulfillment: "Local Pickup/Shipping", listedAt: "2026-01-30", sideHustle: "App Development" },
  { id: "i08", sellerId: "s08", sellerName: "Aarti Verma", title: "Social Media Templates Pack", description: "50+ pre-designed templates for Instagram, LinkedIn, and Twitter.", price: 400, category: "Others", condition: "Brand New", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400", pickupLocation: "Digital Delivery", status: "active", fulfillment: "Digital Download", listedAt: "2026-02-21", sideHustle: "Social Media Design" },
  { id: "i09", sellerId: "s09", sellerName: "Manoj Tiwari", title: "Three-Seater Faux Leather Sofa", description: "Faux leather sofa in good condition. Comfortable seating for 3.", price: 25000, category: "Furniture", condition: "Fair", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", pickupLocation: "IIT Delhi Hostel Block C", status: "active", fulfillment: "Local Pickup", listedAt: "2026-01-15", sideHustle: "Car Detailing" },
  { id: "i10", sellerId: "s10", sellerName: "Divya Nair", title: "Regional Literature Translations", description: "Translation of classic regional literature. 5 volumes.", price: 750, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400", pickupLocation: "IIT Madras Library", status: "active", fulfillment: "Shipping", listedAt: "2026-02-08", sideHustle: "Translation Services" },
  { id: "i11", sellerId: "s11", sellerName: "Sachin Yadav", title: "CA Foundation Study Kit", description: "Hand-written notes and solved papers for CA Foundation.", price: 700, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400", pickupLocation: "NIT Trichy Academic Block", status: "active", fulfillment: "Shipping", listedAt: "2026-02-14", sideHustle: "Photography" },
  { id: "i12", sellerId: "s12", sellerName: "Riya Choudhary", title: "Advanced Mathematics Textbook", description: "Covers calculus, linear algebra, and differential equations.", price: 1200, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", pickupLocation: "IIT Bombay Math Dept", status: "active", fulfillment: "Shipping", listedAt: "2026-02-01", sideHustle: "Textbook Reselling" },
  { id: "i13", sellerId: "s13", sellerName: "Gaurav Mehta", title: "MacBook Pro – M1, 1TB", description: "M1 chip MacBook Pro, 1TB storage. Great for development.", price: 80000, category: "Electronics", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400", pickupLocation: "IIT Delhi CS Lab", status: "active", fulfillment: "Shipping", listedAt: "2026-01-30", sideHustle: "Photography" },
  { id: "i14", sellerId: "s14", sellerName: "Simran Kaur", title: "Travel Planner Templates", description: "Detailed itinerary templates for 20+ destinations. Printable PDF.", price: 300, category: "Others", condition: "Brand New", imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400", pickupLocation: "Digital Delivery", status: "active", fulfillment: "Digital Download", listedAt: "2026-02-22", sideHustle: "Travel Planning" },
  { id: "i15", sellerId: "s15", sellerName: "Tarun Reddy", title: "Solid Teak Wood Bookshelf", description: "Teak wood bookshelf with 5 shelves. Excellent craftsmanship.", price: 18000, category: "Furniture", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400", pickupLocation: "IIT Madras Campus", status: "active", fulfillment: "Local Pickup", listedAt: "2026-01-20", sideHustle: "Dropshipping" },
  { id: "i16", sellerId: "s16", sellerName: "Shreya Banerjee", title: "Antique Art & History Books", description: "Heavy, glossy coffee-table books on Indian art and history.", price: 2000, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400", pickupLocation: "IIT Bombay Art Gallery", status: "active", fulfillment: "Shipping", listedAt: "2026-02-03", sideHustle: "Virtual Assistant" },
  { id: "i17", sellerId: "s17", sellerName: "Akshay Khanna", title: "Mechanical Engineering Notes", description: "Complete notes – thermodynamics, manufacturing, and design.", price: 400, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400", pickupLocation: "NIT Trichy Mech Dept", status: "active", fulfillment: "Shipping", listedAt: "2026-02-16", sideHustle: "Photography" },
  { id: "i18", sellerId: "s18", sellerName: "Deepika Rao", title: "Standard Lab Coat – White", description: "Simple, breathable lab coat. Size M. Used one semester.", price: 600, category: "Others", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400", pickupLocation: "IIT Delhi Chemistry Dept", status: "active", fulfillment: "Shipping", listedAt: "2026-02-12", sideHustle: "Event Planning" },
  { id: "i19", sellerId: "s19", sellerName: "Hemant Joshi", title: "ThinkPad – Business Grade", description: "Business-grade ThinkPad, 14\" display, 16GB RAM. Perfect for coding.", price: 30000, category: "Electronics", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400", pickupLocation: "IIT Bombay Placement Cell", status: "active", fulfillment: "Local Pickup/Shipping", listedAt: "2026-02-07", sideHustle: "Graphic Design" },
  { id: "i20", sellerId: "s20", sellerName: "Kavita Menon", title: "Custom Business Cards & Badges", description: "Professionally printed visiting cards and event badges.", price: 350, category: "Others", condition: "Brand New", imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400", pickupLocation: "Digital Delivery", status: "active", fulfillment: "Digital Download", listedAt: "2026-02-23", sideHustle: "Design Services" },
  { id: "i21", sellerId: "s21", sellerName: "Bhupendra Shah", title: "Metal Storage Cabinet", description: "Large, lockable metal storage cabinet for tools, books, or personal items.", price: 7000, category: "Furniture", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400", pickupLocation: "IIT Madras Workshop", status: "active", fulfillment: "Local Pickup", listedAt: "2026-01-28", sideHustle: "Handyman Services" },
  { id: "i22", sellerId: "s22", sellerName: "Anjali Sen", title: "Vintage Indian Stamp Collection", description: "200+ rare Indian postal stamps from 1950s-90s.", price: 1500, category: "Others", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400", pickupLocation: "NIT Trichy Post Office", status: "active", fulfillment: "Shipping", listedAt: "2026-02-04", sideHustle: "Pet Sitting" },
  { id: "i23", sellerId: "s23", sellerName: "Rajesh Bhatt", title: "MBA Marketing Case Studies", description: "Printed and bound case studies from top B-schools. 50+ examples.", price: 500, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400", pickupLocation: "IIT Delhi MBA Block", status: "active", fulfillment: "Shipping", listedAt: "2026-02-17", sideHustle: "Photography" },
  { id: "i24", sellerId: "s24", sellerName: "Manisha Sharma", title: "R.S. Aggarwal Maths – Full Set", description: "Used copy, highlighted, no torn pages. Quantitative aptitude + reasoning.", price: 900, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400", pickupLocation: "IIT Bombay Reading Room", status: "active", fulfillment: "Shipping", listedAt: "2026-02-06", sideHustle: "Solutions" },
  { id: "i25", sellerId: "s25", sellerName: "Alok Srivastava", title: "Used Laptop – Entry Level", description: "Entry-level laptop, 4GB RAM, 1TB HDD. Good for browsing and docs.", price: 12000, category: "Electronics", condition: "Fair", imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400", pickupLocation: "BITS Pilani CS Lab", status: "active", fulfillment: "Shipping", listedAt: "2026-02-09", sideHustle: "Customer Support" },
  { id: "i26", sellerId: "s26", sellerName: "Tanvi Hegde", title: "Language Learning Flashcards", description: "Printable flashcard set for Hindi, Tamil, and French. 500+ cards.", price: 250, category: "Others", condition: "Brand New", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", pickupLocation: "Digital Delivery", status: "active", fulfillment: "Digital Download", listedAt: "2026-02-24", sideHustle: "Language Design" },
  { id: "i27", sellerId: "s27", sellerName: "Vijay Rathore", title: "King Size Hydraulic Bed", description: "Hydraulic lift storage bed, king size. Excellent storage underneath.", price: 30000, category: "Furniture", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400", pickupLocation: "NIT Trichy Staff Quarters", status: "active", fulfillment: "Local Pickup", listedAt: "2026-01-22", sideHustle: "Online Reselling" },
  { id: "i28", sellerId: "s28", sellerName: "Kiran Jha", title: "Indian Political Science Books", description: "Essential Indian politics and governance books. 6 titles.", price: 1000, category: "Books", condition: "Good", imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400", pickupLocation: "IIT Delhi Pol Sci Dept", status: "active", fulfillment: "Shipping", listedAt: "2026-02-13", sideHustle: "Proofreading" },
  { id: "i29", sellerId: "s29", sellerName: "Harsh Saxena", title: "Coding & Web Dev Notes", description: "Neatly organized notes covering DSA, Web Dev, and System Design.", price: 300, category: "Books", condition: "Like New", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400", pickupLocation: "IIT Bombay Computer Center", status: "active", fulfillment: "Shipping", listedAt: "2026-02-19", sideHustle: "Coding Freelance" },
  { id: "i30", sellerId: "s30", sellerName: "Meena Rege", title: "Photography Editing Presets", description: "Professional Lightroom and Photoshop presets. 30+ styles.", price: 900, category: "Others", condition: "Brand New", imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400", pickupLocation: "Digital Delivery", status: "active", fulfillment: "Shipping", listedAt: "2026-02-11", sideHustle: "Photography" },
]

// ——— HELPERS ———
export function getSellerById(id: string) { return sellers.find((s) => s.id === id) }
export function getItemsBySeller(sellerId: string) { return items.filter((i) => i.sellerId === sellerId) }

// Current user for demo
export const currentUser = sellers[0]

// Legacy compat — old pages may import mockItems
export const mockItems = items.map((item) => ({
  id: item.id,
  title: item.title,
  price: item.price,
  category: item.category,
  condition: item.condition,
  description: item.description,
  images: [item.imageUrl],
  seller: { name: item.sellerName, rating: getSellerById(item.sellerId)?.trustScore ?? 4.5, college: getSellerById(item.sellerId)?.college ?? "" },
  location: item.pickupLocation,
  posted: item.listedAt,
}))

// ——— LEGACY EXPORTS for existing pages ———

export const mockUser = {
  name: currentUser.fullName,
  avatar: currentUser.fullName.split(" ").map((n) => n[0]).join(""),
  email: currentUser.fullName.toLowerCase().replace(" ", ".") + "@iitd.ac.in",
  trustScore: currentUser.trustScore,
  college: currentUser.college,
  hostel: currentUser.hostel,
  joinedDate: "Jan 2025",
  listings: getItemsBySeller(currentUser.id).length,
  itemsSold: currentUser.itemsSold,
  itemsBought: currentUser.itemsBought,
  itemsReused: currentUser.itemsSold + currentUser.itemsBought,
  co2Saved: currentUser.co2Saved,
  moneySaved: 8400,
}

export const conditions = ["Brand New", "Like New", "Good", "Fair"]

export const campusZones = [
  "Main Gate",
  "Hostel Block A",
  "Hostel Block B",
  "Hostel Block C",
  "Library",
  "Academic Block",
  "Sports Complex",
  "Canteen",
  "CS Department",
  "Workshop",
]

export const mockMessages = [
  { id: "c1", name: "Priya Singh", avatar: "PS", lastMessage: "Is the UPSC study material still available?", time: "2m ago", unread: 2, itemTitle: "UPSC CSE Study Material" },
  { id: "c2", name: "Karan Desai", avatar: "KD", lastMessage: "Can you share more photos of the MacBook?", time: "1h ago", unread: 0, itemTitle: "MacBook Pro – M1 Chip" },
  { id: "c3", name: "Neha Gupta", avatar: "NG", lastMessage: "Would you do ₹10,000 for the study table?", time: "3h ago", unread: 1, itemTitle: "Sheesham Wood Study Table" },
  { id: "c4", name: "Harsh Saxena", avatar: "HS", lastMessage: "Thanks! I'll pick it up tomorrow.", time: "1d ago", unread: 0, itemTitle: "Coding & Web Dev Notes" },
  { id: "c5", name: "Simran Kaur", avatar: "SK", lastMessage: "Do you have the travel template for Goa?", time: "2d ago", unread: 0, itemTitle: "Travel Planner Templates" },
]

export const mockChatMessages = [
  { id: "m1", sender: "them", text: "Hi! Is the UPSC study material still available?", time: "10:30 AM" },
  { id: "m2", sender: "me", text: "Yes, it is! All subjects covered with notes and PYQs.", time: "10:32 AM" },
  { id: "m3", sender: "them", text: "Great! Can I pick it up from IIT Bombay Library?", time: "10:33 AM" },
  { id: "m4", sender: "me", text: "Sure, I'm available tomorrow evening around 5 PM. Works?", time: "10:35 AM" },
  { id: "m5", sender: "them", text: "Perfect, see you then! 👍", time: "10:36 AM" },
]
