// Mars Facts Database for the Research Hub
export const marsFactsData = [
  {
    id: 1,
    fact: "Mars has two small moons named Phobos and Deimos, which are likely captured asteroids.",
    category: "Moons"
  },
  {
    id: 2,
    fact: "A day on Mars (called a 'sol') is about 24 hours and 37 minutes, very similar to Earth.",
    category: "Time"
  },
  {
    id: 3,
    fact: "Mars has the largest volcano in the solar system: Olympus Mons, which is about 13.6 miles (22 kilometers) high.",
    category: "Geography"
  },
  {
    id: 4,
    fact: "The atmosphere of Mars is 95% carbon dioxide, with traces of nitrogen and argon.",
    category: "Atmosphere"
  },
  {
    id: 5,
    fact: "Mars experiences seasons similar to Earth due to its axial tilt of about 25 degrees.",
    category: "Climate"
  },
  {
    id: 6,
    fact: "The Valles Marineris canyon system on Mars is over 2,500 miles (4,000 km) long and up to 4 miles (7 km) deep.",
    category: "Geography"
  },
  {
    id: 7,
    fact: "Water ice has been confirmed at both Martian polar caps and beneath the surface in many regions.",
    category: "Water"
  },
  {
    id: 8,
    fact: "Mars has a much weaker magnetic field than Earth, which allows solar radiation to strip away its atmosphere.",
    category: "Physics"
  },
  {
    id: 9,
    fact: "Dust storms on Mars can cover the entire planet and last for months.",
    category: "Weather"
  },
  {
    id: 10,
    fact: "Mars appears red due to iron oxide (rust) on its surface, giving it the nickname 'The Red Planet'.",
    category: "Appearance"
  },
  {
    id: 11,
    fact: "Gravity on Mars is about 38% of Earth's gravity, so a 100-pound person would weigh only 38 pounds on Mars.",
    category: "Physics"
  },
  {
    id: 12,
    fact: "The average temperature on Mars is about -80°F (-62°C), but can range from -195°F to 70°F (-125°C to 20°C).",
    category: "Climate"
  },
  {
    id: 13,
    fact: "Mars has evidence of ancient river valleys and lake beds, suggesting it once had liquid water on its surface.",
    category: "History"
  },
  {
    id: 14,
    fact: "The Martian year is about 687 Earth days long, nearly twice as long as an Earth year.",
    category: "Time"
  },
  {
    id: 15,
    fact: "NASA's Perseverance rover is currently searching for signs of ancient microbial life on Mars.",
    category: "Exploration"
  },
  {
    id: 16,
    fact: "Mars has polar ice caps made of both water ice and frozen carbon dioxide (dry ice).",
    category: "Ice"
  },
  {
    id: 17,
    fact: "The first successful mission to Mars was NASA's Mariner 4 in 1965, which flew by the planet.",
    category: "Exploration"
  },
  {
    id: 18,
    fact: "Mars has no ozone layer, so the surface receives deadly levels of ultraviolet radiation.",
    category: "Atmosphere"
  }
];

// Helper function to get random facts
export const getRandomFacts = (count = 3) => {
  const shuffled = [...marsFactsData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};