// Import classes (adjust path as needed)
import * as Entities from "./Entities.js";

function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const today = new Date();
const getDate = (monthOffset, dayOffset) =>
  new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    today.getDate() + dayOffset
  ).toISOString();
const reviewDate = (monthOffset, dayOffset) =>
  new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    today.getDate() - dayOffset
  ).toISOString();
const promoDate = (monthOffset, dayOffset) =>
  new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    dayOffset
  ).toISOString();
const reportMonth = (monthOffset) =>
  new Date(
    today.getFullYear(),
    today.getMonth() - monthOffset,
    1
  ).toISOString();

const sampleCategories = [
  new Entities.Category(
    1,
    "Economy",
    "Budget-friendly vehicles with excellent fuel efficiency",
    "fa-wallet",
    { maxPrice: 70, types: ["Sedan", "Hatchback", "Hybrid"] }
  ),
  new Entities.Category(
    2,
    "Family",
    "Spacious vehicles with room for the whole family",
    "fa-users",
    { minPrice: 70, maxPrice: 110, types: ["SUV", "Sedan"] }
  ),
  new Entities.Category(
    3,
    "Luxury",
    "Premium vehicles with high-end features and comfort",
    "fa-crown",
    { minPrice: 120, types: ["Luxury", "Electric"] }
  ),
  new Entities.Category(
    4,
    "Sports",
    "High-performance vehicles for an exciting driving experience",
    "fa-tachometer-alt",
    { minPrice: 100, types: ["Sports", "Convertible"] }
  ),
  new Entities.Category(
    5,
    "Green",
    "Eco-friendly hybrid and electric vehicles",
    "fa-leaf",
    { types: ["Hybrid", "Electric"] }
  ),
  new Entities.Category(
    6,
    "Adventure",
    "Vehicles designed for outdoor activities and exploration",
    "fa-mountain",
    { types: ["SUV", "Off-Road", "Truck"] }
  ),
  new Entities.Category(
    7,
    "Trucks & Vans",
    "Utility vehicles for hauling cargo or large groups",
    "fa-truck",
    { types: ["Truck", "Van"] }
  ),
];

const sampleCars = [
  (() => {
    const car = new Entities.Car(
      1,
      "Toyota",
      "Camry",
      "Sedan",
      65,
      "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Efficient and reliable mid-size sedan perfect for everyday driving. Featuring excellent fuel economy and a smooth ride.",
      [
        "Bluetooth",
        "Backup Camera",
        "USB Ports",
        "Cruise Control",
        "Keyless Entry",
      ],
      {
        minAge: 21,
        deposit: 200,
        insurance:
          "Basic insurance included, premium available for additional fee",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      },
      [],
      2
    );
    car.categories = [1];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      2,
      "Honda",
      "CR-V",
      "SUV",
      85,
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Versatile SUV with ample space for passengers and cargo. Perfect for family trips and outdoor adventures.",
      [
        "All-Wheel Drive",
        "Bluetooth",
        "Backup Camera",
        "Navigation",
        "Roof Rack",
      ],
      {
        minAge: 21,
        deposit: 300,
        insurance:
          "Basic insurance included, premium available for additional fee",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      }
    );
    car.categories = [2, 6];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      3,
      "BMW",
      "3 Series",
      "Luxury",
      120,
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Premium luxury sedan that combines sporty performance with elegant design and advanced technology.",
      [
        "Leather Seats",
        "Premium Sound System",
        "Navigation",
        "Heated Seats",
        "Bluetooth",
      ],
      {
        minAge: 25,
        deposit: 500,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "150 miles per day, additional miles at $0.25 per mile",
      },
      [],
      3
    );
    car.categories = [3];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      4,
      "Ford",
      "Mustang",
      "Sports",
      110,
      "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Iconic American muscle car with powerful V8 engine and classic styling. Available as convertible.",
      [
        "V8 Engine",
        "Convertible",
        "Leather Seats",
        "Premium Sound System",
        "Performance Package",
      ],
      {
        minAge: 25,
        deposit: 500,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [4];
    car.isFeatured = true;
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      5,
      "Toyota",
      "Prius",
      "Hybrid",
      70,
      "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Eco-friendly hybrid vehicle with exceptional fuel economy and low emissions. Comfortable interior with latest tech.",
      [
        "Hybrid Engine",
        "Bluetooth",
        "Backup Camera",
        "USB Ports",
        "Keyless Entry",
      ],
      {
        minAge: 21,
        deposit: 200,
        insurance:
          "Basic insurance included, premium available for additional fee",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      }
    );
    car.categories = [5, 1];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      6,
      "Tesla",
      "Model 3",
      "Electric",
      130,
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600",
      "All-electric luxury sedan with impressive range and acceleration. Features advanced autopilot technology.",
      [
        "Electric",
        "Autopilot",
        "Premium Sound System",
        "Navigation",
        "Leather Seats",
      ],
      {
        minAge: 25,
        deposit: 500,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with at least 50% charge",
        mileage: "Unlimited",
      }
    );
    car.categories = [5, 3];
    car.isFeatured = true;
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      7,
      "Jeep",
      "Wrangler",
      "Off-Road",
      95,

      "https://images.pexels.com/photos/627678/pexels-photo-627678.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Rugged 4x4 vehicle built for off-road adventures. Removable doors and roof for open-air experience.",
      ["4x4", "Removable Top", "Bluetooth", "Navigation", "All-Terrain Tires"],
      {
        minAge: 25,
        deposit: 400,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [6];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      8,
      "Mercedes-Benz",
      "E-Class",
      "Luxury",
      140,
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Elegant and sophisticated luxury sedan offering premium comfort and cutting-edge technology features.",
      [
        "Leather Seats",
        "Premium Sound System",
        "Navigation",
        "Heated Seats",
        "Driver Assistance Package",
      ],
      {
        minAge: 25,
        deposit: 600,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "150 miles per day, additional miles at $0.30 per mile",
      },
      [],
      2
    );
    car.categories = [3];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      9,
      "Honda",
      "Civic",
      "Sedan",
      60,
      "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Reliable and fuel-efficient compact sedan. Perfect for city driving with comfortable interior and modern features.",
      [
        "Bluetooth",
        "Backup Camera",
        "USB Ports",
        "Cruise Control",
        "Keyless Entry",
      ],
      {
        minAge: 21,
        deposit: 200,
        insurance:
          "Basic insurance included, premium available for additional fee",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      },
      [],
      4
    );
    car.categories = [1];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      10,
      "Chevrolet",
      "Suburban",
      "SUV",
      110,
      "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Full-size SUV with seating for up to 8 passengers. Ideal for large families or group travel with plenty of cargo space.",
      [
        "Three-Row Seating",
        "All-Wheel Drive",
        "Bluetooth",
        "Navigation",
        "Roof Rack",
      ],
      {
        minAge: 25,
        deposit: 400,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [2];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      11,
      "Ford",
      "F-150",
      "Truck",
      90,
      "https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=600",
      "America's best-selling truck. Powerful, versatile, and ready for work or play. Great towing capacity.",
      [
        "4x4",
        "Bluetooth",
        "Backup Camera",
        "Towing Package",
        "Apple CarPlay/Android Auto",
      ],
      {
        minAge: 25,
        deposit: 450,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [6, 7];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      12,
      "Hyundai",
      "Elantra",
      "Sedan",
      55,
      "https://images.pexels.com/photos/225841/pexels-photo-225841.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Stylish and affordable compact sedan with excellent fuel economy and modern safety features.",
      [
        "Bluetooth",
        "Backup Camera",
        "USB Ports",
        "Lane Keeping Assist",
        "Keyless Entry",
      ],
      {
        minAge: 21,
        deposit: 150,
        insurance: "Basic insurance included",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      }
    );
    car.categories = [1];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      13,
      "Kia",
      "Telluride",
      "SUV",
      100,
      "https://images.pexels.com/photos/112452/pexels-photo-112452.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Award-winning mid-size SUV known for its upscale interior, spacious seating for 8, and advanced tech.",
      [
        "Three-Row Seating",
        "All-Wheel Drive",
        "Leather Seats",
        "Navigation",
        "Sunroof",
      ],
      {
        minAge: 25,
        deposit: 350,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "150 miles per day, additional miles at $0.25 per mile",
      }
    );
    car.categories = [2];
    car.isFeatured = true;
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      14,
      "Mazda",
      "MX-5 Miata",
      "Convertible",
      105,
      "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=600",
      "The quintessential fun-to-drive roadster. Lightweight, agile, and perfect for scenic drives.",
      [
        "Convertible",
        "Manual Transmission Option",
        "Bluetooth",
        "Premium Sound System",
        "Sport Tuned Suspension",
      ],
      {
        minAge: 25,
        deposit: 500,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.35 per mile",
      }
    );
    car.categories = [4];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      15,
      "Volkswagen",
      "Jetta",
      "Sedan",
      62,
      "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=600",
      "German-engineered compact sedan offering a refined driving experience and comfortable cabin.",
      [
        "Bluetooth",
        "Backup Camera",
        "Apple CarPlay/Android Auto",
        "Cruise Control",
        "Heated Seats Option",
      ],
      {
        minAge: 21,
        deposit: 200,
        insurance: "Basic insurance included",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      }
    );
    car.categories = [1];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      16,
      "Audi",
      "A4",
      "Luxury",
      135,
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Sophisticated luxury sedan with premium materials, advanced technology, and a smooth, powerful ride.",
      [
        "Quattro All-Wheel Drive",
        "Virtual Cockpit",
        "Leather Seats",
        "Premium Sound System",
        "Sunroof",
      ],
      {
        minAge: 25,
        deposit: 600,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "150 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [3];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      17,
      "Subaru",
      "Outback",
      "SUV",
      88,
      "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "Rugged yet refined wagon/SUV crossover known for its standard AWD and safety features. Great for all weather.",
      [
        "Symmetrical All-Wheel Drive",
        "Eyesight Driver Assist",
        "Bluetooth",
        "Roof Rack",
        "Apple CarPlay/Android Auto",
      ],
      {
        minAge: 21,
        deposit: 300,
        insurance: "Basic insurance included",
        fuelPolicy: "Return with same fuel level",
        mileage: "Unlimited",
      }
    );
    car.categories = [2, 6];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      18,
      "Ford",
      "Transit",
      "Van",
      95,
      "https://images.pexels.com/photos/4488637/pexels-photo-4488637.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Large cargo or passenger van. Ideal for moving, group transportation, or business needs.",
      [
        "High Roof Option",
        "Backup Camera",
        "Bluetooth",
        "Cargo Tie-Downs",
        "Seating for 12 Option",
      ],
      {
        minAge: 25,
        deposit: 400,
        insurance: "Commercial insurance may be required",
        fuelPolicy: "Return with full tank",
        mileage: "150 miles per day, additional miles at $0.25 per mile",
      }
    );
    car.categories = [7];
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      19,
      "Hyundai",
      "Ioniq 5",
      "Electric",
      115,
      "https://images.pexels.com/photos/575386/pexels-photo-575386.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Distinctively styled electric crossover with a spacious, futuristic interior and fast-charging capabilities.",
      [
        "Electric",
        "Fast Charging",
        "Large Touchscreen",
        "Driver Assistance Package",
        "Panoramic Sunroof Option",
      ],
      {
        minAge: 25,
        deposit: 500,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with at least 50% charge",
        mileage: "Unlimited",
      }
    );
    car.categories = [5, 2];
    car.isFeatured = true;
    return car;
  })(),
  (() => {
    const car = new Entities.Car(
      20,
      "Ram",
      "1500",
      "Truck",
      92,
      "https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&w=600",
      "Full-size pickup truck offering a comfortable ride, powerful engine options, and impressive towing.",
      [
        "4x4 Option",
        "Crew Cab",
        "Bluetooth",
        "Backup Camera",
        "Towing Package",
      ],
      {
        minAge: 25,
        deposit: 450,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    );
    car.categories = [6, 7];
    return car;
  })(),
];

const sampleUsers = [
  new Entities.Admin(1, "admin", "admin@admin.com", "Pa$$w0rd!"),
  new Entities.Admin(2, "admin33", "admin@carrentalapp.com", "admin456"),
  new Entities.User(3, "user", "user@carrentalapp.com", "user789"),
  new Entities.User(4, "user23", "user23@carrentalapp.com", "user23123"),
  new Entities.Admin(5, "fleetadmin", "fleet@carrentalapp.com", "fleet123"),
  new Entities.User(
    6,
    "john_doe",
    "john.doe@email.com",
    "password123",
    "https://randomuser.me/api/portraits/men/75.jpg"
  ),
  new Entities.User(
    7,
    "jane_smith",
    "jane.s@webmail.com",
    "pass4jane",
    "https://randomuser.me/api/portraits/women/76.jpg"
  ),
  new Entities.User(8, "mike_r", "mike.rodriguez@email.com", "mikepass"),
  new Entities.User(
    9,
    "sarah_w",
    "sarah.williams@provider.net",
    "sarahsecret",
    "https://randomuser.me/api/portraits/women/78.jpg"
  ),
  new Entities.User(10, "david_c", "dchen@mailservice.org", "davidpass"),
  (() => {
    const seller = new Entities.Seller(
      11,
      "car_dealer",
      "seller@cars.com",
      "sellPass$"
    );
    seller.sellerRating = 4.2;
    seller.totalSales = 55;
    seller.productIds = [3, 8, 16];
    seller.userImg = "https://randomuser.me/api/portraits/men/80.jpg";
    return seller;
  })(),
  (() => {
    const seller = new Entities.Seller(
      12,
      "rent_master",
      "seller@bestwheels.com",
      "bestPass!"
    );
    seller.sellerRating = 4.8;
    seller.totalSales = 120;
    seller.productIds = [1, 2, 5, 9, 12, 15, 17];
    return seller;
  })(),
];

sampleUsers[0].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 12,
  15
).toISOString();
sampleUsers[1].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 8,
  22
).toISOString();
sampleUsers[2].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 6,
  10
).toISOString();
sampleUsers[3].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 3,
  5
).toISOString();
sampleUsers[4].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  20
).toISOString();
sampleUsers[5].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 5,
  1
).toISOString();
sampleUsers[6].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 4,
  11
).toISOString();
sampleUsers[7].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 2,
  18
).toISOString();
sampleUsers[8].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  2
).toISOString();
sampleUsers[9].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth(),
  3
).toISOString();
sampleUsers[10].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 7,
  5
).toISOString();
sampleUsers[11].registeredAt = new Date(
  today.getFullYear(),
  today.getMonth() - 5,
  10
).toISOString();

const sampleBookings = [
  (() => {
    const booking = new Entities.Booking(
      1,
      1,
      "John Smith",
      "john.smith@example.com",
      "555-123-4567",
      getDate(-2, 5),
      getDate(-2, 10),
      "completed",
      325,
      "BK78R29A",
      ["GPS", "Child Seat"]
    );
    booking.userId = 6;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      2,
      3,
      "Emily Johnson",
      "emily.j@example.com",
      "555-987-6543",
      getDate(0, 5),
      getDate(0, 8),
      "confirmed",
      360,
      "BK23L48P",
      ["Premium Insurance"]
    );
    booking.userId = 7;
    booking.promoCode = "SPRING25";
    booking.discountAmount = 54;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      3,
      6,
      "Michael Rodriguez",
      "michael.r@example.com",
      "555-456-7890",
      getDate(0, -2),
      getDate(0, 3),
      "ongoing",
      650,
      "BK47H93Q",
      ["Airport Pickup", "Premium Insurance"]
    );
    booking.userId = 8;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      4,
      4,
      "Sarah Williams",
      "sarah.w@example.com",
      "555-789-1234",
      getDate(0, 10),
      getDate(0, 15),
      "pending",
      550,
      "BK12J56T",
      ["GPS", "Additional Driver"]
    );
    booking.userId = 9;
    booking.promoCode = "LUXWEEKEND";
    booking.discountAmount = 110;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      5,
      2,
      "David Chen",
      "david.c@example.com",
      "555-234-5678",
      getDate(-3, 15),
      getDate(-3, 22),
      "completed",
      595,
      "BK39G74W",
      ["Child Seat"]
    );
    booking.userId = 10;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      6,
      8,
      "Jessica Brown",
      "jessica.b@example.com",
      "555-345-6789",
      getDate(1, 3),
      getDate(1, 10),
      "confirmed",
      980,
      "BK64D21R",
      ["Airport Pickup", "Premium Insurance", "GPS"]
    );
    booking.userId = 7;
    booking.promoCode = "LUXWEEKEND";
    booking.discountAmount = 196;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      7,
      5,
      "Robert Lee",
      "robert.l@example.com",
      "555-876-5432",
      getDate(-4, 10),
      getDate(-4, 17),
      "completed",
      490,
      "BK98F36K",
      []
    );
    booking.userId = 6;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      8,
      9,
      "Amanda Martinez",
      "amanda.m@example.com",
      "555-654-3210",
      getDate(0, 2),
      getDate(0, 6),
      "confirmed",
      240,
      "BK51N27J",
      ["Additional Driver"]
    );
    booking.userId = 8;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      9,
      7,
      "Thomas Wilson",
      "thomas.w@example.com",
      "555-765-4321",
      getDate(-2, 20),
      getDate(-2, 27),
      "completed",
      665,
      "BK17M85S",
      ["GPS", "Roof Rack"]
    );
    booking.userId = 9;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      10,
      10,
      "Patricia Garcia",
      "patricia.g@example.com",
      "555-987-1234",
      getDate(1, 15),
      getDate(1, 22),
      "pending",
      770,
      "BK73C19Y",
      ["Child Seat", "Additional Driver", "GPS"]
    );
    booking.userId = 10;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      11,
      11,
      "Chris Miller",
      "chris.m@example.com",
      "555-111-2222",
      getDate(0, 20),
      getDate(0, 23),
      "confirmed",
      270,
      null,
      ["Towing Hitch"]
    );
    booking.userId = 6;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      12,
      13,
      "Linda Davis",
      "linda.d@example.com",
      "555-333-4444",
      getDate(-1, 1),
      getDate(-1, 8),
      "completed",
      700,
      null,
      ["Sunroof", "GPS"]
    );
    booking.userId = 7;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      13,
      14,
      "Kevin Anderson",
      "kevin.a@example.com",
      "555-555-6666",
      getDate(0, 12),
      getDate(0, 14),
      "confirmed",
      210,
      null,
      ["Performance Package"]
    );
    booking.userId = 8;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      14,
      16,
      "Laura Martinez",
      "laura.m@example.com",
      "555-777-8888",
      getDate(1, 5),
      getDate(1, 12),
      "confirmed",
      945,
      null,
      ["Airport Pickup", "Premium Sound System"]
    );
    booking.userId = 9;
    booking.promoCode = "FIRSTTIME";
    booking.discountAmount = 142;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      15,
      17,
      "George Harris",
      "george.h@example.com",
      "555-999-0000",
      getDate(-1, 15),
      getDate(-1, 25),
      "completed",
      880,
      null,
      ["Ski Rack", "All-Weather Mats"]
    );
    booking.userId = 10;
    booking.promoCode = "LONGTERM100";
    booking.discountAmount = 100;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      16,
      18,
      "Moving Company Inc.",
      "contact@moveco.com",
      "555-000-1111",
      getDate(0, 1),
      getDate(0, 2),
      "ongoing",
      95,
      null,
      ["Cargo Van Setup"]
    );
    booking.promoCode = "BIZRENTAL";
    booking.discountAmount = 25;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      17,
      19,
      "Tech Enthusiast",
      "ioniq.lover@email.com",
      "555-222-3333",
      getDate(0, 7),
      getDate(0, 11),
      "confirmed",
      460,
      null,
      ["Fast Charging Access"]
    );
    booking.userId = 6;
    booking.promoCode = "GOGREEN";
    booking.discountAmount = 46;
    return booking;
  })(),
  new Entities.Booking(
    18,
    20,
    "Construction Crew",
    "crew.lead@construct.com",
    "555-444-5555",
    getDate(0, 9),
    getDate(0, 16),
    "confirmed",
    644,
    null,
    ["4x4", "Toolbox Space"]
  ), // No userId, no promo
  (() => {
    const booking = new Entities.Booking(
      19,
      1,
      "Repeat Customer",
      "repeat@example.com",
      "555-666-7777",
      getDate(1, 1),
      getDate(1, 4),
      "pending",
      195,
      null,
      []
    );
    booking.userId = 7;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      20,
      6,
      "Business Traveller",
      "biz@example.com",
      "555-888-9999",
      getDate(-1, 5),
      getDate(-1, 7),
      "completed",
      260,
      null,
      ["Autopilot Demo"]
    );
    booking.userId = 8;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      21,
      12,
      "Student Renter",
      "student@uni.edu",
      "555-121-2121",
      getDate(0, 18),
      getDate(0, 25),
      "confirmed",
      385,
      null,
      ["Fuel Efficient Option"]
    );
    booking.userId = 9;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      22,
      15,
      "City Explorer",
      "city@example.com",
      "555-343-4343",
      getDate(0, 3),
      getDate(0, 5),
      "ongoing",
      124,
      null,
      ["Parking Assist"]
    );
    booking.userId = 10;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      23,
      7,
      "Offroad Club",
      "jeepers@club.org",
      "555-565-6565",
      getDate(-1, 20),
      getDate(-1, 22),
      "cancelled",
      190,
      null,
      ["Winch Request"]
    );
    booking.userId = 6;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      24,
      10,
      "Family Reunion",
      "reunion@family.com",
      "555-787-8787",
      getDate(2, 1),
      getDate(2, 8),
      "pending",
      770,
      null,
      ["Extra Child Seat", "Roof Box"]
    );
    booking.userId = 7;
    booking.promoCode = "FAMILY50";
    booking.discountAmount = 50;
    return booking;
  })(),
  (() => {
    const booking = new Entities.Booking(
      25,
      8,
      "Anniversary Trip",
      "special@occasion.com",
      "555-909-0909",
      getDate(1, 20),
      getDate(1, 23),
      "confirmed",
      420,
      null,
      ["Champagne Holder"]
    );
    booking.userId = 8;
    return booking;
  })(),
];

const sampleReviews = [
  (() => {
    const review = new Entities.Review(
      1,
      1,
      "Alex Johnson",
      4,
      "Great everyday car. Smooth ride and excellent fuel economy.",
      reviewDate(-2, 15)
    );
    review.helpful = 2;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      2,
      1,
      "Maria Rodriguez",
      5,
      "Perfect for my family trip! Very comfortable and the Bluetooth connectivity was seamless.",
      reviewDate(-1, 10)
    );
    review.helpful = 3;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      3,
      2,
      "David Wilson",
      5,
      "Incredible SUV for our camping trip. Lots of space for gear and handled rough roads beautifully.",
      reviewDate(-3, 5)
    );
    review.helpful = 1;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      4,
      4,
      "James Chen",
      5,
      "What a thrill to drive! The convertible top made for an unforgettable coastal drive.",
      reviewDate(-2, 20)
    );
    review.helpful = 5;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      5,
      6,
      "Sophia Kim",
      4,
      "My first time driving an electric car and I loved it! The autopilot feature was impressive. Charging was easier than expected.",
      reviewDate(-1, 25)
    );
    review.helpful = 8;
    return review;
  })(),
  new Entities.Review(
    6,
    3,
    "Robert Garcia",
    3,
    "Luxury experience but the navigation system was a bit confusing to use. Great acceleration though!",
    reviewDate(-3, 15)
  ),
  (() => {
    const review = new Entities.Review(
      7,
      5,
      "Emily Thomas",
      5,
      "Incredible fuel efficiency! We drove for a week and barely used any gas. Very comfortable for a hybrid.",
      reviewDate(-2, 8)
    );
    review.helpful = 4;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      8,
      7,
      "Michael Brown",
      4,
      "Took it off-road and had a blast! A bit loud on the highway but that's expected with this type of vehicle.",
      reviewDate(-1, 18)
    );
    review.helpful = 1;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      9,
      8,
      "Sarah Davis",
      5,
      "Pure luxury! The leather seats and premium sound system made every journey a pleasure.",
      reviewDate(-2, 12)
    );
    review.helpful = 2;
    return review;
  })(),
  new Entities.Review(
    10,
    9,
    "Daniel Martinez",
    4,
    "Great value for money. Compact but surprisingly spacious inside. Perfect for city driving.",
    reviewDate(-1, 5)
  ),
  new Entities.Review(
    11,
    10,
    "Jessica Wilson",
    4,
    "Massive vehicle with tons of space! Took the whole family and all our luggage with room to spare.",
    reviewDate(-3, 25)
  ),
  (() => {
    const review = new Entities.Review(
      12,
      6,
      "Thomas Lee",
      5,
      "The acceleration is incredible! Loved the minimalist interior and the huge touchscreen.",
      reviewDate(-2, 28)
    );
    review.helpful = 6;
    return review;
  })(),
  new Entities.Review(
    13,
    2,
    "Olivia Johnson",
    4,
    "Great family SUV. Had plenty of room for our luggage and the kids loved it.",
    reviewDate(-1, 8)
  ),
  (() => {
    const review = new Entities.Review(
      14,
      5,
      "William Taylor",
      5,
      "The fuel efficiency is amazing! Perfect for eco-conscious travelers.",
      reviewDate(-2, 17)
    );
    review.helpful = 1;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      15,
      4,
      "Emma Anderson",
      5,
      "Such a fun car to drive along the coast! Powerful engine and turns heads everywhere.",
      reviewDate(-3, 12)
    );
    review.helpful = 2;
    return review;
  })(),
  new Entities.Review(
    16,
    11,
    "Contractor Bob",
    5,
    "F-150 handled all my tools and towed my trailer easily. Very capable truck.",
    reviewDate(-1, 3)
  ),
  (() => {
    const review = new Entities.Review(
      17,
      12,
      "Commuter Kate",
      4,
      "Elantra is super cheap on gas, perfect for my daily drive. Basic but does the job well.",
      reviewDate(-2, 5)
    );
    review.helpful = 1;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      18,
      13,
      "Family Vacationer",
      5,
      "The Telluride felt like a luxury car! Kids loved the space and the sunroof. Highly recommend.",
      reviewDate(-1, 15)
    );
    review.helpful = 7;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      19,
      14,
      "Weekend Cruiser",
      5,
      "Driving the Miata with the top down was pure joy. Handles like a dream!",
      reviewDate(-2, 22)
    );
    review.helpful = 2;
    return review;
  })(),
  new Entities.Review(
    20,
    15,
    "City Tourist",
    4,
    "Jetta was comfortable and easy to park in the city. Good infotainment system.",
    reviewDate(-1, 28)
  ),
  (() => {
    const review = new Entities.Review(
      21,
      16,
      "Business Professional",
      5,
      "Audi A4 impressed my clients. Quiet, smooth, and very high-tech.",
      reviewDate(-3, 10)
    );
    review.helpful = 3;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      22,
      17,
      "Skier Sam",
      4,
      "Outback was fantastic in the snow getting to the mountains. AWD felt very secure.",
      reviewDate(-2, 1)
    );
    review.helpful = 1;
    return review;
  })(),
  new Entities.Review(
    23,
    18,
    "Band Tour",
    3,
    "Transit Van fit all our gear, but the ride was a bit rough on long distances.",
    reviewDate(-1, 19)
  ),
  (() => {
    const review = new Entities.Review(
      24,
      19,
      "Early Adopter",
      5,
      "Ioniq 5 looks amazing and drives great. Fast charging was a huge plus.",
      reviewDate(-2, 9)
    );
    review.helpful = 9;
    return review;
  })(),
  new Entities.Review(
    25,
    20,
    "DIY Dave",
    4,
    "Ram 1500 was great for hauling supplies from the hardware store. Comfortable interior too.",
    reviewDate(-1, 11)
  ),
  new Entities.Review(
    26,
    1,
    "Rental Regular",
    4,
    "Another solid rental with the Camry. Predictable and reliable.",
    reviewDate(-1, 2)
  ),
  (() => {
    const review = new Entities.Review(
      27,
      3,
      "Short Trip",
      4,
      "Rented the BMW for a weekend. Fast and luxurious, but pricey.",
      reviewDate(-2, 14)
    );
    review.helpful = 1;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      28,
      13,
      "Road Tripper",
      5,
      "Took the Telluride across three states. So comfortable and spacious for everyone.",
      reviewDate(-2, 25)
    );
    review.helpful = 3;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      29,
      17,
      "Dog Owner",
      5,
      "Outback had plenty of room for my two large dogs in the back. Easy to clean too.",
      reviewDate(-1, 7)
    );
    review.helpful = 5;
    return review;
  })(),
  (() => {
    const review = new Entities.Review(
      30,
      6,
      "EV Curious",
      5,
      "Renting the Model 3 convinced me to buy an EV. It's the future!",
      reviewDate(-3, 1)
    );
    review.helpful = 2;
    return review;
  })(),
];

const sampleFeaturedVehicles = [
  new Entities.FeaturedVehicle(
    6,
    1,
    "Experience the Future: Tesla Model 3",
    "All-electric luxury sedan with impressive range and acceleration. Features advanced autopilot technology.",
    true
  ),
  new Entities.FeaturedVehicle(
    13,
    2,
    "Award-Winning Family SUV: Kia Telluride",
    "Upscale interior, spacious seating for 8, and packed with advanced safety and tech features.",
    true
  ),
  new Entities.FeaturedVehicle(
    4,
    3,
    "Unleash the Thrill: Ford Mustang",
    "Iconic American muscle car with powerful V8 engine and classic styling. Available as convertible.",
    true
  ),
  new Entities.FeaturedVehicle(
    19,
    4,
    "Style Meets Sustainability: Hyundai Ioniq 5",
    "Distinctive electric crossover with a futuristic design, spacious cabin, and ultra-fast charging.",
    true
  ),
];

const samplePromotions = [
  new Entities.Promotion(
    1,
    "Spring Savings",
    "Enjoy 15% off on Economy & Hybrid vehicles this spring!",
    0.15,
    promoDate(-1, 1),
    promoDate(2, 30),
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    2,
    "Luxury & Sports Weekend",
    "20% off Luxury, Sports & Convertibles for weekend rentals (Fri-Sun pickup)",
    0.2,
    promoDate(0, 1),
    promoDate(3, 30),
    "https://images.pexels.com/photos/1888015/pexels-photo-1888015.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    3,
    "Family Adventure Discount",
    "Flat $50 off on SUVs & Trucks for rentals of 5 days or more",
    50,
    promoDate(0, 15),
    promoDate(4, 30),
    "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    4,
    "Go Green Initiative",
    "10% off on all Hybrid and Electric vehicles",
    0.1,
    promoDate(-2, 1),
    promoDate(4, 30),
    "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    5,
    "First-Time Renter Special",
    "Welcome! Get 15% off your first rental with us",
    0.15,
    promoDate(-3, 1),
    promoDate(9, 30),
    "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    6,
    "Long Term Rental Bonus",
    "Rent for 14 days or more and get $100 off!",
    100,
    promoDate(0, 1),
    promoDate(12, 31),
    "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
  new Entities.Promotion(
    7,
    "Business Class Van Rental",
    "$25 Off Ford Transit Rentals for Business Use",
    25,
    promoDate(0, 1),
    promoDate(6, 30),
    "https://images.pexels.com/photos/4488643/pexels-photo-4488643.jpeg?auto=compress&cs=tinysrgb&w=500",
    true
  ),
];

const sampleReports = [
  new Entities.Report(1, reportMonth(6), 18, 2950, {
    "9-11": 4,
    "11-13": 6,
    "13-15": 5,
    "15-17": 3,
  }),
  new Entities.Report(2, reportMonth(5), 22, 3100, {
    "9-11": 5,
    "11-13": 7,
    "13-15": 6,
    "15-17": 4,
  }),
  new Entities.Report(3, reportMonth(4), 25, 3480, {
    "9-11": 5,
    "11-13": 8,
    "13-15": 7,
    "15-17": 5,
  }),
  new Entities.Report(4, reportMonth(3), 24, 3280, {
    "9-11": 5,
    "11-13": 7,
    "13-15": 8,
    "15-17": 4,
  }),
  new Entities.Report(5, reportMonth(2), 31, 4150, {
    "9-11": 6,
    "11-13": 9,
    "13-15": 10,
    "15-17": 6,
  }),
  new Entities.Report(6, reportMonth(1), 28, 3720, {
    "9-11": 5,
    "11-13": 8,
    "13-15": 9,
    "15-17": 6,
  }),
];

function initializeEntity(key, Arr) {
  if (!getData(key)) {
    saveData(key, Arr);
    console.log(` ${key} initialized.`);
  } else {
    console.log(`${key} already exist in localStorage.`);
  }
}

function initializeAllData() {
  initializeEntity("categories", sampleCategories);
  initializeEntity("cars", sampleCars);
  initializeEntity("users", sampleUsers);
  initializeEntity("bookings", sampleBookings);
  initializeEntity("reviews", sampleReviews);
  initializeEntity("featuredVehicles", sampleFeaturedVehicles);
  initializeEntity("promotions", samplePromotions);
  initializeEntity("reports", sampleReports);
}

initializeAllData();
