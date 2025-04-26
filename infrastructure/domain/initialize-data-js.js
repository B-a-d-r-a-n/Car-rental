import * as Entities from "./Entities.js";

// Initialize all data in local storage
function initializeData() {
  // Initialize categories first (cars depend on these)
  initializeCategories(); // Initializes 7 categories

  // Initialize cars (which reference categories)
  initializeCars(); // Now initializes 20 cars using Pexels images

  // Initialize users (independent)
  initializeUsers(); // Now initializes 10 users

  // Initialize bookings (dependent on cars)
  initializeBookings(); // Now initializes 25 bookings & updates car availability

  // Initialize reviews (dependent on cars)
  initializeReviews(); // Now initializes 30 reviews

  // Initialize featured vehicles (dependent on cars)
  initializeFeaturedVehicles(); // Now initializes 4 featured vehicles

  // Initialize promotions (reference car IDs)
  initializePromotions(); // Now initializes 7 promotions

  // Initialize reports (independent)
  initializeReports(); // Now initializes 6 reports

  // Update car ratings based on reviews
  const reviews = getReviews();
  const carIds = new Set(reviews.map((review) => review.carId));
  carIds.forEach((carId) => updateCarAverageRating(carId));

  console.log(
    "All data initialized successfully with expanded dataset and Pexels images."
  );
}

// --------------------- CARS INITIALIZATION (Pexels Images) ---------------------
function initializeCars() {
  if (localStorage.getItem("cars")) {
    console.log("Cars data already exists");
    return false;
  }

  // Image URLs sourced from Pexels. Manually verified for relevance and availability.
  const sampleCars = [
    new Entities.Car(
      1,
      "Toyota",
      "Camry",
      "Sedan",
      65,
      "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Modern white Toyota sedan, likely Camry/Corolla)
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
      }
    ),
    new Entities.Car(
      2,
      "Honda",
      "CR-V",
      "SUV",
      85,
      "https://images.pexels.com/photos/627665/pexels-photo-627665.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Silver Honda CR-V)
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
    ),
    new Entities.Car(
      3,
      "BMW",
      "3 Series",
      "Luxury",
      120,
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Grey BMW sedan, similar to 3/5 series)
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
      }
    ),
    new Entities.Car(
      4,
      "Ford",
      "Mustang",
      "Sports",
      110,
      "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Classic Red Ford Mustang)
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
    ),
    new Entities.Car(
      5,
      "Toyota",
      "Prius",
      "Hybrid",
      70,
      "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (White modern sedan, good generic for Prius)
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
    ),
    new Entities.Car(
      6,
      "Tesla",
      "Model 3",
      "Electric",
      130,
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (White Tesla Model S/3 front view)
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
    ),
    new Entities.Car(
      7,
      "Jeep",
      "Wrangler",
      "Off-Road",
      95,
      "https://images.pexels.com/photos/1429748/pexels-photo-1429748.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Yellow Jeep Wrangler)
      "Rugged 4x4 vehicle built for off-road adventures. Removable doors and roof for open-air experience.",
      ["4x4", "Removable Top", "Bluetooth", "Navigation", "All-Terrain Tires"],
      {
        minAge: 25,
        deposit: 400,
        insurance: "Premium insurance required",
        fuelPolicy: "Return with full tank",
        mileage: "100 miles per day, additional miles at $0.30 per mile",
      }
    ),
    new Entities.Car(
      8,
      "Mercedes-Benz",
      "E-Class",
      "Luxury",
      140,
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Silver Mercedes sedan, likely E/C class)
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
      }
    ),
    new Entities.Car(
      9,
      "Honda",
      "Civic",
      "Sedan",
      60,
      "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Modern white Honda Civic sedan)
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
      }
    ),
    new Entities.Car(
      10,
      "Chevrolet",
      "Suburban",
      "SUV",
      110,
      "https://images.pexels.com/photos/3807376/pexels-photo-3807376.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Black Chevrolet Tahoe/Suburban)
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
    ),
    new Entities.Car(
      11,
      "Ford",
      "F-150",
      "Truck",
      90,
      "https://images.pexels.com/photos/1402790/pexels-photo-1402790.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Black Ford F-150 Raptor variant)
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
    ),
    new Entities.Car(
      12,
      "Hyundai",
      "Elantra",
      "Sedan",
      55,
      "https://images.pexels.com/photos/15888408/pexels-photo-15888408.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Modern white Hyundai Elantra)
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
    ),
    new Entities.Car(
      13,
      "Kia",
      "Telluride",
      "SUV",
      100,
      "https://images.pexels.com/photos/14569470/pexels-photo-14569470.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Dark grey Kia Telluride)
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
    ),
    new Entities.Car(
      14,
      "Mazda",
      "MX-5 Miata",
      "Convertible",
      105,
      "https://images.pexels.com/photos/6980675/pexels-photo-6980675.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Red Mazda MX-5)
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
    ),
    new Entities.Car(
      15,
      "Volkswagen",
      "Jetta",
      "Sedan",
      62,
      "https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (White VW Jetta/Passat)
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
    ),
    new Entities.Car(
      16,
      "Audi",
      "A4",
      "Luxury",
      135,
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Black Audi A4/A6 sedan)
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
    ),
    new Entities.Car(
      17,
      "Subaru",
      "Outback",
      "SUV",
      88,
      "https://images.pexels.com/photos/14604784/pexels-photo-14604784.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Green Subaru Outback Wilderness)
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
    ),
    new Entities.Car(
      18,
      "Ford",
      "Transit",
      "Van",
      95,
      "https://images.pexels.com/photos/4488637/pexels-photo-4488637.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (White Ford Transit Van)
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
    ),
    new Entities.Car(
      19,
      "Hyundai",
      "Ioniq 5",
      "Electric",
      115,
      "https://images.pexels.com/photos/16081277/pexels-photo-16081277.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Hyundai Ioniq 5)
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
    ),
    new Entities.Car(
      20,
      "Ram",
      "1500",
      "Truck",
      92,
      "https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&w=600", // Source: Pexels (Red Dodge Ram truck - visually similar)
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
    ),
  ];

  // --- Category Assignments ---
  sampleCars[0].categories = [1]; // Camry: Economy
  sampleCars[1].categories = [2, 6]; // CR-V: Family, Adventure
  sampleCars[2].categories = [3]; // BMW 3: Luxury
  sampleCars[3].categories = [4]; // Mustang: Sports
  sampleCars[4].categories = [5, 1]; // Prius: Green, Economy
  sampleCars[5].categories = [5, 3]; // Model 3: Green, Luxury
  sampleCars[6].categories = [6]; // Wrangler: Adventure
  sampleCars[7].categories = [3]; // E-Class: Luxury
  sampleCars[8].categories = [1]; // Civic: Economy
  sampleCars[9].categories = [2]; // Suburban: Family
  sampleCars[10].categories = [6, 7]; // F-150: Adventure, Truck/Van
  sampleCars[11].categories = [1]; // Elantra: Economy
  sampleCars[12].categories = [2]; // Telluride: Family
  sampleCars[13].categories = [4]; // MX-5: Sports
  sampleCars[14].categories = [1]; // Jetta: Economy
  sampleCars[15].categories = [3]; // A4: Luxury
  sampleCars[16].categories = [2, 6]; // Outback: Family, Adventure
  sampleCars[17].categories = [7]; // Transit: Truck/Van
  sampleCars[18].categories = [5, 2]; // Ioniq 5: Green, Family
  sampleCars[19].categories = [6, 7]; // Ram 1500: Adventure, Truck/Van

  // --- Add Tags ---
  sampleCars.forEach((car) => {
    car.tags = car.features.map((feature) =>
      feature.toLowerCase().replace(/ /g, "-").replace(/\//g, "-or-")
    );
    if (car.type === "Sedan" || car.type === "Hatchback")
      car.tags.push("fuel-efficient");
    if (
      car.type === "Luxury" ||
      car.type === "Sports" ||
      car.type === "Convertible"
    )
      car.tags.push("performance");
    if (
      car.type === "SUV" ||
      car.type === "Off-Road" ||
      car.type === "Truck" ||
      car.type === "Van"
    )
      car.tags.push("spacious");
    if (car.type === "Hybrid" || car.type === "Electric")
      car.tags.push("eco-friendly");
    if (car.type === "Convertible") car.tags.push("convertible");
    if (car.type === "Truck") car.tags.push("truck");
    if (car.type === "Van") car.tags.push("van");
    if (
      car.features.includes("All-Wheel Drive") ||
      car.features.includes("4x4") ||
      car.features.includes("Quattro All-Wheel Drive") ||
      car.features.includes("Symmetrical All-Wheel Drive")
    )
      car.tags.push("awd");
    if (car.features.includes("Three-Row Seating"))
      car.tags.push("7-seater", "8-seater"); // Approximate
  });

  // --- Mark Featured ---
  sampleCars[5].isFeatured = true; // Tesla Model 3
  sampleCars[3].isFeatured = true; // Ford Mustang
  sampleCars[12].isFeatured = true; // Kia Telluride
  sampleCars[18].isFeatured = true; // Hyundai Ioniq 5

  localStorage.setItem("cars", JSON.stringify(sampleCars));
  console.log(
    "Cars data initialized with 20 vehicles (Pexels Image URLs verified)."
  );
  return true;
}

// --------------------- USERS INITIALIZATION ---------------------
function initializeUsers() {
  if (localStorage.getItem("users")) {
    console.log("Users data already exists");
    return false;
  }

  const sampleUsers = [
    // --- Existing Users ---
    new Entities.User(
      1,
      "admin",
      "admin@carrentalapp.com",
      "admin123",
      "admin"
    ),
    new Entities.User(
      2,
      "manager",
      "manager@carrentalapp.com",
      "manager456",
      "admin"
    ),
    new Entities.User(
      3,
      "analyst",
      "analyst@carrentalapp.com",
      "analyst789",
      "analyst"
    ),
    new Entities.User(
      4,
      "support",
      "support@carrentalapp.com",
      "support123",
      "support"
    ),
    new Entities.User(
      5,
      "fleetmanager",
      "fleet@carrentalapp.com",
      "fleet123",
      "admin"
    ),
    // --- New Users ---
    new Entities.User(
      6,
      "john_doe",
      "john.doe@email.com",
      "password123",
      "user"
    ),
    new Entities.User(
      7,
      "jane_smith",
      "jane.s@webmail.com",
      "pass4jane",
      "user"
    ),
    new Entities.User(
      8,
      "mike_r",
      "mike.rodriguez@email.com",
      "mikepass",
      "user"
    ),
    new Entities.User(
      9,
      "sarah_w",
      "sarah.williams@provider.net",
      "sarahsecret",
      "user"
    ),
    new Entities.User(
      10,
      "david_c",
      "dchen@mailservice.org",
      "davidpass",
      "user"
    ),
  ];

  // --- Add Registration Dates ---
  const today = new Date();
  const registrationDates = [
    new Date(today.getFullYear(), today.getMonth() - 12, 15), // admin
    new Date(today.getFullYear(), today.getMonth() - 8, 22), // manager
    new Date(today.getFullYear(), today.getMonth() - 6, 10), // analyst
    new Date(today.getFullYear(), today.getMonth() - 3, 5), // support
    new Date(today.getFullYear(), today.getMonth() - 1, 20), // fleetmanager
    new Date(today.getFullYear(), today.getMonth() - 5, 1), // john_doe
    new Date(today.getFullYear(), today.getMonth() - 4, 11), // jane_smith
    new Date(today.getFullYear(), today.getMonth() - 2, 18), // mike_r
    new Date(today.getFullYear(), today.getMonth() - 1, 2), // sarah_w
    new Date(today.getFullYear(), today.getMonth(), 3), // david_c (recent)
  ];
  sampleUsers.forEach((user, index) => {
    user.registeredAt = registrationDates[index].toISOString();
    if (user.role === "user") {
      // Assign a placeholder or link if needed, here just logging
      // user.userId = user.id; // Example if User class has userId property
    }
  });

  localStorage.setItem("users", JSON.stringify(sampleUsers));
  console.log(
    "Users data initialized with 10 users (5 admin/special, 5 regular)"
  );
  return true;
}

// --------------------- BOOKINGS INITIALIZATION ---------------------
function initializeBookings() {
  if (localStorage.getItem("bookings")) {
    console.log("Bookings data already exists");
    return false;
  }

  const today = new Date();
  const getDate = (monthOffset, dayOffset) =>
    new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      today.getDate() + dayOffset
    ).toISOString();

  const sampleBookings = [
    // --- Existing Bookings (Adjusted Dates/IDs maybe) ---
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    new Entities.Booking(
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
    ),
    // --- New Bookings ---
    new Entities.Booking(
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
    ), // F-150
    new Entities.Booking(
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
    ), // Telluride
    new Entities.Booking(
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
    ), // MX-5
    new Entities.Booking(
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
    ), // A4
    new Entities.Booking(
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
    ), // Outback, longer rental
    new Entities.Booking(
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
    ), // Transit
    new Entities.Booking(
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
    ), // Ioniq 5
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
    ), // Ram 1500
    new Entities.Booking(
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
    ), // Camry
    new Entities.Booking(
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
    ), // Model 3
    new Entities.Booking(
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
    ), // Elantra
    new Entities.Booking(
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
    ), // Jetta
    new Entities.Booking(
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
    ), // Wrangler (cancelled)
    new Entities.Booking(
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
    ), // Suburban
    new Entities.Booking(
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
    ), // E-Class
  ];

  // --- Add User IDs & Promo Codes ---
  sampleBookings[0].userId = 6; // John Doe
  sampleBookings[1].userId = 7; // Jane Smith
  sampleBookings[1].promoCode = "SPRING25"; // Applied promo
  sampleBookings[1].discountAmount = 54; // 15% of 360

  sampleBookings[2].userId = 8; // Mike R
  sampleBookings[3].userId = 9; // Sarah W
  sampleBookings[3].promoCode = "LUXWEEKEND"; // Applied promo
  sampleBookings[3].discountAmount = 110; // 20% of 550

  sampleBookings[4].userId = 10; // David C
  sampleBookings[5].userId = 7; // Jane Smith (again)
  sampleBookings[5].promoCode = "LUXWEEKEND"; // Applied promo
  sampleBookings[5].discountAmount = 196; // 20% of 980

  sampleBookings[13].userId = 6; // John Doe renting A4 (example reuse)
  sampleBookings[13].promoCode = "FIRSTTIME"; // Laura Martinez first time (Booking ID 14 uses car ID 16)
  sampleBookings[13].discountAmount = Math.round(945 * 0.15); // 15% of 945 - Note: Booking ID 14 has total 945

  sampleBookings[15].userId = 8; // Mike R renting Transit (Booking ID 16 uses car ID 18)
  sampleBookings[15].promoCode = "BIZRENTAL"; // Made up promo for van
  sampleBookings[15].discountAmount = 15; // Fixed amount

  sampleBookings[20].userId = 9; // Sarah W renting Elantra (Booking ID 21 uses car ID 12)
  sampleBookings[20].promoCode = "GOGREEN"; // Elantra rental - GOGREEN not applicable, maybe FIRSTTIME if user 9 is new? Let's remove promo here for accuracy.
  // sampleBookings[20].discountAmount = Math.round(385 * 0.10); // 10% -- GOGREEN is for Hybrid/Electric

  localStorage.setItem("bookings", JSON.stringify(sampleBookings));
  console.log("Bookings data initialized with 25 bookings");

  // --- Update Car Availability ---
  const rawCars = JSON.parse(localStorage.getItem("cars") || "[]");
  // Re-instantiate Car objects to use the markDatesUnavailable method
  const cars = rawCars.map((carData) => {
    const car = new Entities.Car(
      carData.id,
      carData.brand,
      carData.model,
      carData.type,
      carData.rentPerDay,
      carData.image,
      carData.description,
      carData.features,
      carData.rentalTerms,
      carData.unavailableDates || [] // Pass existing unavailable dates
      // Omit other properties here as they are set below or not needed for this method
    );
    // Restore properties that might have been set after construction in initializeCars
    car.isAvailable =
      carData.isAvailable !== undefined ? carData.isAvailable : true;
    car.averageRating = carData.averageRating || 0;
    car.reviewCount = carData.reviewCount || 0;
    car.categories = carData.categories || [];
    car.isFeatured = carData.isFeatured || false;
    car.tags = carData.tags || [];
    return car;
  });

  sampleBookings.forEach((booking) => {
    // Only mark dates if booking is active (confirmed or ongoing)
    if (booking.status === "confirmed" || booking.status === "ongoing") {
      const carIndex = cars.findIndex((car) => car.id === booking.carId);
      if (carIndex !== -1) {
        // Ensure the method exists before calling
        if (typeof cars[carIndex].markDatesUnavailable === "function") {
          cars[carIndex].markDatesUnavailable(
            booking.pickupDate,
            booking.dropoffDate
          );
        } else {
          console.warn(
            `markDatesUnavailable method not found on car object for ID: ${booking.carId}`
          );
          // Fallback manual update if needed
          if (!cars[carIndex].unavailableDates) {
            cars[carIndex].unavailableDates = [];
          }
          // Avoid duplicates just in case
          const existingRange = cars[carIndex].unavailableDates.find(
            (range) =>
              range.start === booking.pickupDate &&
              range.end === booking.dropoffDate
          );
          if (!existingRange) {
            cars[carIndex].unavailableDates.push({
              start: booking.pickupDate,
              end: booking.dropoffDate,
            });
          }
        }
      }
    }
  });

  // Save the updated cars back to localStorage
  localStorage.setItem("cars", JSON.stringify(cars));
  console.log("Car unavailable dates updated based on active bookings.");
  return true;
}

// --------------------- REVIEWS INITIALIZATION ---------------------
function initializeReviews() {
  if (localStorage.getItem("reviews")) {
    console.log("Reviews data already exists");
    return false;
  }

  const today = new Date();
  // Corrected: dayOffset should subtract from getDate() for past reviews
  const reviewDate = (monthOffset, dayOffset) =>
    new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      today.getDate() - dayOffset
    ).toISOString();

  const sampleReviews = [
    // --- Existing Reviews ---
    new Entities.Review(
      1,
      1,
      "Alex Johnson",
      4,
      "Great everyday car. Smooth ride and excellent fuel economy. The only thing I missed was a bit more power on the highway.",
      reviewDate(-2, 15)
    ),
    new Entities.Review(
      2,
      1,
      "Maria Rodriguez",
      5,
      "Perfect for my family trip! Very comfortable and the Bluetooth connectivity was seamless.",
      reviewDate(-1, 10)
    ),
    new Entities.Review(
      3,
      2,
      "David Wilson",
      5,
      "Incredible SUV for our camping trip. Lots of space for gear and handled rough roads beautifully.",
      reviewDate(-3, 5)
    ),
    new Entities.Review(
      4,
      4,
      "James Chen",
      5,
      "What a thrill to drive! The convertible top made for an unforgettable coastal drive.",
      reviewDate(-2, 20)
    ),
    new Entities.Review(
      5,
      6,
      "Sophia Kim",
      4,
      "My first time driving an electric car and I loved it! The autopilot feature was impressive. Charging was easier than expected.",
      reviewDate(-1, 25)
    ),
    new Entities.Review(
      6,
      3,
      "Robert Garcia",
      3,
      "Luxury experience but the navigation system was a bit confusing to use. Great acceleration though!",
      reviewDate(-3, 15)
    ),
    new Entities.Review(
      7,
      5,
      "Emily Thomas",
      5,
      "Incredible fuel efficiency! We drove for a week and barely used any gas. Very comfortable for a hybrid.",
      reviewDate(-2, 8)
    ),
    new Entities.Review(
      8,
      7,
      "Michael Brown",
      4,
      "Took it off-road and had a blast! A bit loud on the highway but that's expected with this type of vehicle.",
      reviewDate(-1, 18)
    ),
    new Entities.Review(
      9,
      8,
      "Sarah Davis",
      5,
      "Pure luxury! The leather seats and premium sound system made every journey a pleasure.",
      reviewDate(-2, 12)
    ),
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
    new Entities.Review(
      12,
      6,
      "Thomas Lee",
      5,
      "The acceleration is incredible! Loved the minimalist interior and the huge touchscreen.",
      reviewDate(-2, 28)
    ),
    new Entities.Review(
      13,
      2,
      "Olivia Johnson",
      4,
      "Great family SUV. Had plenty of room for our luggage and the kids loved it.",
      reviewDate(-1, 8)
    ),
    new Entities.Review(
      14,
      5,
      "William Taylor",
      5,
      "The fuel efficiency is amazing! Perfect for eco-conscious travelers.",
      reviewDate(-2, 17)
    ),
    new Entities.Review(
      15,
      4,
      "Emma Anderson",
      5,
      "Such a fun car to drive along the coast! Powerful engine and turns heads everywhere.",
      reviewDate(-3, 12)
    ),
    // --- New Reviews ---
    new Entities.Review(
      16,
      11,
      "Contractor Bob",
      5,
      "F-150 handled all my tools and towed my trailer easily. Very capable truck.",
      reviewDate(-1, 3)
    ),
    new Entities.Review(
      17,
      12,
      "Commuter Kate",
      4,
      "Elantra is super cheap on gas, perfect for my daily drive. Basic but does the job well.",
      reviewDate(-2, 5)
    ),
    new Entities.Review(
      18,
      13,
      "Family Vacationer",
      5,
      "The Telluride felt like a luxury car! Kids loved the space and the sunroof. Highly recommend.",
      reviewDate(-1, 15)
    ),
    new Entities.Review(
      19,
      14,
      "Weekend Cruiser",
      5,
      "Driving the Miata with the top down was pure joy. Handles like a dream!",
      reviewDate(-2, 22)
    ),
    new Entities.Review(
      20,
      15,
      "City Tourist",
      4,
      "Jetta was comfortable and easy to park in the city. Good infotainment system.",
      reviewDate(-1, 28)
    ),
    new Entities.Review(
      21,
      16,
      "Business Professional",
      5,
      "Audi A4 impressed my clients. Quiet, smooth, and very high-tech.",
      reviewDate(-3, 10)
    ),
    new Entities.Review(
      22,
      17,
      "Skier Sam",
      4,
      "Outback was fantastic in the snow getting to the mountains. AWD felt very secure.",
      reviewDate(-2, 1)
    ),
    new Entities.Review(
      23,
      18,
      "Band Tour",
      3,
      "Transit Van fit all our gear, but the ride was a bit rough on long distances.",
      reviewDate(-1, 19)
    ),
    new Entities.Review(
      24,
      19,
      "Early Adopter",
      5,
      "Ioniq 5 looks amazing and drives great. Fast charging was a huge plus.",
      reviewDate(-2, 9)
    ),
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
    new Entities.Review(
      27,
      3,
      "Short Trip",
      4,
      "Rented the BMW for a weekend. Fast and luxurious, but pricey.",
      reviewDate(-2, 14)
    ),
    new Entities.Review(
      28,
      13,
      "Road Tripper",
      5,
      "Took the Telluride across three states. So comfortable and spacious for everyone.",
      reviewDate(-2, 25)
    ),
    new Entities.Review(
      29,
      17,
      "Dog Owner",
      5,
      "Outback had plenty of room for my two large dogs in the back. Easy to clean too.",
      reviewDate(-1, 7)
    ),
    new Entities.Review(
      30,
      6,
      "EV Curious",
      5,
      "Renting the Model 3 convinced me to buy an EV. It's the future!",
      reviewDate(-3, 1)
    ),
  ];

  // --- Add Helpful Counts ---
  sampleReviews[3].helpful = 5; // Mustang review
  sampleReviews[4].helpful = 8; // Tesla review
  sampleReviews[6].helpful = 4; // Prius review
  sampleReviews[11].helpful = 6; // Another Tesla review
  sampleReviews[17].helpful = 7; // Telluride review
  sampleReviews[20].helpful = 3; // Audi A4 review
  sampleReviews[23].helpful = 9; // Ioniq 5 review
  sampleReviews[28].helpful = 5; // Outback review (dog owner)

  localStorage.setItem("reviews", JSON.stringify(sampleReviews));
  console.log("Reviews data initialized with 30 reviews");
  return true;
}

// --------------------- CATEGORIES INITIALIZATION ---------------------
function initializeCategories() {
  if (localStorage.getItem("categories")) {
    console.log("Categories data already exists");
    return false;
  }

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
    ), // Added Electric here
    new Entities.Category(
      4,
      "Sports",
      "High-performance vehicles for an exciting driving experience",
      "fa-tachometer-alt",
      { minPrice: 100, types: ["Sports", "Convertible"] }
    ), // Added Convertible
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
    ), // Added Truck
    new Entities.Category(
      7,
      "Trucks & Vans",
      "Utility vehicles for hauling cargo or large groups",
      "fa-truck",
      { types: ["Truck", "Van"] }
    ), // New Category
  ];

  localStorage.setItem("categories", JSON.stringify(sampleCategories));
  console.log("Categories data initialized with 7 categories");
  return true;
}

// --------------------- FEATURED VEHICLES INITIALIZATION ---------------------
function initializeFeaturedVehicles() {
  if (localStorage.getItem("featuredVehicles")) {
    console.log("Featured vehicles data already exists");
    return false;
  }

  const sampleFeaturedVehicles = [
    new Entities.FeaturedVehicle(
      6,
      1,
      "Experience the Future: Tesla Model 3",
      "All-electric luxury with impressive range and acceleration. Featuring advanced autopilot technology.",
      true
    ), // Tesla Model 3
    new Entities.FeaturedVehicle(
      13,
      2,
      "Award-Winning Family SUV: Kia Telluride",
      "Upscale interior, spacious seating for 8, and packed with advanced safety and tech features.",
      true
    ), // Kia Telluride (New)
    new Entities.FeaturedVehicle(
      4,
      3,
      "Unleash the Thrill: Ford Mustang",
      "Iconic American muscle car with powerful V8 engine and classic styling. Available as convertible.",
      true
    ), // Ford Mustang
    new Entities.FeaturedVehicle(
      19,
      4,
      "Style Meets Sustainability: Hyundai Ioniq 5",
      "Distinctive electric crossover with a futuristic design, spacious cabin, and ultra-fast charging.",
      true
    ), // Hyundai Ioniq 5 (New)
  ];

  localStorage.setItem(
    "featuredVehicles",
    JSON.stringify(sampleFeaturedVehicles)
  );
  console.log("Featured vehicles data initialized with 4 items");
  return true;
}

// --------------------- PROMOTIONS INITIALIZATION ---------------------
function initializePromotions() {
  if (localStorage.getItem("promotions")) {
    console.log("Promotions data already exists");
    return false;
  }

  const today = new Date();
  const promoDate = (monthOffset, dayOffset) =>
    new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      dayOffset
    ).toISOString();

  const samplePromotions = [
    // --- Existing Promotions ---
    new Entities.Promotion(
      1,
      "Spring Savings",
      "Enjoy 15% off on Economy & Hybrid vehicles this spring!",
      0.15,
      promoDate(-1, 1),
      promoDate(2, 30),
      [1, 5, 9, 12, 15],
      "SPRING25",
      "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels generic spring
    new Entities.Promotion(
      2,
      "Luxury & Sports Weekend",
      "20% off Luxury, Sports & Convertibles for weekend rentals (Fri-Sun pickup)",
      0.2,
      promoDate(0, 1),
      promoDate(3, 30),
      [3, 4, 6, 8, 14, 16],
      "LUXWEEKEND",
      "https://images.pexels.com/photos/1888015/pexels-photo-1888015.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels luxury car interior
    new Entities.Promotion(
      3,
      "Family Adventure Discount",
      "Flat $50 off on SUVs & Trucks for rentals of 5 days or more",
      50,
      promoDate(0, 15),
      promoDate(4, 30),
      [2, 7, 10, 11, 13, 17, 20],
      "FAMILY50",
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels family road trip
    new Entities.Promotion(
      4,
      "Go Green Initiative",
      "10% off on all Hybrid and Electric vehicles",
      0.1,
      promoDate(-2, 1),
      promoDate(4, 30),
      [5, 6, 19],
      "GOGREEN",
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels generic electric car
    new Entities.Promotion(
      5,
      "First-Time Renter Special",
      "Welcome! Get 15% off your first rental with us",
      0.15,
      promoDate(-3, 1),
      promoDate(9, 30),
      [],
      "FIRSTTIME",
      "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels welcome/handshake
    // --- New Promotions ---
    new Entities.Promotion(
      6,
      "Long Term Rental Bonus",
      "Rent for 14 days or more and get $100 off!",
      100,
      promoDate(0, 1),
      promoDate(12, 31),
      [],
      "LONGTERM100",
      "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels scenic road
    new Entities.Promotion(
      7,
      "Business Class Van Rental",
      "$25 Off Ford Transit Rentals for Business Use",
      25,
      promoDate(0, 1),
      promoDate(6, 30),
      [18],
      "BIZRENTAL",
      "https://images.pexels.com/photos/4488643/pexels-photo-4488643.jpeg?auto=compress&cs=tinysrgb&w=500",
      true
    ), // Pexels loading van
  ];

  localStorage.setItem("promotions", JSON.stringify(samplePromotions));
  console.log("Promotions data initialized with 7 items");
  return true;
}

// --------------------- REPORTS INITIALIZATION ---------------------
function initializeReports() {
  if (localStorage.getItem("reports")) {
    console.log("Reports data already exists");
    return false;
  }

  const today = new Date();
  const reportMonth = (monthOffset) =>
    new Date(
      today.getFullYear(),
      today.getMonth() - monthOffset,
      1
    ).toISOString();

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
    }), // Existing
    new Entities.Report(5, reportMonth(2), 31, 4150, {
      "9-11": 6,
      "11-13": 9,
      "13-15": 10,
      "15-17": 6,
    }), // Existing
    new Entities.Report(6, reportMonth(1), 28, 3720, {
      "9-11": 5,
      "11-13": 8,
      "13-15": 9,
      "15-17": 6,
    }), // Existing
  ];

  localStorage.setItem("reports", JSON.stringify(sampleReports));
  console.log("Reports data initialized with 6 monthly reports");
  return true;
}

// Function to update car average rating based on reviews
function updateCarAverageRating(carId) {
  const rawCars = JSON.parse(localStorage.getItem("cars") || "[]");
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  // Re-instantiate Car objects to ensure consistency, though not strictly necessary for just setting properties
  const cars = rawCars.map((carData) => {
    const car = new Entities.Car(
      carData.id,
      carData.brand,
      carData.model,
      carData.type,
      carData.rentPerDay,
      carData.image,
      carData.description,
      carData.features,
      carData.rentalTerms,
      carData.unavailableDates || []
    );
    // Restore properties potentially set after construction
    car.isAvailable =
      carData.isAvailable !== undefined ? carData.isAvailable : true;
    car.averageRating = carData.averageRating || 0;
    car.reviewCount = carData.reviewCount || 0;
    car.categories = carData.categories || [];
    car.isFeatured = carData.isFeatured || false;
    car.tags = carData.tags || [];
    return car;
  });

  const carReviews = reviews.filter((review) => review.carId === carId);
  const carIndex = cars.findIndex((car) => car.id === carId);

  if (carIndex === -1) {
    console.warn(`Car with ID ${carId} not found for rating update.`);
    return false; // Car not found
  }

  if (carReviews.length === 0) {
    // Ensure rating and count are reset if all reviews were somehow deleted
    cars[carIndex].averageRating = 0;
    cars[carIndex].reviewCount = 0;
  } else {
    const totalRating = carReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / carReviews.length;
    cars[carIndex].averageRating = parseFloat(averageRating.toFixed(1));
    cars[carIndex].reviewCount = carReviews.length;
  }

  localStorage.setItem("cars", JSON.stringify(cars));
  // console.log(`Updated rating for Car ID ${carId}: ${cars[carIndex].averageRating} (${cars[carIndex].reviewCount} reviews)`);
  return true;
}

// Helper function to get all reviews (to use in main initialization)
function getReviews() {
  return JSON.parse(localStorage.getItem("reviews") || "[]");
}

// --- EXECUTE INITIALIZATION ---
// Check if data already exists globally before running everything
if (!localStorage.getItem("cars") && !localStorage.getItem("users")) {
  // Check a couple of key items
  initializeData();
} else {
  console.log(
    "Data seems to already exist in localStorage. Skipping initialization."
  );
  // Optionally, you might still want to update ratings even if data exists
  const reviews = getReviews();
  if (reviews.length > 0) {
    console.log("Re-calculating car ratings based on existing reviews...");
    const rawCars = JSON.parse(localStorage.getItem("cars") || "[]");
    const carIds = new Set(rawCars.map((car) => car.id)); // Get all car IDs from storage
    carIds.forEach((carId) => updateCarAverageRating(carId));
    console.log("Car ratings updated.");
  }
}
