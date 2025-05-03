export class Car {
  constructor(
    id,
    brand,
    model,
    type,
    rentPerDay,
    image,
    description,
    features,
    rentalTerms,
    unavailableDates = [],
    availableStock = 1
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.type = type;
    this.rentPerDay = rentPerDay;
    this.image = image;
    this.description = description;
    this.features = features;
    this.rentalTerms = rentalTerms;
    this.unavailableDates = [];
    this.availableStock = availableStock;
    this.isAvailable = this.availableStock > 0;
    this.averageRating = 0;
    this.reviewCount = 0;
    this.categories = [];
    this.isFeatured = false;
  }
}
export class Booking {
  constructor(
    id,
    carId,
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    dropoffDate,
    status,
    totalAmount,
    bookingReference,
    additionalOptions = []
  ) {
    this.id = id;
    this.carId = carId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.pickupDate = new Date(pickupDate);
    this.dropoffDate = new Date(dropoffDate);
    this.status = status;
    this.totalAmount = totalAmount;
    this.createdAt = new Date().toISOString();
    this.bookingReference = bookingReference;
    this.userId = null;
    this.additionalOptions = additionalOptions;
    this.promoCode = null;
    this.discountAmount = 0;
  }
}

export class User {
  constructor(
    id,
    username,
    email,
    password,
    imgUrl = "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    role = "user"
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.userImg = imgUrl;
    this.registeredAt = new Date().toISOString();
  }
}
export class Admin extends User {
  constructor(id, username, email, password) {
    super(id, username, email, password);
    this.role = "admin";
  }
}

export class Seller extends User {
  constructor(id, username, email, password) {
    super(id, username, email, password, "seller");
    this.sellerRating = 0;
    this.totalSales = 0;
    this.productIds = [];
  }
}

export class Report {
  constructor(id, month, totalBookings, totalRevenue, peakHours) {
    this.id = id;
    this.month = month;
    this.totalBookings = totalBookings;
    this.totalRevenue = totalRevenue;
    this.peakHours = peakHours;
  }
}

export class Review {
  constructor(
    id,
    carId,
    customerName,
    rating,
    comment,
    date = new Date().toISOString()
  ) {
    this.id = id;
    this.carId = carId;
    this.customerName = customerName;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
    this.helpful = 0;
  }
}

export class Category {
  constructor(id, name, description, icon, filters = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.filters = filters;
  }
}

export class FeaturedVehicle {
  constructor(carId, position, headline, description, isActive = true) {
    this.carId = carId;
    this.position = position;
    this.headline = headline;
    this.description = description;
    this.isActive = isActive;
  }
}

export class Promotion {
  constructor(
    id,
    title,
    description,
    discount,
    validFrom,
    validTo,
    imageUrl,
    isActive = true
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.discount = discount;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.imageUrl = imageUrl;
    this.isActive = isActive;
  }
}
