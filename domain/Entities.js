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
    unavailableDates = []
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.type = type; // SUV, Sedan, Hatchback, etc.
    this.rentPerDay = rentPerDay;
    this.image = image;
    this.description = description;
    this.features = features; // Array of car features
    this.rentalTerms = rentalTerms; // Object containing rental terms
    this.unavailableDates = unavailableDates; // Array of date ranges when car is unavailable
    this.isAvailable = true; // General availability flag (can be set to false for maintenance)

    // New properties for enhanced features
    this.averageRating = 0;
    this.reviewCount = 0;
    this.categories = []; // Category IDs this car belongs to
    this.isFeatured = false;
    this.tags = []; // Additional tags for filtering (e.g., "automatic", "navigation")
  }

  checkAvailability(startDate, endDate) {
    if (!this.isAvailable) return false;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    for (const dateRange of this.unavailableDates) {
      const rangeStart = new Date(dateRange.start).getTime();
      const rangeEnd = new Date(dateRange.end).getTime();

      if (
        (start >= rangeStart && start < rangeEnd) ||
        (end > rangeStart && end <= rangeEnd) ||
        (start <= rangeStart && end >= rangeEnd)
      ) {
        return false;
      }
    }

    return true;
  }

  markDatesUnavailable(startDate, endDate) {
    this.unavailableDates.push({
      start: startDate,
      end: endDate,
    });
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
    this.pickupDate = pickupDate;
    this.dropoffDate = dropoffDate;
    this.status = status; // "confirmed", "pending", "cancelled"
    this.totalAmount = totalAmount;
    this.createdAt = new Date().toISOString();
    this.bookingReference = bookingReference || this.generateBookingReference();
    this.userId = null; // Will be filled if user is logged in
    this.additionalOptions = additionalOptions; // Extra services or options selected
    this.promoCode = null; // Store applied promo code
    this.discountAmount = 0; // Amount saved from promotion
  }

  generateBookingReference() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // In a real app, never store plain text passwords
    this.role = role; // "admin"
    this.registeredAt = new Date().toISOString();
  }
}

export class Report {
  constructor(id, month, totalBookings, totalRevenue, peakHours) {
    this.id = id;
    this.month = month;
    this.totalBookings = totalBookings;
    this.totalRevenue = totalRevenue;
    this.peakHours = peakHours; // Object containing peak booking hours
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
    this.rating = rating; // 1-5 stars
    this.comment = comment;
    this.date = date;
    this.helpful = 0; // Count of users who found this review helpful
  }
}

export class Category {
  constructor(id, name, description, icon, filters = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon; // Font Awesome icon class
    this.filters = filters; // { minPrice, maxPrice, types: [] }
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
    applicableCarIds = [],
    promoCode,
    imageUrl,
    isActive = true
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.discount = discount; // percentage discount or fixed amount
    this.discountType =
      typeof discount === "number" && discount <= 1 ? "percentage" : "fixed";
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.applicableCarIds = applicableCarIds; // Empty array means applies to all cars
    this.promoCode = promoCode;
    this.imageUrl = imageUrl;
    this.isActive = isActive;
  }

  isValid() {
    const now = new Date();
    const startDate = new Date(this.validFrom);
    const endDate = new Date(this.validTo);

    return this.isActive && now >= startDate && now <= endDate;
  }

  appliesTo(carId) {
    return (
      this.applicableCarIds.length === 0 ||
      this.applicableCarIds.includes(carId)
    );
  }

  calculateDiscountedPrice(originalPrice) {
    if (this.discountType === "percentage") {
      return originalPrice * (1 - this.discount);
    } else {
      return Math.max(0, originalPrice - this.discount);
    }
  }
}
