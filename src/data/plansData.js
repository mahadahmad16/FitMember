const plansData = [
  {
    id: "basic",
    name: "Basic",
    price: 1500,
    duration: "per month",
    description: "For getting started and building a routine.",
    features: [
      "Full access to gym floor & cardio equipment",
      "Locker room access",
      "1 free fitness assessment",
    ],
    highlighted: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 3000,
    duration: "per month",
    description: "Our most-picked plan for consistent training.",
    features: [
      "Everything in Basic",
      "Group classes — Yoga, Zumba, HIIT",
      "2 personal training sessions / month",
      "Nutrition consultation",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 5000,
    duration: "per month",
    description: "Full access for serious, high-frequency training.",
    features: [
      "Everything in Standard",
      "Unlimited personal training",
      "Sauna & recovery zone access",
      "Priority class booking",
      "2 guest passes / month",
    ],
    highlighted: false,
  },
];

export default plansData;