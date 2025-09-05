// Mock dashboard data for the Mars Research Hub

export const dashboardData = {
  articles: {
    total: 24,
    drafts: 3,
    published: 21,
    tags: ["geology", "atmosphere", "exploration", "water", "climate", "robotics"],
    recent: [
      { title: "Perseverance Sol 1000 Analysis", status: "published", date: "2024-01-15" },
      { title: "Martian Dust Storm Patterns", status: "draft", date: "2024-01-12" },
      { title: "Water Ice Distribution Maps", status: "published", date: "2024-01-10" }
    ]
  },
  
  facts: {
    total: 18,
    lastUpdated: "2024-01-15",
    categories: ["Geography", "Climate", "Exploration", "Physics", "Water"]
  },
  
  contributions: {
    total: 47,
    byStatus: {
      new: 12,
      underReview: 8,
      accepted: 27
    },
    recent: [
      { contributor: "Dr. Sarah Chen", title: "Mineral Analysis Dataset", status: "accepted", date: "2024-01-14" },
      { contributor: "Alex Rodriguez", title: "Rover Navigation Code", status: "under-review", date: "2024-01-13" },
      { contributor: "Prof. Kumar Patel", title: "Atmospheric Modeling", status: "new", date: "2024-01-12" }
    ]
  },
  
  recentActivity: [
    { action: "New contribution submitted", details: "Atmospheric pressure data from Sol 1001-1010", timestamp: "2 hours ago" },
    { action: "Article published", details: "Mars Sample Return Mission Update", timestamp: "5 hours ago" },
    { action: "Fact database updated", details: "Added 3 new geological findings", timestamp: "1 day ago" },
    { action: "Contribution accepted", details: "Thermal imaging analysis tools", timestamp: "2 days ago" },
    { action: "New draft created", details: "Seasonal wind pattern analysis", timestamp: "3 days ago" }
  ],
  
  charts: {
    contributionsOverTime: [
      { month: "Sep", count: 8 },
      { month: "Oct", count: 12 },
      { month: "Nov", count: 15 },
      { month: "Dec", count: 19 },
      { month: "Jan", count: 24 }
    ],
    articlesByCategory: [
      { category: "Geology", count: 8 },
      { category: "Atmosphere", count: 6 },
      { category: "Exploration", count: 4 },
      { category: "Water", count: 3 },
      { category: "Climate", count: 3 }
    ]
  }
};

// Helper functions for dashboard operations
export const addRecentActivity = (activity) => {
  dashboardData.recentActivity.unshift(activity);
  if (dashboardData.recentActivity.length > 10) {
    dashboardData.recentActivity.pop();
  }
};

export const updateContributionStats = (status) => {
  dashboardData.contributions.total += 1;
  dashboardData.contributions.byStatus[status] = (dashboardData.contributions.byStatus[status] || 0) + 1;
};