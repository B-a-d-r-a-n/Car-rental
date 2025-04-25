import * as Entities from "./Entities.js";

// Initialize all data in local storage
function initializeData() {
  // Initialize categories first (cars depend on these)
  initializeCategories();

  // Initialize cars (which reference categories)
  initializeCars();

  // Initialize users (independent)
  initializeUsers();

  // Initialize bookings (dependent on cars)
  initializeBookings();

  // Initialize reviews (dependent on cars)
  initializeReviews();

  // Initialize featured vehicles (dependent on cars)
  initializeFeaturedVehicles();

  // Initialize promotions (reference car IDs)
  initializePromotions();

  // Initialize reports (independent)
  initializeReports();

  // Update car ratings based on reviews
  const reviews = getReviews();
  const carIds = new Set(reviews.map((review) => review.carId));
  carIds.forEach((carId) => updateCarAverageRating(carId));

  console.log("All data initialized successfully");
}

// --------------------- CARS INITIALIZATION ---------------------
function initializeCars() {
  if (localStorage.getItem("cars")) {
    console.log("Cars data already exists");
    return false;
  }

  const sampleCars = [
    new Entities.Car(
      1,
      "Toyota",
      "Camry",
      "Sedan",
      65,
      "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=500",
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
      "https://images.unsplash.com/photo-1604429868519-833be58ee3a8?q=80&w=500",
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
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=500",
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
      "https://images.unsplash.com/photo-1589750360499-1e9b78c80fbe?q=80&w=500",
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
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=500",
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
      "https://images.unsplash.com/photo-1564327488770-c22fb02456e1?q=80&w=500",
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
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=500",
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
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=500",
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
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=500",
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
      "https://images.unsplash.com/photo-1581850518616-bcb8077a2336?q=80&w=500",
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
  ];

  // Add category assignments
  sampleCars[0].categories = [1]; // Economy
  sampleCars[1].categories = [2, 6]; // Family, Adventure
  sampleCars[2].categories = [3]; // Luxury
  sampleCars[3].categories = [4]; // Sports
  sampleCars[4].categories = [5, 1]; // Green, Economy
  sampleCars[5].categories = [5, 3]; // Green, Luxury
  sampleCars[6].categories = [6]; // Adventure
  sampleCars[7].categories = [3]; // Luxury
  sampleCars[8].categories = [1]; // Economy
  sampleCars[9].categories = [2]; // Family

  // Add tags
  sampleCars.forEach((car) => {
    car.tags = car.features.map((feature) => feature.toLowerCase());
    if (car.type === "Sedan" || car.type === "Hatchback") {
      car.tags.push("fuel-efficient");
    }
    if (car.type === "Luxury" || car.type === "Sports") {
      car.tags.push("performance");
    }
    if (car.type === "SUV" || car.type === "Off-Road") {
      car.tags.push("spacious");
    }
    if (car.type === "Hybrid" || car.type === "Electric") {
      car.tags.push("eco-friendly");
    }
  });

  // Mark some as featured
  sampleCars[5].isFeatured = true; // Tesla
  sampleCars[3].isFeatured = true; // Mustang
  sampleCars[2].isFeatured = true; // BMW

  localStorage.setItem("cars", JSON.stringify(sampleCars));
  console.log("Cars data initialized with 10 vehicles");
  return true;
}

// --------------------- USERS INITIALIZATION ---------------------
function initializeUsers() {
  if (localStorage.getItem("users")) {
    console.log("Users data already exists");
    return false;
  }

  const sampleUsers = [
    new Entities.User(
      1,
      "admin",
      "admin@carrentalapp.com",
      "admin123", // In a real app, this would be hashed
      "admin"
    ),
    new Entities.User(
      2,
      "manager",
      "manager@carrentalapp.com",
      "manager456", // In a real app, this would be hashed
      "admin"
    ),
    new Entities.User(
      3,
      "analyst",
      "analyst@carrentalapp.com",
      "analyst789", // In a real app, this would be hashed
      "analyst"
    ),
    new Entities.User(
      4,
      "support",
      "support@carrentalapp.com",
      "support123", // In a real app, this would be hashed
      "support"
    ),
    new Entities.User(
      5,
      "fleetmanager",
      "fleet@carrentalapp.com",
      "fleet123", // In a real app, this would be hashed
      "admin"
    ),
  ];

  // Add registration dates
  const today = new Date();

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

  localStorage.setItem("users", JSON.stringify(sampleUsers));
  console.log("Users data initialized with 5 users");
  return true;
}

// --------------------- BOOKINGS INITIALIZATION ---------------------
function initializeBookings() {
  if (localStorage.getItem("bookings")) {
    console.log("Bookings data already exists");
    return false;
  }

  const today = new Date();

  const sampleBookings = [
    new Entities.Booking(
      1,
      1, // Toyota Camry
      "John Smith",
      "john.smith@example.com",
      "555-123-4567",
      new Date(today.getFullYear(), today.getMonth() - 1, 5).toISOString(),
      new Date(today.getFullYear(), today.getMonth() - 1, 10).toISOString(),
      "completed",
      325, // 5 days * $65
      "BK78R29A",
      ["GPS", "Child Seat"]
    ),
    new Entities.Booking(
      2,
      3, // BMW 3 Series
      "Emily Johnson",
      "emily.j@example.com",
      "555-987-6543",
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 5
      ).toISOString(),
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 8
      ).toISOString(),
      "confirmed",
      360, // 3 days * $120
      "BK23L48P",
      ["Premium Insurance"]
    ),
    new Entities.Booking(
      3,
      6, // Tesla Model 3
      "Michael Rodriguez",
      "michael.r@example.com",
      "555-456-7890",
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 2
      ).toISOString(),
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 3
      ).toISOString(),
      "ongoing",
      650, // 5 days * $130
      "BK47H93Q",
      ["Airport Pickup", "Premium Insurance"]
    ),
    new Entities.Booking(
      4,
      4, // Ford Mustang
      "Sarah Williams",
      "sarah.w@example.com",
      "555-789-1234",
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 10
      ).toISOString(),
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 15
      ).toISOString(),
      "pending",
      550, // 5 days * $110
      "BK12J56T",
      ["GPS", "Additional Driver"]
    ),
    new Entities.Booking(
      5,
      2, // Honda CR-V
      "David Chen",
      "david.c@example.com",
      "555-234-5678",
      new Date(today.getFullYear(), today.getMonth() - 2, 15).toISOString(),
      new Date(today.getFullYear(), today.getMonth() - 2, 22).toISOString(),
      "completed",
      595, // 7 days * $85
      "BK39G74W",
      ["Child Seat"]
    ),
    new Entities.Booking(
      6,
      8, // Mercedes-Benz E-Class
      "Jessica Brown",
      "jessica.b@example.com",
      "555-345-6789",
      new Date(today.getFullYear(), today.getMonth() + 1, 3).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 1, 10).toISOString(),
      "confirmed",
      980, // 7 days * $140
      "BK64D21R",
      ["Airport Pickup", "Premium Insurance", "GPS"]
    ),
    new Entities.Booking(
      7,
      5, // Toyota Prius
      "Robert Lee",
      "robert.l@example.com",
      "555-876-5432",
      new Date(today.getFullYear(), today.getMonth() - 3, 10).toISOString(),
      new Date(today.getFullYear(), today.getMonth() - 3, 17).toISOString(),
      "completed",
      490, // 7 days * $70
      "BK98F36K",
      []
    ),
    new Entities.Booking(
      8,
      9, // Honda Civic
      "Amanda Martinez",
      "amanda.m@example.com",
      "555-654-3210",
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 2
      ).toISOString(),
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 6
      ).toISOString(),
      "confirmed",
      240, // 4 days * $60
      "BK51N27J",
      ["Additional Driver"]
    ),
    new Entities.Booking(
      9,
      7, // Jeep Wrangler
      "Thomas Wilson",
      "thomas.w@example.com",
      "555-765-4321",
      new Date(today.getFullYear(), today.getMonth() - 1, 20).toISOString(),
      new Date(today.getFullYear(), today.getMonth() - 1, 27).toISOString(),
      "completed",
      665, // 7 days * $95
      "BK17M85S",
      ["GPS", "Roof Rack"]
    ),
    new Entities.Booking(
      10,
      10, // Chevrolet Suburban
      "Patricia Garcia",
      "patricia.g@example.com",
      "555-987-1234",
      new Date(today.getFullYear(), today.getMonth() + 1, 15).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 1, 22).toISOString(),
      "pending",
      770, // 7 days * $110
      "BK73C19Y",
      ["Child Seat", "Additional Driver", "GPS"]
    ),
  ];

  // Add promo codes to some bookings
  sampleBookings[1].promoCode = "SPRING25";
  sampleBookings[1].discountAmount = 54; // 15% of $360

  sampleBookings[3].promoCode = "LUXWEEKEND";
  sampleBookings[3].discountAmount = 130; // 20% of $650

  sampleBookings[5].promoCode = "LUXWEEKEND";
  sampleBookings[5].discountAmount = 196; // 20% of $980

  localStorage.setItem("bookings", JSON.stringify(sampleBookings));
  console.log("Bookings data initialized with 10 bookings");

  // Retrieve cars from localStorage and convert them back to Entities.Car instances
  const rawCars = JSON.parse(localStorage.getItem("cars") || "[]");
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
    // Restore other properties that were set after construction
    car.isAvailable =
      carData.isAvailable !== undefined ? carData.isAvailable : true;
    car.averageRating = carData.averageRating || 0;
    car.reviewCount = carData.reviewCount || 0;
    car.categories = carData.categories || [];
    car.isFeatured = carData.isFeatured || false;
    car.tags = carData.tags || [];
    return car;
  });

  // Mark unavailable dates for cars based on bookings
  sampleBookings.forEach((booking) => {
    if (booking.status === "confirmed" || booking.status === "ongoing") {
      const carIndex = cars.findIndex((car) => car.id === booking.carId);
      if (carIndex !== -1) {
        cars[carIndex].markDatesUnavailable(
          booking.pickupDate,
          booking.dropoffDate
        );
      }
    }
  });

  // Save the updated cars back to localStorage
  localStorage.setItem("cars", JSON.stringify(cars));
  return true;
}

// --------------------- REVIEWS INITIALIZATION ---------------------
function initializeReviews() {
  if (localStorage.getItem("reviews")) {
    console.log("Reviews data already exists");
    return false;
  }

  const today = new Date();

  const sampleReviews = [
    new Entities.Review(
      1,
      1, // Toyota Camry
      "Alex Johnson",
      4,
      "Great everyday car. Smooth ride and excellent fuel economy. The only thing I missed was a bit more power on the highway.",
      new Date(today.getFullYear(), today.getMonth() - 2, 15).toISOString()
    ),
    new Entities.Review(
      2,
      1, // Toyota Camry
      "Maria Rodriguez",
      5,
      "Perfect for my family trip! Very comfortable and the Bluetooth connectivity was seamless.",
      new Date(today.getFullYear(), today.getMonth() - 1, 10).toISOString()
    ),
    new Entities.Review(
      3,
      2, // Honda CR-V
      "David Wilson",
      5,
      "Incredible SUV for our camping trip. Lots of space for gear and handled rough roads beautifully.",
      new Date(today.getFullYear(), today.getMonth() - 3, 5).toISOString()
    ),
    new Entities.Review(
      4,
      4, // Ford Mustang
      "James Chen",
      5,
      "What a thrill to drive! The convertible top made for an unforgettable coastal drive.",
      new Date(today.getFullYear(), today.getMonth() - 2, 20).toISOString()
    ),
    new Entities.Review(
      5,
      6, // Tesla Model 3
      "Sophia Kim",
      4,
      "My first time driving an electric car and I loved it! The autopilot feature was impressive. Charging was easier than expected.",
      new Date(today.getFullYear(), today.getMonth() - 1, 25).toISOString()
    ),
    new Entities.Review(
      6,
      3, // BMW 3 Series
      "Robert Garcia",
      3,
      "Luxury experience but the navigation system was a bit confusing to use. Great acceleration though!",
      new Date(today.getFullYear(), today.getMonth() - 3, 15).toISOString()
    ),
    new Entities.Review(
      7,
      5, // Toyota Prius
      "Emily Thomas",
      5,
      "Incredible fuel efficiency! We drove for a week and barely used any gas. Very comfortable for a hybrid.",
      new Date(today.getFullYear(), today.getMonth() - 2, 8).toISOString()
    ),
    new Entities.Review(
      8,
      7, // Jeep Wrangler
      "Michael Brown",
      4,
      "Took it off-road and had a blast! A bit loud on the highway but that's expected with this type of vehicle.",
      new Date(today.getFullYear(), today.getMonth() - 1, 18).toISOString()
    ),
    new Entities.Review(
      9,
      8, // Mercedes-Benz E-Class
      "Sarah Davis",
      5,
      "Pure luxury! The leather seats and premium sound system made every journey a pleasure.",
      new Date(today.getFullYear(), today.getMonth() - 2, 12).toISOString()
    ),
    new Entities.Review(
      10,
      9, // Honda Civic
      "Daniel Martinez",
      4,
      "Great value for money. Compact but surprisingly spacious inside. Perfect for city driving.",
      new Date(today.getFullYear(), today.getMonth() - 1, 5).toISOString()
    ),
    new Entities.Review(
      11,
      10, // Chevrolet Suburban
      "Jessica Wilson",
      4,
      "Massive vehicle with tons of space! Took the whole family and all our luggage with room to spare.",
      new Date(today.getFullYear(), today.getMonth() - 3, 25).toISOString()
    ),
    new Entities.Review(
      12,
      6, // Tesla Model 3
      "Thomas Lee",
      5,
      "The acceleration is incredible! Loved the minimalist interior and the huge touchscreen.",
      new Date(today.getFullYear(), today.getMonth() - 2, 28).toISOString()
    ),
    new Entities.Review(
      13,
      2, // Honda CR-V
      "Olivia Johnson",
      4,
      "Great family SUV. Had plenty of room for our luggage and the kids loved it.",
      new Date(today.getFullYear(), today.getMonth() - 1, 8).toISOString()
    ),
    new Entities.Review(
      14,
      5, // Toyota Prius
      "William Taylor",
      5,
      "The fuel efficiency is amazing! Perfect for eco-conscious travelers.",
      new Date(today.getFullYear(), today.getMonth() - 2, 17).toISOString()
    ),
    new Entities.Review(
      15,
      4, // Ford Mustang
      "Emma Anderson",
      5,
      "Such a fun car to drive along the coast! Powerful engine and turns heads everywhere.",
      new Date(today.getFullYear(), today.getMonth() - 3, 12).toISOString()
    ),
  ];

  // Add some helpful counts to reviews
  sampleReviews[3].helpful = 5; // Mustang review
  sampleReviews[4].helpful = 8; // Tesla review
  sampleReviews[6].helpful = 4; // Prius review
  sampleReviews[11].helpful = 6; // Another Tesla review

  localStorage.setItem("reviews", JSON.stringify(sampleReviews));
  console.log("Reviews data initialized with 15 reviews");
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
      { minPrice: 120, types: ["Luxury"] }
    ),
    new Entities.Category(
      4,
      "Sports",
      "High-performance vehicles for an exciting driving experience",
      "fa-tachometer-alt",
      { minPrice: 100, types: ["Sports"] }
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
      { types: ["SUV", "Off-Road"] }
    ),
  ];

  localStorage.setItem("categories", JSON.stringify(sampleCategories));
  console.log("Categories data initialized with 6 categories");
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
      6, // Tesla Model 3
      1,
      "Experience the Future of Driving",
      "All-electric luxury with impressive range and acceleration. Featuring advanced autopilot technology.",
      true
    ),
    new Entities.FeaturedVehicle(
      3, // BMW 3 Series
      2,
      "Luxury Meets Performance",
      "Premium luxury sedan that combines sporty performance with elegant design and advanced technology.",
      true
    ),
    new Entities.FeaturedVehicle(
      4, // Ford Mustang
      3,
      "American Muscle, Unleashed",
      "Iconic American muscle car with powerful V8 engine and classic styling. Available as convertible.",
      true
    ),
  ];

  localStorage.setItem(
    "featuredVehicles",
    JSON.stringify(sampleFeaturedVehicles)
  );
  console.log("Featured vehicles data initialized with 3 items");
  return true;
}

// --------------------- PROMOTIONS INITIALIZATION ---------------------
function initializePromotions() {
  if (localStorage.getItem("promotions")) {
    console.log("Promotions data already exists");
    return false;
  }

  const today = new Date();

  const samplePromotions = [
    new Entities.Promotion(
      1,
      "Spring Special",
      "Enjoy 15% off on selected vehicles this spring season!",
      0.15, // 15% discount
      new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 2, 30).toISOString(),
      [1, 2, 5, 9], // Economy and hybrid vehicles
      "SPRING25",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500",
      true
    ),
    new Entities.Promotion(
      2,
      "Luxury Weekend Getaway",
      "20% off on all luxury and sports cars for weekend rentals",
      0.2, // 20% discount
      new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 3, 30).toISOString(),
      [3, 4, 6, 8], // Luxury and sports cars
      "LUXWEEKEND",
      "https://images.unsplash.com/photo-1518619445083-15c0ec4aa116?q=80&w=500",
      true
    ),
    new Entities.Promotion(
      3,
      "Family Trip Discount",
      "Flat $50 off on SUVs for rentals of 5 days or more",
      50, // $50 fixed discount
      new Date(today.getFullYear(), today.getMonth(), 15).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 4, 30).toISOString(),
      [2, 7, 10], // SUVs
      "FAMILY50",
      "https://images.unsplash.com/photo-1613664161831-35ca95a4b953?q=80&w=500",
      true
    ),
    new Entities.Promotion(
      4,
      "Green Driving Initiative",
      "10% off on all hybrid and electric vehicles",
      0.1, // 10% discount
      new Date(today.getFullYear(), today.getMonth() - 2, 1).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 4, 30).toISOString(),
      [5, 6], // Hybrid and electric vehicles
      "GOGREEN",
      "https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f?q=80&w=500",
      true
    ),
    new Entities.Promotion(
      5,
      "First-Time Renter",
      "15% off on your first rental with us",
      0.15, // 15% discount
      new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString(),
      new Date(today.getFullYear(), today.getMonth() + 9, 30).toISOString(),
      [], // Applies to all cars
      "FIRSTTIME",
      "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=500",
      true
    ),
  ];

  localStorage.setItem("promotions", JSON.stringify(samplePromotions));
  console.log("Promotions data initialized with 5 items");
  return true;
}

// --------------------- REPORTS INITIALIZATION ---------------------
function initializeReports() {
  if (localStorage.getItem("reports")) {
    console.log("Reports data already exists");
    return false;
  }

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const sampleReports = [
    new Entities.Report(
      1,
      new Date(currentYear, currentMonth - 3, 1).toISOString(), // 3 months ago
      24,
      3280,
      { "9-11": 5, "11-13": 7, "13-15": 8, "15-17": 4 }
    ),
    new Entities.Report(
      2,
      new Date(currentYear, currentMonth - 2, 1).toISOString(), // 2 months ago
      31,
      4150,
      { "9-11": 6, "11-13": 9, "13-15": 10, "15-17": 6 }
    ),
    new Entities.Report(
      3,
      new Date(currentYear, currentMonth - 1, 1).toISOString(), // 1 month ago
      28,
      3720,
      { "9-11": 5, "11-13": 8, "13-15": 9, "15-17": 6 }
    ),
  ];

  localStorage.setItem("reports", JSON.stringify(sampleReports));
  console.log("Reports data initialized with 3 monthly reports");
  return true;
}

// Function to update car average rating based on reviews
function updateCarAverageRating(carId) {
  const rawCars = JSON.parse(localStorage.getItem("cars") || "[]");
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  // Convert raw cars back to Entities.Car instances for consistency
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

  if (carReviews.length === 0) {
    return false;
  }

  const totalRating = carReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRating / carReviews.length;

  const carIndex = cars.findIndex((car) => car.id === carId);
  if (carIndex !== -1) {
    cars[carIndex].averageRating = parseFloat(averageRating.toFixed(1));
    cars[carIndex].reviewCount = carReviews.length;
    localStorage.setItem("cars", JSON.stringify(cars));
    return true;
  }

  return false;
}

// Helper function to get all reviews (to use in main initialization)
function getReviews() {
  return JSON.parse(localStorage.getItem("reviews") || "[]");
}

initializeData();
